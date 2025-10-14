import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the root directory (three levels up from apps/api/src/)
dotenv.config({ path: join(__dirname, '..', '..', '..', '.env') });

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 3001;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to PostgreSQL:', err.stack);
    process.exit(1);
  }
  console.log('✅ PostgreSQL connected successfully');
  release();
});

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:8081',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
}));
app.use(express.json());

// ==================== MODEL CONFIGURATION ====================
// All AI models loaded from environment variables with defaults
const CONTENT_MODEL = process.env.CONTENT_MODEL || 'gpt-4o';
const CONTENT_MODEL_FALLBACK = process.env.CONTENT_MODEL_FALLBACK || 'gpt-4o-mini';
const FORMATTER_MODEL = process.env.FORMATTER_MODEL || 'gpt-4o-mini';
const FORMATTER_MODEL_FALLBACK = process.env.FORMATTER_MODEL_FALLBACK || 'gpt-4o-mini';

console.log('🤖 AI Model Configuration:');
console.log(`   Content Model: ${CONTENT_MODEL} (fallback: ${CONTENT_MODEL_FALLBACK})`);
console.log(`   Formatter Model: ${FORMATTER_MODEL} (fallback: ${FORMATTER_MODEL_FALLBACK})`);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend API is running' });
});

// OpenAI connection check endpoint
app.get('/api/openai/status', (req, res) => {
  const hasApiKey = !!process.env.OPENAI_API_KEY;
  const hasModels = !!(CONTENT_MODEL && FORMATTER_MODEL);
  
  res.json({ 
    connected: hasApiKey && hasModels,
    hasApiKey,
    hasModels,
    contentModel: CONTENT_MODEL,
    formatterModel: FORMATTER_MODEL
  });
});

// ==================== SETTINGS ENDPOINTS ====================

app.get('/api/settings', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, topics, schedule, auto, positioning, tone, brand_pillars, updated_at FROM articles_settings ORDER BY id LIMIT 1'
    );
    
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.json({
        topics: ['Startup Strategy', 'Product Development', 'Fundraising', 'Market Analysis', 'Growth Tactics', 'Founder Mindset', 'Team Building', 'Customer Discovery'],
        schedule: '0 9 * * 1',
        auto: false,
        positioning: '',
        tone: '',
        brand_pillars: ''
      });
    }
  } catch (err) {
    console.error('Error loading settings:', err);
    res.status(500).json({ error: 'Failed to load settings', details: err.message });
  }
});

