#!/usr/bin/env node

/**
 * Article-Specific Image Generator for Crowley Capital
 * 
 * Generates branded images that resonate with specific article content
 * while maintaining Crowley Capital brand identity.
 * 
 * Usage:
 *   node scripts/generate-article-image.js "article summary or key themes"
 *   node scripts/generate-article-image.js "AI, data analytics, growth" --quality=hd
 */

import { execSync } from 'child_process';

const args = process.argv.slice(2);
const articleThemes = args.find(arg => !arg.startsWith('--'));
const quality = args.find(arg => arg.startsWith('--quality'))?.split('=')[1] || 'hd';
const model = args.find(arg => arg.startsWith('--model'))?.split('=')[1] || 'dall-e-3';
const size = args.find(arg => arg.startsWith('--size'))?.split('=')[1] || '1792x1024';

if (!articleThemes) {
  console.error('\n❌ Error: Please provide article themes or summary\n');
  console.log('Usage:');
  console.log('  node scripts/generate-article-image.js "your article themes or summary"\n');
  console.log('Examples:');
  console.log('  node scripts/generate-article-image.js "AI automation, productivity, efficiency"');
  console.log('  node scripts/generate-article-image.js "startup funding, venture capital, growth"');
  console.log('  node scripts/generate-article-image.js "data analytics, insights, decision making" --quality=hd\n');
  process.exit(1);
}

// Brand colors and style constants
const BRAND_COLORS = '#0F172A navy, #22D3EE cyan accent, #0B1220 dark neutral, #E6EEF3 light neutral';
const BASE_STYLE = 'Modern, minimal, high contrast, soft volumetric light, subtle depth-of-field, slight film grain. Clean negative space around edges; keep all critical detail within central 60% for 1:1 crop.';
const NEGATIVE_PROMPT = 'No typography, no numbers, no logos, no text, no letters, no words, no watermark, no signatures, no UI screenshots, no charts with labels, no people.';
const FORMAT = 'Photoreal-abstract hybrid, studio lighting, 16:9.';

// Construct the article-specific prompt
const articlePrompt = `Abstract visualization for a venture capital brand article about: ${articleThemes}. Central composition with interconnected elements and geometric forms that visually represent these themes. Use restrained palette: ${BRAND_COLORS}. ${BASE_STYLE} ${NEGATIVE_PROMPT} ${FORMAT}`;

console.log('\n🎨 Crowley Capital Article Image Generator\n');
console.log('═══════════════════════════════════════════════════════════\n');
console.log('Article Themes:', articleThemes);
console.log(`Model: ${model}`);
console.log(`Size: ${size} (16:9)`);
console.log(`Quality: ${quality}`);
console.log('\nGenerating branded image aligned with article content...');
console.log('\n═══════════════════════════════════════════════════════════\n');

// Run the test-image-generation script
try {
  const command = `node scripts/test-image-generation.js "${articlePrompt}" --model=${model} --quality=${quality} --size=${size}`;
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Error generating image:', error.message);
  process.exit(1);
}

