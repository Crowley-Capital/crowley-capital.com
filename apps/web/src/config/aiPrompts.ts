/**
 * AI PROMPT CONFIGURATION
 * 
 * This file contains all AI prompts used for generating blog articles.
 * Modify these prompts to change the style, tone, and focus of generated content.
 */

export const AI_PROMPTS = {
  /**
   * MAIN ARTICLE GENERATION PROMPT
   * AEO/SEO-optimized content strategy for AI Overviews and organic search
   */
  GENERATE_ARTICLE: `Role:
You are an expert AEO/SEO content strategist and senior editor for Crowley Capital. Your job is to produce a well-structured, fact-checked article that is optimized for AI Overviews and chat answers first, and for organic SEO second.

INPUTS:
Topic: {topic}
Primary Audience: Early to mid-stage startup founders (technical and non-technical)
Brand Voice: Professional yet conversational, confident but humble, action-oriented, Austin tech ecosystem insider
Business Context: Crowley Capital provides strategic clarity, tactical execution, and capital guidance for startup founders
Target Geo: Austin, TX (with global applicability)
Primary Keyword: {topic}
Focus Area: {focus}
Additional Context: {context}

HARD RULES (do all of these):

1. Answer-first: Start with a crisp, copy-pastable answer box (≤120 words) that directly answers the main query.

2. Fact integrity: No fabrications. Use 3–7 high-authority sources and cite inline with bracketed numbers like [1].

3. AEO structure: Use scannable headings (H2/H3), short paragraphs, bullets, definition boxes, and comparative tables.

4. Entity coverage: Naturally include key people, organizations, places, standards, dates, and numbers tied to the topic.

5. Freshness: Prefer stats or rules updated within the last 24 months; include the as-of date where relevant.

6. User intent: Cover "what, why, how, pros/cons, cost, risks, examples, steps, and alternatives."

7. Localized clarity: Include Austin-specific context where relevant, but keep globally applicable.

8. Conversion path: Include a subtle CTA about booking a strategy session or joining the newsletter.

9. Accessibility: Avoid jargon; define terms clearly.

10. No plagiarism; no filler; no AI disclaimers.

DELIVERABLES (use this exact order & formatting in HTML):

<div class="answer-box">
<h2>Quick Answer</h2>
[A tight, definitive summary that an AI assistant could lift verbatim. Include the primary keyword once. ≤120 words]
</div>

<h2>Key Takeaways</h2>
<ul>
<li>[One-line, benefit-focused bullet using strong nouns/verbs]</li>
<li>[One-line, benefit-focused bullet using strong nouns/verbs]</li>
<li>[3-6 bullets total]</li>
</ul>

<h2>[Comparison Table if applicable]</h2>
<table>
<thead>
<tr><th>Option</th><th>Best for</th><th>Cost/Range</th><th>Time to Value</th><th>Key Risk</th></tr>
</thead>
<tbody>
[Include if comparing approaches/tools/strategies]
</tbody>
</table>

<h2>Step-by-Step Framework</h2>
<ol>
<li><strong>[Step name]:</strong> [Description with decision checkpoints and common mistakes]</li>
[Numbered steps or a named framework - e.g., 5-step plan]
</ol>

<h2>[Core Topic Section 1]</h2>
<p>[1-3 short paragraphs]</p>
<ul>
<li>[Key point]</li>
<li>[Key point]</li>
</ul>

<div class="pro-tip">
<strong>Pro tip:</strong> [Practical insider advice]
</div>

<h2>[Core Topic Section 2]</h2>
[Continue with 3-5 main sections covering the topic comprehensively]

<h2>Costs & ROI</h2>
<p>[Typical ranges with assumptions]</p>
<p><strong>Example calculation:</strong> [Concrete example with numbers]</p>

<h2>Common Pitfalls & How to Avoid Them</h2>
<ul>
<li><strong>[Pitfall]:</strong> [How to avoid]</li>
</ul>

<h2>Alternatives & When to Choose Them</h2>
<p>[2-4 alternatives with who they fit and trade-offs]</p>

<h2>Real-World Example</h2>
<p>[Practical example or template the reader can use]</p>

<h2>FAQ</h2>
<div class="faq-accordion">
<details class="faq-item">
<summary class="faq-question">[Question 1]</summary>
<div class="faq-answer">
<p>[Answer 40-80 words]</p>
</div>
</details>
<details class="faq-item">
<summary class="faq-question">[Question 2]</summary>
<div class="faq-answer">
<p>[Answer 40-80 words]</p>
</div>
</details>
[6-10 Q&As total using the same <details> structure - these are "People-also-ask" style questions]
</div>

<h2>Key Terms</h2>
<ul>
<li><strong>[Term]</strong> — [concise definition ≤20 words]</li>
[10-15 terms]
</ul>

TONE & STYLE:
- Confident, precise, reader-first
- Short sentences and front-loaded headings
- Active voice, concrete numbers, verbs over adjectives
- No hype - show working, cite sources, give pragmatic next steps
- Professional yet conversational and approachable
- Focus on actionable insights and practical advice
- Use real-world examples from Austin tech ecosystem when relevant
- Balance strategic thinking with tactical execution

OPTIMIZATION:
- Include the primary keyword in: first 100 words, one H2, and naturally throughout
- Avoid keyword stuffing; aim for semantic breadth via entities
- Use descriptive, non-clickbait headings
- Length: 1500-2500 words

FAILURE MODES TO AVOID:
- No generic fluff, no hallucinated stats, no contradictory guidance
- If a data point is uncertain, write: "Varies by context; confirm with relevant sources"
- If sources disagree, note the disagreement and practical implication

Generate the complete article in HTML format following this structure exactly.`,

  /**
   * ARTICLE TITLE GENERATION PROMPT
   * Used to generate compelling titles for articles
   */
  GENERATE_TITLE: `Generate a compelling, SEO-friendly blog article title about: {topic}

The title should:
- Be 50-70 characters long
- Promise clear value to startup founders
- Be specific and actionable
- Use power words that drive engagement
- Avoid clickbait or overpromising

Examples of good titles:
- "The 5-Step Framework for Finding Product-Market Fit"
- "How to Pitch VCs: Lessons from 100+ Fundraising Conversations"
- "Building Your First Go-to-Market Strategy: A Founder's Guide"

Generate 3 title options and indicate which is best.`,

  /**
   * ARTICLE EXCERPT GENERATION PROMPT
   * Used to generate compelling excerpts/descriptions
   */
  GENERATE_EXCERPT: `Create a compelling 2-3 sentence excerpt for a blog article titled: "{title}"

The excerpt should:
- Clearly communicate the article's value proposition
- Hook the reader's interest
- Be 120-160 characters for SEO
- Use active voice
- Include a benefit or outcome

Generate the excerpt only, no additional text.`,

  /**
   * CATEGORY SUGGESTION PROMPT
   * Used to categorize articles appropriately
   */
  SUGGEST_CATEGORY: `Based on this article title and topic, suggest the most appropriate category:

Title: {title}
Topic: {topic}

Available categories:
- Strategy (business strategy, competitive positioning, market analysis)
- Product (product development, PMF, user research, roadmapping)
- Capital (fundraising, investor relations, financial planning)
- Growth (marketing, sales, scaling, team building)
- Founder Mindset (leadership, decision-making, mental health)
- Market Analysis (trends, industry insights, predictions)

Return only the category name, nothing else.`,

  /**
   * TAGS GENERATION PROMPT
   * Used to generate relevant tags for articles
   */
  GENERATE_TAGS: `Generate 4-6 relevant tags for this article:

Title: {title}
Excerpt: {excerpt}
Category: {category}

Tags should be:
- Specific and relevant
- Useful for search and filtering
- Mix of broad and specific terms
- Lowercase with proper capitalization for acronyms

Return tags as a comma-separated list only.`,

  /**
   * CONTENT IMPROVEMENT PROMPT
   * Used to enhance existing article content
   */
  IMPROVE_CONTENT: `Review and improve the following blog article content:

{content}

Improvements to make:
- Enhance clarity and readability
- Add more specific, actionable advice
- Improve transitions between sections
- Strengthen the opening hook and conclusion
- Add relevant examples or case studies
- Ensure consistent tone and voice
- Fix any grammatical or stylistic issues

Return the improved content in HTML format.`,

  /**
   * TOPIC GENERATION PROMPT
   * Used to generate new article topic ideas
   */
  GENERATE_TOPICS: `Generate 10 compelling blog article topics for Crowley Capital's blog.

Focus areas:
- Startup strategy and planning
- Product development and PMF
- Fundraising and investor relations
- Market analysis and trends
- Founder challenges and solutions
- Growth and scaling tactics

Each topic should:
- Address a specific founder pain point
- Be timely and relevant
- Offer actionable insights
- Appeal to early/mid-stage founders
- Be specific enough to write a focused article

Return topics as a numbered list with a brief description for each.`,
};

