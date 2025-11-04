/**
 * Image Generation and Optimization Utilities
 * 
 * Handles:
 * - Generating article-specific images using OpenAI DALL-E
 * - Optimizing images for web (compression, resizing)
 * - Saving images to public directory
 * - Generating alt text for accessibility
 */

import OpenAI from 'openai';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import { uploadToCloud, isCloudStorageEnabled } from './cloudStorage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Brand colors for consistent styling
const BRAND_COLORS = {
  primary: '#0F172A',      // Deep navy/slate
  accent: '#22D3EE',       // Cyan accent
  dark: '#0B1220',         // Very dark blue-black
  light: '#E6EEF3',        // Light neutral
  secondary: '#1E293B',    // Mid slate
  description: 'navy #0F172A, cyan #22D3EE, charcoal #0B1220, silver-blue #E6EEF3'
};

const BASE_QUALITY = 'Professional studio lighting, cinematic depth-of-field, subtle film grain, high contrast. Central composition with clean negative space at edges—keep all key elements within central 60% for safe 1:1 crop. 16:9 format.';
const NO_TEXT = 'No typography, no text overlays, no labels, no watermarks, no logos, no UI elements, no screenshots.';

// Image output configuration
const IMAGE_CONFIG = {
  width: 1792,  // 16:9 aspect ratio
  height: 1008,  // Optimized for web (slightly smaller than 1024 for better compression)
  quality: 85,   // JPEG quality (good balance between quality and file size)
  maxFileSizeKB: 200  // Target max file size
};

/**
 * Image style templates - rotates between different visual approaches
 * Each style maintains brand colors but offers variety
 */
const IMAGE_STYLES = [
  {
    name: 'Abstract Geometric',
    prompt: (themes) => `Abstract geometric visualization for a venture capital article. Central hexagonal or modular composition representing: ${themes}. Interconnected geometric forms, nodes, and flowing data patterns. Color palette: ${BRAND_COLORS.description}. Modern, minimal, tech-forward aesthetic. ${NO_TEXT} ${BASE_QUALITY}`,
    weight: 25
  },
  {
    name: 'Professional Meeting',
    prompt: (themes) => `Cinematic wide-angle photo of a professional business meeting or strategy session. Modern corporate office with floor-to-ceiling windows. 3-4 diverse professionals collaborating around a sleek table with laptops and notebooks. Natural daylight mixed with cool LED accents. Color grading: deep blues (${BRAND_COLORS.primary}), cyan highlights (${BRAND_COLORS.accent}), silver-gray tones. Themes to evoke: ${themes}. Photoreal, sharp focus on central figures. ${NO_TEXT} ${BASE_QUALITY}`,
    weight: 20
  },
  {
    name: 'Product/Object Focus',
    prompt: (themes) => `Elegant product photography featuring objects symbolizing: ${themes}. Center-frame hero object on a minimal surface with gradient backdrop transitioning from ${BRAND_COLORS.primary} to ${BRAND_COLORS.dark}. Accent lighting in ${BRAND_COLORS.accent} cyan. Objects could include: modern workspace tools, charts/diagrams (as physical objects), tech devices, strategic planning items. Studio-lit, shallow depth-of-field. ${NO_TEXT} ${BASE_QUALITY}`,
    weight: 20
  },
  {
    name: 'Data Visualization Scene',
    prompt: (themes) => `Photorealistic data visualization environment. Floating holographic charts, graphs, and analytical dashboards in a sleek dark room. Data streams and metrics representing: ${themes}. Dominant colors: ${BRAND_COLORS.description}. Glowing cyan accents on key data points. Futuristic but professional, not sci-fi. ${NO_TEXT} ${BASE_QUALITY}`,
    weight: 15
  },
  {
    name: 'Modern Workspace',
    prompt: (themes) => `Cinematic overhead or 45-degree angle shot of a modern entrepreneur's workspace. Minimalist desk with MacBook, coffee, notebook, and strategic planning materials. Themes to represent: ${themes}. Dramatic natural light from the side. Color palette: ${BRAND_COLORS.description}—desaturated with cyan accent items (pen, notebook cover, screen glow). Clean, aspirational, professional. ${NO_TEXT} ${BASE_QUALITY}`,
    weight: 15
  },
  {
    name: 'Tech Architecture',
    prompt: (themes) => `Wide architectural photo of a modern tech office interior or innovation hub. Glass walls, steel beams, open collaborative spaces. People in soft focus or silhouette working in background. Themes: ${themes}. Color grading emphasizing ${BRAND_COLORS.description}. Cool blue hour lighting, cyan LED accents. Professional, aspirational, clean. ${NO_TEXT} ${BASE_QUALITY}`,
    weight: 5
  }
];

