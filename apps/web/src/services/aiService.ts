/**
 * AI Service for Article Generation
 * 
 * ⚠️ DEPRECATED & INSECURE ⚠️
 * This file is deprecated and should NOT be used!
 * 
 * SECURITY ISSUE: This service exposes OpenAI API keys to the frontend (browser),
 * which is a major security vulnerability. API keys can be extracted from the browser
 * and misused.
 * 
 * CORRECT APPROACH: All AI calls should go through the backend API at apps/api/src/server.js
 * The backend securely stores the API key and makes OpenAI calls server-side.
 * 
 * This file is kept for reference only and will be removed in a future update.
 */

import { AI_PROMPTS, AI_SETTINGS, fillPromptTemplate, calculateReadTime, generateSlug } from '@/config/aiPrompts';

interface GenerateArticleParams {
  topic?: string;
  focus?: string;
  context?: string;
  model?: string;
  inputType?: 'topic' | 'brief' | 'keywords';
  customBrief?: string;
  keywordList?: string;
}

interface GeneratedArticle {
  title: string;           // varchar(255) - Article title
  slug: string;            // url varchar(255) - URL-friendly slug
  excerpt: string;         // description text & meta_description text
  content: string;         // article text - Full HTML content
  category: string;        // topic varchar(255) - Article category/topic
  tags: string[];          // For display purposes only (not in DB schema)
  readTime: string;        // For display purposes only (not in DB schema)
  author: string;          // author varchar(100) - Default 'Jake Crowley'
}

/**
 * Generate a complete article using OpenAI
 */