app.put('/api/settings', async (req, res) => {
  const { topics, schedule, auto, positioning, tone, brand_pillars } = req.body;
  
  if (!topics || !schedule || auto === undefined) {
    return res.status(400).json({ error: 'Missing required fields: topics, schedule, auto' });
  }

  try {
    const query = `
      INSERT INTO articles_settings (id, topics, schedule, auto, positioning, tone, brand_pillars, updated_at)
      VALUES (1, $1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE SET
        topics = $1,
        schedule = $2,
        auto = $3,
        positioning = $4,
        tone = $5,
        brand_pillars = $6,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;
    
    const result = await pool.query(query, [topics, schedule, auto, positioning || '', tone || '', brand_pillars || '']);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error saving settings:', err);
    res.status(500).json({ error: 'Failed to save settings', details: err.message });
  }
});

// ==================== ARTICLES ENDPOINTS ====================

// POST /api/articles/generate - Generate article in background (2-step AI process)
app.post('/api/articles/generate', async (req, res) => {
  try {
    const { topic, inputType, customBrief, keywordList, model, featured } = req.body;
    
    const jobId = Date.now().toString();
    
    // Immediately respond to client with jobId
    res.status(202).json({ 
      message: 'Your article will be published within the next 5-10 minutes',
      status: 'processing',
      jobId: jobId
    });
    
    // Generate article in background (don't await)
    generateArticleInBackground({ topic, inputType, customBrief, keywordList, model, featured }, jobId);
    
  } catch (err) {
    console.error('Error initiating article generation:', err);
    res.status(500).json({ error: 'Failed to initiate article generation', details: err.message });
  }
});

// GET /api/articles/status/:jobId - Get generation status
app.get('/api/articles/status/:jobId', (req, res) => {
  const { jobId } = req.params;
  const status = generationStatus.get(jobId);
  
  if (!status) {
    return res.status(404).json({ error: 'Job not found or completed' });
  }
  
  res.json(status);
});

// Store generation status in memory (simple approach)
const generationStatus = new Map();

// Background article generation function (2-step AI process)
async function generateArticleInBackground(params, jobId) {
  generationStatus.set(jobId, { step: 'generating', message: 'Generating raw content...' });
  
  try {
    console.log('🚀 Starting 2-step background article generation:', params);
    
    // Load Brand Essence settings from database
    let brandEssence = {
      positioning: '',
      tone: '',
      brand_pillars: ''
    };
    
    try {
      const settingsResult = await pool.query(
        'SELECT positioning, tone, brand_pillars FROM articles_settings ORDER BY id LIMIT 1'
      );
      if (settingsResult.rows.length > 0) {
        brandEssence = {
          positioning: settingsResult.rows[0].positioning || '',
          tone: settingsResult.rows[0].tone || '',
          brand_pillars: settingsResult.rows[0].brand_pillars || ''
        };
        console.log('✅ Loaded Brand Essence from database');
      }
    } catch (err) {
      console.warn('⚠️ Could not load Brand Essence, using defaults:', err.message);
    }
    
    // Import OpenAI
    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    // Get current date for context
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    
    // ========== RANDOMLY SELECT 2 RICH CONTENT SECTIONS ==========
    const availableSections = [
      {
        name: 'PROS_CONS',
        contentInstructions: `PROS & CONS TABLE:
   - Present as a clear comparison table
   - List 5-7 pros and 5-7 cons
   - Be balanced and honest
   - Include brief explanations for each point`,
        formatInstructions: `PROS & CONS (always as table):
   <div class="pros-cons-section">
     <h2>Pros & Cons</h2>
     <table class="pros-cons-table">
       <thead>
         <tr>
           <th class="pros-header">✅ Pros</th>
           <th class="cons-header">❌ Cons</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td class="pros-cell">
             <strong>Pro Title</strong>
             <span class="text-slate-600">Explanation...</span>
           </td>
           <td class="cons-cell">
             <strong>Con Title</strong>
             <span class="text-slate-600">Explanation...</span>
           </td>
         </tr>
       </tbody>
     </table>
   </div>`
      },
      {
        name: 'ALTERNATIVES',
        contentInstructions: `ALTERNATIVES SECTION:
   - List 3-5 alternative solutions/approaches
   - Brief description of each (2-3 sentences)
   - When to use each alternative`,
        formatInstructions: `ALTERNATIVES:
   <div class="alternatives-section">
     <h2>Alternatives to Consider</h2>
     <div class="alternative-card">
       <h3>🔄 Alternative Name</h3>
       <p class="text-slate-700">Description...</p>
       <p class="text-slate-600 text-sm"><strong>Best for:</strong> When to use this...</p>
     </div>
   </div>`
      },
      {
        name: 'COMMON_MISTAKES',
        contentInstructions: `COMMON MISTAKES SECTION:
   - List 5-7 critical mistakes to avoid
   - Use warning/alert formatting
   - Explain why each is a mistake
   - Provide the correct approach`,
        formatInstructions: `COMMON MISTAKES (alarming with warning icons):
   <div class="mistakes-section">
     <h2>⚠️ Common Mistakes to Avoid</h2>
     <div class="mistake-card warning-card">
       <div class="mistake-icon">❌</div>
       <div class="mistake-content">
         <h3 class="mistake-title">Mistake Title</h3>
         <p class="mistake-description">Why this is wrong...</p>
         <div class="mistake-solution">
           <strong>✅ Instead:</strong> The correct approach...
         </div>
       </div>
     </div>
   </div>`
      },
      {
        name: 'TROUBLESHOOTING',
        contentInstructions: `TROUBLESHOOTING SECTION:
   - Problem/solution format
   - 5-7 common issues
   - Step-by-step solutions`,
        formatInstructions: `TROUBLESHOOTING:
   <div class="troubleshooting-section">
     <h2>🔧 Troubleshooting Guide</h2>
     <div class="troubleshooting-item">
       <h3 class="problem-title">🚨 Problem: [Issue]</h3>
       <div class="solution-content">
         <p><strong>Solution:</strong></p>
         <ol class="solution-steps">
           <li>Step 1...</li>
           <li>Step 2...</li>
         </ol>
       </div>
     </div>
   </div>`
      },
      {
        name: 'EXAMPLES',
        contentInstructions: `EXAMPLES SECTION:
   - 2-3 detailed real-world examples
   - Walk through each example step-by-step
   - Include outcomes/results`,
        formatInstructions: `EXAMPLES:
   <div class="examples-section">
     <h2>💡 Real-World Examples</h2>
     <div class="example-card">
       <h3>Example 1: [Title]</h3>
       <p class="example-context"><strong>Context:</strong> ...</p>
       <p class="example-approach"><strong>Approach:</strong> ...</p>
       <p class="example-outcome"><strong>Outcome:</strong> ...</p>
     </div>
   </div>`
      },
      {
        name: 'CHECKLIST',
        contentInstructions: `CHECKLIST SECTION:
   - Actionable checklist format
   - 10-15 items to check/complete
   - Organized by phase or category
   - Keep items SHORT and ACTION-ORIENTED (6-10 words max)
   - Use strong action verbs (Create, Review, Set up, Test, etc.)`,
        formatInstructions: `CHECKLIST:
   <div class="checklist-section">
     <h2>✅ Action Checklist</h2>
     <div class="checklist-category">
       <h3>Phase 1: [Category]</h3>
           <label>
             <input type="checkbox"> <span>Concise, actionable item</span>
           </label>
     </div>
   </div>
   
   CHECKLIST REQUIREMENTS:
   - Keep items SHORT and ACTION-ORIENTED (6-10 words max)
   - Use strong action verbs (Create, Review, Set up, Test, etc.)
   - Make items specific and measurable
   - Organize by logical phases/categories (3-4 categories)
   - 10-15 total items across all categories
   - Each item should be independently completable`
      }
    ];
    
    // Randomly select 2 sections
    const shuffled = availableSections.sort(() => Math.random() - 0.5);
    const selectedSections = shuffled.slice(0, 2);
    console.log(`🎲 Randomly selected sections: ${selectedSections.map(s => s.name).join(', ')}`);
    
    // Build the instructions for selected sections
    const selectedContentInstructions = selectedSections.map(s => s.contentInstructions).join('\n\n   ');
    const selectedFormatInstructions = selectedSections.map(s => s.formatInstructions).join('\n\n   ');
    
    // Build Brand Essence context for system prompt
    let brandContext = 'You are an expert content writer for Crowley Capital, creating high-quality, informative content for startup founders.';
    
    if (brandEssence.positioning) {
      brandContext += `\n\nBRAND POSITIONING:\n${brandEssence.positioning}`;
    }
    
    if (brandEssence.tone) {
      brandContext += `\n\nTONE & STYLE:\n${brandEssence.tone}`;
    }
    
    if (brandEssence.brand_pillars) {
      brandContext += `\n\nBRAND PILLARS:\n${brandEssence.brand_pillars}`;
    }
    
    brandContext += `\n\nIMPORTANT: Focus on the LATEST and MOST UP-TO-DATE information. Use current trends, recent data, and contemporary examples from ${currentDate} or recent months. Do NOT reference outdated information from years ago unless specifically relevant for historical context. Keep content fresh and relevant to today's startup ecosystem.`;
    
    // ========== STEP 1: CONTENT GENERATION ==========
    generationStatus.set(jobId, { step: 'generating', message: 'Step 1: Generating raw content...' });
    console.log(`📝 Step 1: Generating raw content with ${CONTENT_MODEL}...`);
    
    // Calculate target word count for 9-15 min read time (200 words per minute)
    const targetReadTime = Math.floor(Math.random() * 7) + 9; // Random between 9-15
    const targetWordCount = targetReadTime * 200; // e.g., 9 min = 1800 words, 15 min = 3000 words
    console.log(`🎯 Target article length: ${targetReadTime} min read (${targetWordCount} words)`);
    
    let contentPrompt = '';
    const lengthGuidance = `\n\nIMPORTANT: This should be a COMPREHENSIVE, IN-DEPTH article of approximately ${targetWordCount} words (${targetReadTime}-minute read). 

ARTICLE STRUCTURE REQUIREMENTS:
1. START with a "Quick Answer" section (40-60 words):
   - Lead with the DIRECT ANSWER/CONCLUSION first
   - Make it self-contained and independently readable
   - Match the primary search intent exactly
   - Use people-first, natural language (not keyword-stuffed)
   - This is CRITICAL for Google Featured Snippets and AI Overviews

2. Then include comprehensive content with:
   - Detailed explanations with multiple examples
   - Multiple subsections for each main point
   - Practical, actionable advice
   - Real-world case studies or scenarios
   - Step-by-step processes where applicable
   - Expert tips and best practices

3. Include these 2 RICH CONTENT SECTIONS (include BOTH of these and ONLY these):
   
   ${selectedContentInstructions}
   
   IMPORTANT: Include BOTH sections above. Do NOT add any other rich content sections.

4. The body content MUST elaborate consistently on the Quick Answer:
   - Expand on the same claims (no contradictions)
   - Provide deeper context and evidence
   - Maintain consistent messaging throughout

Make this thorough and valuable - don't rush through topics.`;
    
    if (params.inputType === 'brief') {
      contentPrompt = `Write a comprehensive, in-depth blog article based on this brief:\n\n${params.customBrief}\n\nFocus on the latest, most up-to-date information (${currentDate}). Provide the raw content with clear structure but no HTML formatting.${lengthGuidance}`;
    } else if (params.inputType === 'keywords') {
      contentPrompt = `Write a comprehensive, in-depth blog article incorporating these keywords:\n\n${params.keywordList}\n\nFocus on the latest, most up-to-date information (${currentDate}). Provide the raw content with clear structure but no HTML formatting.${lengthGuidance}`;
    } else {
      contentPrompt = `Write a comprehensive, in-depth blog article about: ${params.topic}\n\nFocus on the latest, most up-to-date information (${currentDate}). Provide the raw content with clear structure but no HTML formatting.${lengthGuidance}`;
    }
    
    // Try primary content model first, fallback if it fails
    let contentCompletion;
    let actualContentModel = CONTENT_MODEL;
    
    try {
      contentCompletion = await openai.chat.completions.create({
        model: CONTENT_MODEL,
        messages: [
          { 
            role: 'system', 
            content: brandContext
          },
          { role: 'user', content: contentPrompt }
        ],
        max_completion_tokens: 8000
      });
      console.log(`✅ Successfully used ${CONTENT_MODEL} for content generation`);
    } catch (error) {
      console.warn(`⚠️ ${CONTENT_MODEL} failed, falling back to ${CONTENT_MODEL_FALLBACK}:`, error.message);
      actualContentModel = CONTENT_MODEL_FALLBACK;
      
      contentCompletion = await openai.chat.completions.create({
        model: CONTENT_MODEL_FALLBACK,
        messages: [
          { 
            role: 'system', 
            content: brandContext
          },
          { role: 'user', content: contentPrompt }
        ],
        max_completion_tokens: 8000
      });
      console.log(`✅ Successfully used ${CONTENT_MODEL_FALLBACK} as fallback`);
    }
    
    const rawContent = contentCompletion.choices[0].message.content;
    console.log(`✅ Step 1 complete: Generated ${rawContent.length} characters of raw content with ${actualContentModel}`);
    
    // ========== STEP 2: HTML/CSS FORMATTING ==========
    generationStatus.set(jobId, { step: 'formatting', message: 'Step 2: Formatting content...' });
    console.log(`🎨 Step 2: Formatting content with ${FORMATTER_MODEL}...`);
    
    const formattingPrompt = `Take this article content and format it into clean, semantic HTML that matches the Crowley Capital design system.

RAW CONTENT:
${rawContent}

FORMATTING REQUIREMENTS:
1. Use semantic HTML5 tags
2. Apply these exact CSS classes from our design system:
   - Headings: Use font-light, text-black, tracking-tight
   - H2: text-3xl mb-6 mt-12 pb-3 border-b border-slate-200
   - H3: text-2xl mb-4 mt-8 font-medium
   - Paragraphs: text-slate-700 leading-relaxed mb-6 text-lg font-light
   - Lists: Use proper ul/ol with list-disc or list-decimal, space-y-3
   - Links: text-black underline font-medium hover:text-slate-700
   - Strong: text-black font-medium

CRITICAL SPACING RULES:
- NEVER use <br> or <br/> tags for spacing between sections, cards, or structural elements
- ALL spacing between sections is handled by CSS (margin/padding classes)
- ONLY use <br> inside paragraphs if you need a line break within the same thought
- Do NOT add <br> after titles, before/after cards, between list items, or around any structural elements
- Let CSS handle all vertical spacing - trust the design system

3. Include a "Quick Answer" box at the start (CRITICAL for Google Featured Snippets & AI Overviews):
   <div class="answer-box">
     <h2>Quick Answer</h2>
     <p>[Write ONE tight, self-contained passage of 40-60 words. Lead with the direct answer/conclusion FIRST, then support it. Match the primary search intent exactly. Be people-first, not keyword-stuffed. This must directly answer the main question. The body content below should elaborate on this same answer consistently without contradictions.]</p>
   </div>
   
   QUICK ANSWER REQUIREMENTS:
   - Exactly 40-60 words (tight and focused)
   - Lead with the conclusion/answer FIRST
   - Self-contained (can be read independently)
   - Directly answers the primary question
   - People-first language (natural, not robotic)
   - Zero keyword stuffing
   - Body content must expand on this consistently

4. Include "Key Takeaways" section with bullet points

5. For FAQ section, use accordion format (5 to 7 questions):
   <div class="faq-accordion">
     <details class="faq-item">
       <summary class="faq-question">[Question]</summary>
       <div class="faq-answer">
         <p>[Answer]</p>
       </div>
     </details>
   </div>

6. RICH CONTENT SECTION FORMATTING (format ONLY these sections if they appear in the content):

   ${selectedFormatInstructions}

7. NO markdown code blocks (no \`\`\`html)
8. Return ONLY the HTML content, nothing else
9. Ensure proper spacing and readability

Format the content now:`;
    
    // Try primary formatter model first, fallback if it fails
    let formattingCompletion;
    let actualFormatterModel = FORMATTER_MODEL;
    
    try {
      formattingCompletion = await openai.chat.completions.create({
        model: FORMATTER_MODEL,
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert HTML/CSS formatter. You take raw content and format it into clean, semantic HTML that matches specific design system requirements. Always follow the exact CSS classes provided.'
          },
          { role: 'user', content: formattingPrompt }
        ],
        max_completion_tokens: 10000
      });
      console.log(`✅ Successfully used ${FORMATTER_MODEL} for formatting`);
    } catch (error) {
      console.warn(`⚠️ ${FORMATTER_MODEL} failed, falling back to ${FORMATTER_MODEL_FALLBACK}:`, error.message);
      actualFormatterModel = FORMATTER_MODEL_FALLBACK;
      
      formattingCompletion = await openai.chat.completions.create({
        model: FORMATTER_MODEL_FALLBACK,
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert HTML/CSS formatter. You take raw content and format it into clean, semantic HTML that matches specific design system requirements. Always follow the exact CSS classes provided.'
          },
          { role: 'user', content: formattingPrompt }
        ],
        max_completion_tokens: 10000
      });
      console.log(`✅ Successfully used ${FORMATTER_MODEL_FALLBACK} as fallback`);
    }
    
    let formattedContent = formattingCompletion.choices[0].message.content;
    formattedContent = formattedContent.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();
    console.log(`✅ Step 2 complete: Formatted into HTML with ${actualFormatterModel}`);
    
    // ========== STEP 3: GENERATE METADATA ==========
    generationStatus.set(jobId, { step: 'metadata', message: 'Step 3: Generating title and metadata...' });
    console.log('📌 Step 3: Generating title and metadata...');
    
    // Generate title
    const titleCompletion = await openai.chat.completions.create({
      model: FORMATTER_MODEL,
      messages: [
        { role: 'system', content: 'You are a headline expert. Create compelling, SEO-friendly titles.' },
        { role: 'user', content: `Generate ONE compelling title (50-70 characters) for an article about: ${params.topic || 'startup strategy'}. Return ONLY the title, nothing else.` }
      ],
      max_completion_tokens: 100
    });
    
    const title = titleCompletion.choices[0].message.content.replace(/^["']|["']$/g, '').trim() || 'Untitled Article';
    
    // Generate slug
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    // Generate excerpt
    const excerptCompletion = await openai.chat.completions.create({
      model: FORMATTER_MODEL,
      messages: [
        { role: 'system', content: 'You are an expert at writing compelling meta descriptions.' },
        { role: 'user', content: `Create a 2-3 sentence excerpt (120-160 characters) for: "${title}". Return ONLY the excerpt, nothing else.` }
      ],
      max_completion_tokens: 150
    });
    
    const excerpt = excerptCompletion.choices[0].message.content.replace(/^["']|["']$/g, '');
    
    // Calculate read time
    const wordCount = formattedContent.split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / 200)} min read`;
    
    console.log(`✅ Step 3 complete: Title: "${title}"`);
    
    // ========== STEP 4: SAVE TO DATABASE ==========
    console.log('💾 Step 4: Saving to database...');
    const query = `
      INSERT INTO articles (
        title, description, article, url, meta_description, topic, 
        author, publisher, status, featured, read_time, date_published, date_created, date_modified
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *;
    `;
    
    await pool.query(query, [
      title.substring(0, 255),
      excerpt,
      formattedContent,
      slug.substring(0, 255),
      excerpt,
      params.topic?.substring(0, 255) || 'General',
      'Jake Crowley',
      'Crowley Capital',
      'published',
      params.featured || false,
      readTime,
      new Date().toISOString()
    ]);
    
    console.log('✅ Article published successfully:', title);
    console.log('🎉 2-step generation process complete!');
    
    // Mark as complete
    generationStatus.set(jobId, { step: 'complete', message: 'Article published!' });
    
    // Clean up after 5 minutes
    setTimeout(() => generationStatus.delete(jobId), 300000);
    
  } catch (err) {
    console.error('❌ Error in background article generation:', err);
    generationStatus.set(jobId, { step: 'error', message: 'Generation failed' });
  }
}

app.get('/api/articles', async (req, res) => {
  try {
    const { status, search, limit = 100 } = req.query;
    
    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];
    let paramCount = 1;
    
    if (status && status !== 'all') {
      query += ` AND status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }
    
    if (search) {
      query += ` AND (title ILIKE $${paramCount} OR description ILIKE $${paramCount} OR topic ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }
    
    query += ' ORDER BY date_created DESC';
    query += ` LIMIT $${paramCount}`;
    params.push(limit);
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching articles:', err);
    res.status(500).json({ error: 'Failed to fetch articles', details: err.message });
  }
});

app.get('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching article:', err);
    res.status(500).json({ error: 'Failed to fetch article', details: err.message });
  }
});

app.post('/api/articles', async (req, res) => {
  try {
    const {
      title,
      description,
      article,
      url,
      meta_description,
      topic,
      author = 'Jake Crowley',
      publisher = 'Crowley Capital',
      status = 'draft',
      featured = false,
      read_time,
      date_published
    } = req.body;
    
    if (!title || !description || !article || !url) {
      return res.status(400).json({ error: 'Missing required fields: title, description, article, url' });
    }
    
    const query = `
      INSERT INTO articles (
        title, description, article, url, meta_description, topic, 
        author, publisher, status, featured, read_time, date_published, date_created, date_modified
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *;
    `;
    
    const result = await pool.query(query, [
      title, description, article, url, meta_description, topic,
      author, publisher, status, featured, read_time, date_published
    ]);
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating article:', err);
    res.status(500).json({ error: 'Failed to create article', details: err.message });
  }
});

app.patch('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, date_published } = req.body;
    
    const query = `
      UPDATE articles SET
        status = COALESCE($1, status),
        date_published = COALESCE($2, date_published),
        date_modified = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *;
    `;
    
    const result = await pool.query(query, [status, date_published, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating article:', err);
    res.status(500).json({ error: 'Failed to update article', details: err.message });
  }
});

app.put('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      article,
      url,
      meta_description,
      topic,
      author,
      publisher,
      status,
      featured
    } = req.body;
    
    const query = `
      UPDATE articles SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        article = COALESCE($3, article),
        url = COALESCE($4, url),
        meta_description = COALESCE($5, meta_description),
        topic = COALESCE($6, topic),
        author = COALESCE($7, author),
        publisher = COALESCE($8, publisher),
        status = COALESCE($9, status),
        featured = COALESCE($10, featured),
        date_modified = CURRENT_TIMESTAMP,
        date_published = CASE WHEN $9 = 'published' AND date_published IS NULL THEN CURRENT_TIMESTAMP ELSE date_published END
      WHERE id = $11
      RETURNING *;
    `;
    
    const result = await pool.query(query, [
      title, description, article, url, meta_description, topic,
      author, publisher, status, featured, id
    ]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating article:', err);
    res.status(500).json({ error: 'Failed to update article', details: err.message });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM articles WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({ success: true, message: 'Article deleted successfully' });
  } catch (err) {
    console.error('Error deleting article:', err);
    res.status(500).json({ error: 'Failed to delete article', details: err.message });
  }
});

// ==================== ERROR HANDLING ====================

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// ==================== START SERVER ====================

app.listen(port, () => {
  console.log(`🚀 Backend API server running on http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/api/health`);
  console.log(`⚙️  Settings API: http://localhost:${port}/api/settings`);
  console.log(`📝 Articles API: http://localhost:${port}/api/articles`);
  console.log(`✨ Generate API (2-step): http://localhost:${port}/api/articles/generate`);
});