/**
 * Select image style based on article data (pseudo-random but consistent per article)
 */
function selectImageStyle(articleTitle) {
  // Create a simple hash from the title for consistent style per article
  let hash = 0;
  for (let i = 0; i < articleTitle.length; i++) {
    hash = ((hash << 5) - hash) + articleTitle.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use weighted random selection
  const totalWeight = IMAGE_STYLES.reduce((sum, style) => sum + style.weight, 0);
  let random = Math.abs(hash % totalWeight);
  
  for (const style of IMAGE_STYLES) {
    random -= style.weight;
    if (random <= 0) {
      return style;
    }
  }
  
  return IMAGE_STYLES[0]; // Fallback
}

/**
 * Generate article-specific image prompt based on content
 */
function generateImagePrompt(title, description, quickAnswer = '') {
  // Extract key themes from the content (limit to 300 chars for better focus)
  const themes = `${title}. ${description}. ${quickAnswer}`.substring(0, 300);
  
  // Select style based on article title (consistent per article)
  const selectedStyle = selectImageStyle(title);
  
  console.log(`   🎨 Style selected: ${selectedStyle.name}`);
  
  // Generate prompt using selected style
  const prompt = selectedStyle.prompt(themes);
  
  return prompt;
}

/**
 * Generate image using DALL-E
 */
async function generateImage(prompt, apiKey) {
  console.log('🎨 Generating article image...');
  
  const openai = new OpenAI({ apiKey });
  
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1792x1024',  // 16:9 aspect ratio
      quality: 'standard', // Use standard for faster generation and lower cost
    });
    
    const imageUrl = response.data[0].url;
    const revisedPrompt = response.data[0].revised_prompt || prompt;
    
    console.log('✅ Image generated successfully');
    return { imageUrl, revisedPrompt };
  } catch (error) {
    console.error('❌ Error generating image:', error.message);
    throw new Error(`Image generation failed: ${error.message}`);
  }
}

/**
 * Download image from URL
 */
async function downloadImage(url) {
  console.log('📥 Downloading image...');
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log(`✅ Downloaded image (${(buffer.length / 1024).toFixed(2)} KB)`);
    return buffer;
  } catch (error) {
    console.error('❌ Error downloading image:', error.message);
    throw new Error(`Image download failed: ${error.message}`);
  }
}

/**
 * Optimize image for web
 * - Resize if needed
 * - Convert to JPEG
 * - Compress to target file size
 */
async function optimizeImage(buffer) {
  console.log('🔧 Optimizing image for web...');
  
  try {
    let optimized = sharp(buffer)
      .resize(IMAGE_CONFIG.width, IMAGE_CONFIG.height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: IMAGE_CONFIG.quality,
        progressive: true,
        mozjpeg: true
      });
    
    let outputBuffer = await optimized.toBuffer();
    let fileSizeKB = outputBuffer.length / 1024;
    
    // If file is still too large, reduce quality
    let quality = IMAGE_CONFIG.quality;
    while (fileSizeKB > IMAGE_CONFIG.maxFileSizeKB && quality > 60) {
      quality -= 5;
      optimized = sharp(buffer)
        .resize(IMAGE_CONFIG.width, IMAGE_CONFIG.height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({
          quality,
          progressive: true,
          mozjpeg: true
        });
      
      outputBuffer = await optimized.toBuffer();
      fileSizeKB = outputBuffer.length / 1024;
    }
    
    console.log(`✅ Image optimized: ${IMAGE_CONFIG.width}x${IMAGE_CONFIG.height}, ${fileSizeKB.toFixed(2)} KB, quality: ${quality}`);
    return outputBuffer;
  } catch (error) {
    console.error('❌ Error optimizing image:', error.message);
    throw new Error(`Image optimization failed: ${error.message}`);
  }
}

/**
 * Save image to cloud storage (R2) or local directory (fallback for development)
 */