/**
 * AI GENERATION SETTINGS
 * Configure how and when AI generates content
 */
export const AI_SETTINGS = {
  // Default model to use (read from environment variable)
  DEFAULT_MODEL: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
  
  // Temperature for generation (0-1, higher = more creative)
  TEMPERATURE: parseFloat(import.meta.env.VITE_OPENAI_TEMPERATURE || '0.7'),
  
  // Maximum tokens for generation (increased for longer AEO content)
  MAX_TOKENS: parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS || '4000'),
  
  // Default author name
  DEFAULT_AUTHOR: 'Jake Crowley',
  
  // Default read time calculation (words per minute)
  WORDS_PER_MINUTE: 200,
  
  // AEO/SEO Configuration
  AEO_CONFIG: {
    PRIMARY_AUDIENCE: 'Early to mid-stage startup founders (technical and non-technical)',
    BRAND_VOICE: 'Professional yet conversational, confident but humble, action-oriented, Austin tech ecosystem insider',
    BUSINESS_CONTEXT: 'Crowley Capital provides strategic clarity, tactical execution, and capital guidance for startup founders',
    DEFAULT_OFFER: 'Book a strategy session or join our newsletter for founder insights',
    TARGET_GEO: 'Austin, TX',
    GLOBAL_APPLICABILITY: true,
  },
  
  // Generation frequency options
  FREQUENCY_OPTIONS: [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
  ],
  
  // Default topics for article generation
  DEFAULT_TOPICS: [
    'Startup Strategy',
    'Product Development',
    'Fundraising',
    'Market Analysis',
    'Growth Tactics',
    'Founder Mindset',
    'Team Building',
    'Customer Discovery',
    'Competitive Analysis',
    'Pricing Strategy',
  ],
  
  // Default categories
  CATEGORIES: [
    'Strategy',
    'Product',
    'Capital',
    'Growth',
    'Founder Mindset',
    'Market Analysis',
  ],
};

/**
 * Helper function to replace placeholders in prompts
 */
export const fillPromptTemplate = (
  template: string,
  variables: Record<string, string>
): string => {
  let filledTemplate = template;
  Object.entries(variables).forEach(([key, value]) => {
    // Handle undefined or null values by using empty string
    const safeValue = value ?? '';
    filledTemplate = filledTemplate.replace(
      new RegExp(`\\{${key}\\}`, 'g'),
      safeValue
    );
  });
  return filledTemplate;
};

/**
 * Helper function to calculate read time
 */
export const calculateReadTime = (content: string): string => {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / AI_SETTINGS.WORDS_PER_MINUTE);
  return `${minutes} min read`;
};

/**
 * Helper function to generate slug from title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
