# Crowley Capital Image Generation Guide

Complete guide for generating branded images for your website and articles.

---

## 🎨 Three Ways to Generate Images

### 1. **Brand Templates** (Pre-designed themes)

Use pre-configured brand templates for common visual needs:

```bash
node scripts/generate-brand-image.js [theme]
```

**Available Themes:**
- `hero` - Main hero template (clarity → traction)
- `network` - Interconnected nodes/connections
- `growth` - Ascending forms (momentum/growth)  
- `data` - Data visualization/streams
- `portal` - Architectural gateway
- `crystal` - Crystalline structures
- `flow` - Energy/light waves
- `minimal` - Ultra-minimal geometric
- `depth` - Layered transparent planes

**Examples:**
```bash
# Generate network theme (HD by default)
node scripts/generate-brand-image.js network

# Standard quality (faster, cheaper)
node scripts/generate-brand-image.js growth --quality=standard
```

---

### 2. **Article-Specific Images** (Content-aligned)

Generate images that resonate with specific article content:

```bash
node scripts/generate-article-image.js "your article themes or summary"
```

**Examples:**
```bash
# From article's Quick Answer
node scripts/generate-article-image.js "data-driven insights, AI personalization, community connections, sustainable scaling"

# From article topic
node scripts/generate-article-image.js "startup fundraising strategies for 2025"

# With specific concepts
node scripts/generate-article-image.js "blockchain technology, decentralization, web3"
```

---

### 3. **Custom Prompt** (Full control)

Create completely custom images with your own prompt:

```bash
node scripts/test-image-generation.js "your custom prompt" --model=dall-e-3 --quality=hd --size=1792x1024
```

**Pro Tip:** Use the brand color palette for consistency:
- Primary: `#0F172A` (navy)
- Accent: `#22D3EE` (cyan)
- Dark Neutral: `#0B1220`
- Light Neutral: `#E6EEF3`

---

## 📐 Brand Specifications

All methods maintain these brand standards:

### Required Specs
- ✅ **Aspect Ratio**: 16:9 (1792x1024)
- ✅ **Central Detail**: 60% (allows 1:1 crop)
- ✅ **Colors**: Navy, Cyan, Dark & Light Neutrals
- ✅ **Style**: Photoreal-abstract hybrid
- ✅ **Quality**: HD (standard also available)
- ✅ **Text-Free**: No typography, logos, or labels

### Visual Style
- Modern, minimal design
- High contrast
- Soft volumetric lighting
- Subtle depth-of-field
- Slight film grain
- Clean negative space

---

## 💰 Pricing (DALL-E 3)

- **Standard 1792×1024**: $0.080 per image
- **HD 1792×1024**: $0.120 per image

**Tip:** Use `--quality=standard` for testing/drafts, `--quality=hd` for production.

---

## 📁 Output Location

All generated images are saved to:
```
/generated-images/dalle-YYYY-MM-DDTHH-MM-SS-mmm-0.png
```

---

## 🚀 Quick Start Workflows

### For Homepage Hero
```bash
node scripts/generate-brand-image.js hero
```

### For Blog Article
```bash
# Copy article's Quick Answer or key themes
node scripts/generate-article-image.js "AI automation, productivity gains, efficiency"
```

### For Generic VC Content
```bash
node scripts/generate-brand-image.js growth
# or
node scripts/generate-brand-image.js network
```

---

## 🎯 Use Cases

| Use Case | Command | Theme |
|----------|---------|-------|
| Homepage hero | `generate-brand-image.js hero` | Generic clarity → traction |
| Growth/scaling article | `generate-article-image.js "growth, scaling..."` | Article-specific |
| Network/ecosystem | `generate-brand-image.js network` | Connections |
| Data/analytics article | `generate-article-image.js "data analytics..."` | Article-specific |
| Innovation article | `generate-brand-image.js crystal` | Structure/clarity |

---

## 🔧 Advanced Options

### Change Quality
```bash
--quality=standard  # Faster, cheaper
--quality=hd        # Higher quality (default)
```

### Change Model
```bash
--model=dall-e-3          # Best quality (default)
--model=gpt-image-1-mini  # Cost-efficient (requires verification)
--model=dall-e-2          # Legacy
```

### Change Size
```bash
--size=1792x1024   # 16:9 wide (default)
--size=1024x1792   # 16:9 tall
--size=1024x1024   # Square
```

---

## 📝 Tips for Best Results

1. **Article Images**: Extract 3-5 key concepts from your article
2. **Be Specific**: "AI automation, efficiency" beats "technology"
3. **Use Themes**: Keywords like "growth", "connection", "data" work well
4. **HD for Production**: Use `--quality=hd` for published content
5. **Standard for Testing**: Use `--quality=standard` while iterating

---

## 🛠️ Troubleshooting

### "Organization not verified" error
Your OpenAI org needs verification for `gpt-image-1-mini`. Use `dall-e-3` instead:
```bash
--model=dall-e-3
```

### Images too generic
Use `generate-article-image.js` with specific article themes instead of templates.

### Need different aspect ratio
Add `--size=1024x1792` for tall images or `--size=1024x1024` for square.

---

## 📚 See Also

- `README-IMAGE-TEST.md` - Complete test script documentation
- `QUICKSTART-IMAGE-TEST.md` - Quick start guide
- `brand-image-prompts.js` - View all brand template prompts

---

**Built for Crowley Capital** | All images maintain brand consistency