async function saveImage(buffer, filename) {
  // Check if cloud storage is configured
  if (isCloudStorageEnabled()) {
    console.log('☁️  Using cloud storage (Cloudflare R2)...');
    
    try {
      // Save to temporary location first
      const tempDir = join(__dirname, '..', 'temp');
      if (!existsSync(tempDir)) {
        await mkdir(tempDir, { recursive: true });
      }
      
      const tempFilePath = join(tempDir, filename);
      await writeFile(tempFilePath, buffer);
      
      // Upload to cloud storage
      const storageKey = `articles/${filename}`;
      const publicUrl = await uploadToCloud(tempFilePath, storageKey, 'image/jpeg');
      
      // Clean up temporary file
      await unlink(tempFilePath);
      
      console.log(`✅ Image uploaded to cloud: ${publicUrl}`);
      return publicUrl;
    } catch (error) {
      console.error('❌ Error uploading to cloud storage:', error.message);
      console.log('   Falling back to local storage...');
      // Fall through to local storage
    }
  }
  
  // LOCAL STORAGE (Development or fallback)
  console.log('💾 Using local storage (ephemeral on Render)...');
  
  // Save to web app's public directory
  const publicDir = join(__dirname, '..', '..', '..', 'apps', 'web', 'public', 'images', 'articles');
  
  // Create directory if it doesn't exist
  if (!existsSync(publicDir)) {
    await mkdir(publicDir, { recursive: true });
    console.log(`📁 Created directory: ${publicDir}`);
  }
  
  const filePath = join(publicDir, filename);
  
  try {
    await writeFile(filePath, buffer);
    console.log(`✅ Image saved locally: ${filePath}`);
    
    // Return the public URL path (relative)
    return `/images/articles/${filename}`;
  } catch (error) {
    console.error('❌ Error saving image:', error.message);
    throw new Error(`Image save failed: ${error.message}`);
  }
}

/**
 * Generate alt text for image (for accessibility and SEO)
 */
function generateAltText(title, selectedStyleName) {
  // Create descriptive alt text based on title and style
  const styleDescriptions = {
    'Abstract Geometric': 'Abstract geometric visualization',
    'Professional Meeting': 'Professional business meeting scene',
    'Product/Object Focus': 'Professional product photography',
    'Data Visualization Scene': 'Data visualization and analytics scene',
    'Modern Workspace': 'Modern entrepreneur workspace scene',
    'Tech Architecture': 'Modern tech office architectural photo'
  };
  
  const styleDesc = styleDescriptions[selectedStyleName] || 'Professional business visualization';
  const altText = `${styleDesc} representing: ${title}`;
  return altText;
}

/**
 * Generate unique filename for image
 */
function generateFilename(slug) {
  const timestamp = Date.now();
  // Use article slug for SEO-friendly filename
  const cleanSlug = slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  return `${cleanSlug}-${timestamp}.jpg`;
}

/**
 * Main function: Generate, optimize, and save article image
 * 
 * @param {Object} articleData - Article data
 * @param {string} articleData.title - Article title
 * @param {string} articleData.description - Article description
 * @param {string} articleData.slug - Article URL slug
 * @param {string} articleData.quickAnswer - Quick answer or key themes
 * @param {string} apiKey - OpenAI API key
 * @returns {Promise<Object>} - { imageUrl, imageAlt }
 */
export async function generateArticleImage(articleData, apiKey) {
  console.log('\n🎨 ========== ARTICLE IMAGE GENERATION ==========');
  console.log(`📝 Article: ${articleData.title}`);
  
  try {
    // Step 1: Select image style (consistent per article)
    const selectedStyle = selectImageStyle(articleData.title);
    console.log(`   🎨 Style: ${selectedStyle.name}`);
    
    // Step 2: Generate prompt based on article content and style
    const themes = `${articleData.title}. ${articleData.description}. ${articleData.quickAnswer || ''}`.substring(0, 300);
    const prompt = selectedStyle.prompt(themes);
    
    // Step 3: Generate image using DALL-E
    const { imageUrl, revisedPrompt } = await generateImage(prompt, apiKey);
    
    // Step 4: Download image
    const imageBuffer = await downloadImage(imageUrl);
    
    // Step 5: Optimize image for web
    const optimizedBuffer = await optimizeImage(imageBuffer);
    
    // Step 6: Generate filename
    const filename = generateFilename(articleData.slug);
    
    // Step 7: Save image to public directory
    const publicUrl = await saveImage(optimizedBuffer, filename);
    
    // Step 8: Generate alt text
    const altText = generateAltText(articleData.title, selectedStyle.name);
    
    console.log('🎉 Image generation complete!');
    console.log(`   Style: ${selectedStyle.name}`);
    console.log(`   URL: ${publicUrl}`);
    console.log(`   Alt: ${altText}`);
    console.log('===============================================\n');
    
    return {
      imageUrl: publicUrl,
      imageAlt: altText
    };
  } catch (error) {
    console.error('❌ Article image generation failed:', error.message);
    // Return null so article generation can continue without image
    return {
      imageUrl: null,
      imageAlt: null
    };
  }
}

export default {
  generateArticleImage,
  generateImagePrompt,
  generateAltText
};

