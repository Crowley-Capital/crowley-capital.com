import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import ArticleScheduler from './scheduler.js';
import { getRichContentSections, buildBrandContext, getLengthGuidance, getFormattingPrompt } from './prompts.js';
import { generateArticleImage } from './imageUtils.js';

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

// Initialize Article Scheduler (after database is connected)
let articleScheduler = null;

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

// GET /api/scheduler/status - Get scheduler status
app.get('/api/scheduler/status', (req, res) => {
  if (!articleScheduler) {
    return res.json({
      initialized: false,
      active: false,
      schedule: null,
      nextRun: 'Scheduler not initialized'
    });
  }
  
  res.json(articleScheduler.getStatus());
});

// POST /api/scheduler/trigger - Manually trigger scheduled generation
app.post('/api/scheduler/trigger', async (req, res) => {
  if (!articleScheduler) {
    return res.status(503).json({ error: 'Scheduler not initialized' });
  }
  
  try {
    // Trigger in background
    articleScheduler.triggerManual();
    res.json({ 
      success: true, 
      message: 'Manual generation triggered. Check articles in a few minutes.' 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to trigger manual generation', details: error.message });
  }
});

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
    
    // Reload scheduler with new settings
    if (articleScheduler) {
      await articleScheduler.reloadSettings();
    }
    
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
    const availableSections = getRichContentSections();
    
    // Randomly select 2 sections
    const shuffled = availableSections.sort(() => Math.random() - 0.5);
    const selectedSections = shuffled.slice(0, 2);
    console.log(`🎲 Randomly selected sections: ${selectedSections.map(s => s.name).join(', ')}`);
    
    // Build the instructions for selected sections
    const selectedContentInstructions = selectedSections.map(s => s.contentInstructions).join('\n\n   ');
    const selectedFormatInstructions = selectedSections.map(s => s.formatInstructions).join('\n\n   ');
    
    // Build Brand Essence context for system prompt
    const brandContext = buildBrandContext(brandEssence, currentDate);
    
    // ========== STEP 1: CONTENT GENERATION ==========
    generationStatus.set(jobId, { step: 'generating', message: 'Step 1: Generating raw content...' });
    console.log(`📝 Step 1: Generating raw content with ${CONTENT_MODEL}...`);
    
    // Calculate target word count for 9-15 min read time (200 words per minute)
    const targetReadTime = Math.floor(Math.random() * 7) + 9; // Random between 9-15
    const targetWordCount = targetReadTime * 200; // e.g., 9 min = 1800 words, 15 min = 3000 words
    console.log(`🎯 Target article length: ${targetReadTime} min read (${targetWordCount} words)`);
    
    let contentPrompt = '';
    const lengthGuidance = getLengthGuidance(targetWordCount, targetReadTime, selectedContentInstructions);
    
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
    
    const formattingPrompt = getFormattingPrompt(rawContent, selectedFormatInstructions);
    
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
    
    // Check for duplicate URL before continuing (saves API costs)
    console.log('🔍 Checking for duplicate URL:', slug);
    const duplicateCheck = await pool.query('SELECT id FROM articles WHERE url = $1', [slug]);
    if (duplicateCheck.rows.length > 0) {
      const errorMessage = `Article with URL "${slug}" already exists. Please delete the existing article or choose a different topic.`;
      console.error('❌', errorMessage);
      generationStatus.set(jobId, { 
        step: 'error', 
        message: errorMessage,
        error: 'DUPLICATE_URL'
      });
      throw new Error(errorMessage);
    }
    console.log('✅ URL is unique, continuing...');
    
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
    
    // ========== STEP 4: GENERATE HERO IMAGE ==========
    generationStatus.set(jobId, { step: 'image', message: 'Step 4: Generating hero image...' });
    console.log('🎨 Step 4: Generating article hero image...');
    
    let imageUrl = null;
    let imageAlt = null;
    
    try {
      const imageResult = await generateArticleImage({
        title,
        description: excerpt,
        slug,
        quickAnswer: excerpt  // Use excerpt as quick answer
      }, process.env.OPENAI_API_KEY);
      
      imageUrl = imageResult.imageUrl;
      imageAlt = imageResult.imageAlt;
      
      console.log('✅ Step 4 complete: Hero image generated');
    } catch (error) {
      console.warn('⚠️ Image generation failed, continuing without image:', error.message);
      // Continue without image - not critical
    }
    
    // ========== STEP 5: SAVE TO DATABASE ==========
    console.log('💾 Step 5: Saving to database...');
    const query = `
      INSERT INTO articles (
        title, description, article, url, meta_description, topic, 
        author, publisher, status, featured, read_time, date_published, 
        image_url, image_alt, date_created, date_modified
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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
      new Date().toISOString(),
      imageUrl,
      imageAlt
    ]);
    
    console.log('✅ Article published successfully:', title);
    if (imageUrl) {
      console.log(`📸 With hero image: ${imageUrl}`);
    }
    console.log('🎉 Full article generation process complete!');
    
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

// ==================== SERVE FRONTEND (for single web service deployment) ====================

// Serve static files from the frontend build
const frontendPath = join(__dirname, '..', '..', 'web', 'dist');
app.use(express.static(frontendPath));

// Serve uploaded images
app.use('/images', express.static(join(__dirname, '..', 'public', 'images')));

// Catch-all route: serve index.html for client-side routing (must be AFTER API routes)
app.get('*', (req, res, next) => {
  // Only serve index.html for non-API routes
  if (req.path.startsWith('/api/')) {
    return next(); // Let the 404 handler deal with unknown API routes
  }
  res.sendFile(join(frontendPath, 'index.html'));
});

// 404 handler for API routes
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'Endpoint not found' });
  } else {
    res.status(404).send('Not Found');
  }
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// ==================== START SERVER ====================

app.listen(port, async () => {
  console.log(`🚀 Backend API server running on http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/api/health`);
  console.log(`⚙️  Settings API: http://localhost:${port}/api/settings`);
  console.log(`📝 Articles API: http://localhost:${port}/api/articles`);
  console.log(`✨ Generate API (2-step): http://localhost:${port}/api/articles/generate`);
  console.log(`🕐 Scheduler API: http://localhost:${port}/api/scheduler/status`);
  
  // Initialize scheduler after server starts
  articleScheduler = new ArticleScheduler(pool, generateArticleInBackground);
  await articleScheduler.initialize();
});
