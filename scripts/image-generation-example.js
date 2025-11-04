/**
 * Simple example of OpenAI DALL-E Image Generation
 * 
 * This shows the basic API usage without all the CLI features.
 * Use this as a reference for integrating image generation into your app.
 */

import OpenAI from 'openai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

async function simpleImageGeneration() {
  // Initialize OpenAI client
  const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
  });

  try {
    console.log('Generating image...\n');
    
    // Generate an image using gpt-image-1-mini (cost-efficient model)
    const response = await openai.images.generate({
      model: 'gpt-image-1-mini',
      prompt: 'A professional venture capital office with modern design',
      n: 1,
      size: '1024x1024',
      quality: 'auto' // gpt-image-1-mini uses: 'low', 'medium', 'high', or 'auto'
      // Note: gpt-image-1-mini returns URL by default, response_format not supported
    });

    // Get the generated image URL
    const imageUrl = response.data[0].url;
    const revisedPrompt = response.data[0].revised_prompt;

    console.log('✅ Image generated successfully!\n');
    console.log('Image URL:', imageUrl);
    console.log('\nRevised Prompt:', revisedPrompt);
    console.log('\nNote: The URL is temporary and expires after ~1 hour');
    
    return response.data[0];

  } catch (error) {
    console.error('Error generating image:', error.message);
    
    if (error.response) {
      console.error('API Error:', error.response.data);
    }
    
    throw error;
  }
}

// Example: Generate image with different settings
async function generateWithOptions(prompt, options = {}) {
  const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
  });

  const defaults = {
    model: 'gpt-image-1-mini', // Cost-efficient model (can also use 'dall-e-2' or 'dall-e-3')
    n: 1,
    size: '1024x1024',
    quality: 'auto' // gpt-image-1-mini: 'low'|'medium'|'high'|'auto', dall-e: 'standard'|'hd'
  };

  const config = { ...defaults, ...options, prompt };
  
  // Add response_format only for dall-e models
  if (config.model === 'dall-e-2' || config.model === 'dall-e-3') {
    config.response_format = config.response_format || 'url';
  }

  try {
    const response = await openai.images.generate(config);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Example: Generate and download image as base64
async function generateAsBase64() {
  const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
  });

  try {
    // Note: For base64 with gpt-image-1-mini, we need to fetch the URL and convert
    // For dall-e models, you can use response_format: 'b64_json'
    const response = await openai.images.generate({
      model: 'gpt-image-1-mini',
      prompt: 'Abstract tech pattern',
      n: 1,
      size: '1024x1024',
      quality: 'auto'
    });

    // Get the image URL and convert to base64 if needed
    const imageUrl = response.data[0].url;
    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const b64Data = buffer.toString('base64');
    
    console.log('✅ Image generated as base64');
    console.log('Base64 length:', b64Data.length);
    
    // You can now save it to a file or use it directly
    // Example: <img src="data:image/png;base64,{b64Data}" />
    
    return b64Data;

  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Example: Integrate with your Express API
function createImageEndpoint(app) {
  app.post('/api/generate-image', async (req, res) => {
    try {
      const { prompt, size = '1024x1024', quality = 'auto', model = 'gpt-image-1-mini' } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const openai = new OpenAI({ 
        apiKey: process.env.OPENAI_API_KEY 
      });

      const requestParams = {
        model: model, // 'gpt-image-1-mini', 'dall-e-2', or 'dall-e-3'
        prompt: prompt,
        n: 1,
        size: size,
        quality: quality
      };
      
      // Add response_format only for dall-e models
      if (model === 'dall-e-2' || model === 'dall-e-3') {
        requestParams.response_format = 'url';
      }
      
      const response = await openai.images.generate(requestParams);

      res.json({
        success: true,
        imageUrl: response.data[0].url,
        revisedPrompt: response.data[0].revised_prompt
      });

    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  });
}

// Run the simple example
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('Simple DALL-E Image Generation Example\n');
  
  simpleImageGeneration()
    .then(() => {
      console.log('\n═══════════════════════════════════════════════════════════');
      console.log('\n✨ Examples of how to use this in your code:\n');
      console.log('// Basic generation');
      console.log('const image = await generateWithOptions("your prompt");');
      console.log('');
      console.log('// With custom options');
      console.log('const image = await generateWithOptions("your prompt", {');
      console.log('  size: "1792x1024",');
      console.log('  quality: "hd"');
      console.log('});');
      console.log('');
      console.log('// As base64');
      console.log('const b64 = await generateAsBase64();');
      console.log('');
      console.log('// In Express API');
      console.log('createImageEndpoint(app);');
      console.log('\n═══════════════════════════════════════════════════════════\n');
    })
    .catch(error => {
      console.error('Failed:', error);
      process.exit(1);
    });
}

// Export functions for use in other modules
export { 
  simpleImageGeneration,
  generateWithOptions,
  generateAsBase64,
  createImageEndpoint
};

