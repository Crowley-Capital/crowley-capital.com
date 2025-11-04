/**
 * Crowley Capital Brand Image Generation Prompts
 * 
 * Pre-configured prompts using brand colors and style guide
 * for generating consistent, on-brand hero images.
 */

// Brand Colors
export const BRAND_COLORS = {
  primary: '#0F172A',      // Navy/Ink
  accent: '#22D3EE',       // Cyan
  darkNeutral: '#0B1220',  // Near-black
  lightNeutral: '#E6EEF3', // Mist
  accentDark: '#0369A1'    // Darker cyan (for white text)
};

// Color descriptions for prompts
const COLOR_PALETTE = `#0F172A navy, #22D3EE cyan accent, #0B1220 dark neutral, #E6EEF3 light neutral`;

// Negative prompt (what to exclude)
const NEGATIVE_PROMPT = `No typography, no numbers, no logos, no text, no letters, no words, no watermark, no signatures, no UI screenshots, no charts with labels, no people.`;

// Base style elements
const BASE_STYLE = `Modern, minimal, high contrast, soft volumetric light, subtle depth-of-field, slight film grain. Clean negative space around the edges; keep all critical detail within the central 60% to allow a 1:1 crop. Photoreal-abstract hybrid, studio lighting, 16:9.`;

/**
 * Universal Hero Template
 * The main template for abstract hero images
 */
export const HERO_TEMPLATE = `A premium, text-free abstract hero image for a venture capital brand. Central composition with a single focal motif that conveys clarity to traction: a crisp luminous form emerging from layered geometric grids and converging in the center. Use a restrained palette based on ${COLOR_PALETTE}. ${BASE_STYLE} ${NEGATIVE_PROMPT}`;

/**
 * Variation 1: Network/Connection Theme
 */
export const NETWORK_THEME = `An abstract network visualization for venture capital branding. Interconnected nodes and glowing connections forming a central constellation pattern. Use palette: ${COLOR_PALETTE}. ${BASE_STYLE} ${NEGATIVE_PROMPT}`;

/**
 * Variation 2: Growth/Upward Theme
 */
export const GROWTH_THEME = `Abstract ascending geometric forms representing startup growth and momentum. Sharp angular shapes rising toward a bright focal point with cyan light beams. Use palette: ${COLOR_PALETTE}. ${BASE_STYLE} ${NEGATIVE_PROMPT}`;

/**
 * Variation 3: Data/Analytics Theme
 */
export const DATA_THEME = `Sleek abstract data visualization with flowing particles and grid overlays. Central vortex of luminous data streams converging into clarity. Use palette: ${COLOR_PALETTE}. ${BASE_STYLE} ${NEGATIVE_PROMPT}`;

/**
 * Variation 4: Portal/Gateway Theme
 */
export const PORTAL_THEME = `Abstract architectural portal or gateway made of intersecting geometric planes. Luminous cyan energy in the center representing opportunity and passage. Use palette: ${COLOR_PALETTE}. ${BASE_STYLE} ${NEGATIVE_PROMPT}`;

/**
 * Variation 5: Crystalline/Structure Theme
 */
export const CRYSTAL_THEME = `Crystalline abstract structure with faceted surfaces catching light. Central luminous core surrounded by geometric precision and layered depth. Use palette: ${COLOR_PALETTE}. ${BASE_STYLE} ${NEGATIVE_PROMPT}`;

/**
 * Variation 6: Wave/Flow Theme
 */
export const FLOW_THEME = `Elegant abstract flow of energy and light waves converging toward center. Smooth gradients transitioning between navy depths and cyan highlights. Use palette: ${COLOR_PALETTE}. ${BASE_STYLE} ${NEGATIVE_PROMPT}`;

/**
 * Variation 7: Minimal Geometric
 */
export const MINIMAL_GEOMETRIC = `Ultra-minimal geometric composition with a single bold shape against negative space. Sharp cyan accent line bisecting a navy void. Use palette: ${COLOR_PALETTE}. ${BASE_STYLE} ${NEGATIVE_PROMPT}`;

/**
 * Variation 8: Depth/Layers Theme
 */
export const DEPTH_THEME = `Layered transparent geometric planes creating depth and dimension. Each layer subtly lit with volumetric cyan glow revealing inner structure. Use palette: ${COLOR_PALETTE}. ${BASE_STYLE} ${NEGATIVE_PROMPT}`;

// Export all prompts as an object for easy access
export const PROMPTS = {
  hero: HERO_TEMPLATE,
  network: NETWORK_THEME,
  growth: GROWTH_THEME,
  data: DATA_THEME,
  portal: PORTAL_THEME,
  crystal: CRYSTAL_THEME,
  flow: FLOW_THEME,
  minimal: MINIMAL_GEOMETRIC,
  depth: DEPTH_THEME
};

// Helper function to get a prompt by name
export function getPrompt(name) {
  return PROMPTS[name] || PROMPTS.hero;
}

// Helper function to list all available prompts
export function listPrompts() {
  return Object.keys(PROMPTS);
}

// If run directly, display all prompts
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('\n🎨 Crowley Capital Brand Image Prompts\n');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log('Brand Colors:');
  Object.entries(BRAND_COLORS).forEach(([name, hex]) => {
    console.log(`  ${name}: ${hex}`);
  });
  
  console.log('\n═══════════════════════════════════════════════════════════\n');
  console.log('Available Prompt Templates:\n');
  
  Object.entries(PROMPTS).forEach(([name, prompt]) => {
    console.log(`${name.toUpperCase()}`);
    console.log(`  ${prompt.substring(0, 100)}...`);
    console.log('');
  });
  
  console.log('═══════════════════════════════════════════════════════════\n');
  console.log('Usage Examples:\n');
  console.log('// Import in your code:');
  console.log('import { PROMPTS, getPrompt } from "./brand-image-prompts.js";\n');
  console.log('// Get a specific prompt:');
  console.log('const prompt = getPrompt("network");\n');
  console.log('// Use with test script:');
  console.log('node scripts/test-image-generation.js "[paste prompt here]" --model=dall-e-3 --quality=hd\n');
  console.log('═══════════════════════════════════════════════════════════\n');
}