export const generateArticle = async (params: GenerateArticleParams = {}): Promise<GeneratedArticle> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const model = params.model || AI_SETTINGS.DEFAULT_MODEL;
  
  if (!apiKey) {
    throw new Error('OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your .env file.');
  }

  try {
    // Step 1: Build the article prompt based on input type
    let articlePrompt: string;
    let systemMessage: string;
    
    const inputType = params.inputType || 'topic';
    
    console.log('generateArticle called with params:', {
      inputType,
      topic: params.topic,
      customBrief: params.customBrief?.substring(0, 50),
      keywordList: params.keywordList?.substring(0, 50),
      model
    });
    
    switch (inputType) {
      case 'brief':
        systemMessage = 'You are an expert content writer for Crowley Capital. You excel at taking custom briefs and turning them into well-structured, comprehensive articles that match the brand voice and SEO requirements.';
        articlePrompt = `Create a comprehensive blog article based on this custom brief:

CUSTOM BRIEF:
${params.customBrief || 'No brief provided'}

INSTRUCTIONS:
1. Follow the brief's direction while maintaining Crowley Capital's brand voice (professional yet conversational, action-oriented, Austin tech ecosystem insider)
2. Use the standard AEO/SEO structure:
${AI_PROMPTS.GENERATE_ARTICLE}

3. Ensure the article addresses the specific requirements in the brief
4. If the brief is vague, make reasonable assumptions and create a high-quality article

Generate the article in HTML format.`;
        break;
        
      case 'keywords':
        systemMessage = 'You are an expert SEO content writer for Crowley Capital. You specialize in creating comprehensive articles that naturally incorporate target keywords while providing genuine value to readers.';
        articlePrompt = `Create a comprehensive blog article that incorporates these target keywords:

TARGET KEYWORDS:
${params.keywordList || 'No keywords provided'}

INSTRUCTIONS:
1. Identify the main topic from the keywords
2. Create a cohesive article that naturally incorporates all keywords
3. Don't keyword stuff - use semantic variations and related terms
4. Follow the standard AEO/SEO structure:
${AI_PROMPTS.GENERATE_ARTICLE}

5. Make sure the article provides real value, not just keyword placement
6. Use keywords in headings, first paragraph, and naturally throughout

Generate the article in HTML format.`;
        break;
        
      case 'topic':
      default:
        const safeTopic = params.topic || 'Startup Strategy';
        const safeFocus = params.focus || 'Actionable insights for early-stage founders';
        const safeContext = params.context || 'Austin tech ecosystem';
        
        console.log('Topic generation with:', { safeTopic, safeFocus, safeContext });
        
        systemMessage = 'You are an expert content writer for Crowley Capital, specializing in startup strategy, product development, and founder advice.';
        articlePrompt = fillPromptTemplate(AI_PROMPTS.GENERATE_ARTICLE, {
          topic: safeTopic,
          focus: safeFocus,
          context: safeContext
        });
        break;
    }

    console.log('Generating article with OpenAI using model:', model);
    console.log('Input type:', inputType);
    
    const articleResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: articlePrompt
          }
        ],
        max_completion_tokens: AI_SETTINGS.MAX_TOKENS
      })
    });

    if (!articleResponse.ok) {
      const error = await articleResponse.json();
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const articleData = await articleResponse.json();
    let content = articleData.choices[0].message.content;
    
    // Clean up markdown code blocks if present
    content = content.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();

    // Step 2: Generate the title
    const safeTitleTopic = params.topic || 'Startup Strategy';
    console.log('Generating title for topic:', safeTitleTopic);
    
    const titlePrompt = fillPromptTemplate(AI_PROMPTS.GENERATE_TITLE, {
      topic: safeTitleTopic
    });

    const titleResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: 'You are a headline expert.' },
          { role: 'user', content: titlePrompt }
        ],
        max_completion_tokens: 100
      })
    });

    const titleData = await titleResponse.json();
    const titleText = titleData.choices[0].message.content;
    // Extract the first title from the response (usually numbered)
    const title = titleText.split('\n').find(line => line.match(/^\d+\.|^-/))?.replace(/^\d+\.\s*|-\s*/, '') || titleText.split('\n')[0] || 'Untitled Article';

    // Step 3: Generate the excerpt
    const excerptPrompt = fillPromptTemplate(AI_PROMPTS.GENERATE_EXCERPT, {
      title: title || 'Untitled Article'
    });

    const excerptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: 'You are an expert at writing compelling article descriptions.' },
          { role: 'user', content: excerptPrompt }
        ],
        max_completion_tokens: 150
      })
    });

    const excerptData = await excerptResponse.json();
    const excerpt = excerptData.choices[0].message.content.replace(/^["']|["']$/g, '');

    // Step 4: Generate category/topic
    const categoryPrompt = fillPromptTemplate(AI_PROMPTS.SUGGEST_CATEGORY, {
      title: title || 'Untitled Article',
      topic: params.topic || 'General'
    });

    const categoryResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: 'You are an expert at categorizing content.' },
          { role: 'user', content: categoryPrompt }
        ],
        max_completion_tokens: 50
      })
    });

    const categoryData = await categoryResponse.json();
    const category = categoryData.choices[0].message.content.replace(/^["']|["']$/g, '');

    // Step 5: Generate tags
    const tagsPrompt = fillPromptTemplate(AI_PROMPTS.GENERATE_TAGS, {
      title: title || 'Untitled Article',
      excerpt: excerpt || '',
      category: category || 'General'
    });

    const tagsResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: 'You are an expert at creating relevant tags.' },
          { role: 'user', content: tagsPrompt }
        ],
        max_completion_tokens: 100
      })
    });

    const tagsData = await tagsResponse.json();
    const tagsText = tagsData.choices[0].message.content;
    const tags = tagsText.split(',').map(tag => tag.trim().replace(/^["']|["']$/g, '')).slice(0, 5);

    // Calculate read time and generate slug
    const readTime = calculateReadTime(content);
    const slug = generateSlug(title);

    return {
      title: title.replace(/^["']|["']$/g, ''),
      slug,
      excerpt,
      content,
      category,
      tags,
      readTime,
      author: AI_SETTINGS.DEFAULT_AUTHOR
    };

  } catch (error) {
    console.error('Error generating article:', error);
    throw error;
  }
};

/**
 * Test OpenAI API connection
 */
export const testOpenAIConnection = async (): Promise<boolean> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    return false;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    return response.ok;
  } catch (error) {
    console.error('Error testing OpenAI connection:', error);
    return false;
  }
};

/**
 * Generate topic ideas using AI
 */
export const generateTopicIdeas = async (count: number = 5): Promise<string[]> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const prompt = `Generate ${count} blog article topic ideas for startup founders. 
    
Topics should be:
- Actionable and specific
- Relevant to early-stage startups
- Cover strategy, product, fundraising, or growth
- Suitable for the Austin tech ecosystem

Return only the topics, one per line, without numbers or bullets.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: AI_SETTINGS.DEFAULT_MODEL,
        messages: [
          { role: 'system', content: 'You are a content strategist for startup founders.' },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: 200
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate topic ideas');
    }

    const data = await response.json();
    const topicsText = data.choices[0].message.content;
    const topics = topicsText.split('\n')
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0)
      .slice(0, count);

    return topics;
  } catch (error) {
    console.error('Error generating topic ideas:', error);
    throw error;
  }
};