# DALL-E Image Generation Test Script

A test script for generating images using OpenAI's DALL-E API.

## Prerequisites

- Node.js installed
- OpenAI API key set in `.env` file as `OPENAI_API_KEY`

## Usage

### Basic usage (default prompt)
```bash
node scripts/test-image-generation.js
```

### Custom prompt
```bash
node scripts/test-image-generation.js "a futuristic city at sunset"
```

### With options
```bash
# Using GPT-image-1-mini (default, cost-efficient)
node scripts/test-image-generation.js "abstract art" --size=1024x1024 --quality=standard

# High quality with GPT-image-1-mini
node scripts/test-image-generation.js "mountain landscape" --size=1024x1024 --quality=hd

# Use DALL-E 3 for highest quality
node scripts/test-image-generation.js "professional portrait" --model=dall-e-3 --quality=hd

# Use DALL-E 2 for multiple images (legacy)
node scripts/test-image-generation.js "logo design" --model=dall-e-2 --n=2
```

## Available Options

### `--model`
- `gpt-image-1-mini` - Cost-efficient, good quality, single image only (default) ⭐
- `dall-e-3` - Highest quality, more expensive, single image only
- `dall-e-2` - Legacy model, faster, cheaper, supports multiple images

### `--size`
- `256x256` - Small (dall-e-2 only)
- `512x512` - Medium (dall-e-2 only)
- `1024x1024` - Large (default, all models)
- `1792x1024` - Wide (dall-e-3 only)
- `1024x1792` - Tall (dall-e-3 only)

### `--quality`
- `standard` - Standard quality (default)
- `hd` - High definition (gpt-image-1-mini and dall-e-3, more expensive)

### `--n`
- Number of images to generate (dall-e-2 only, default: 1)
- gpt-image-1-mini and DALL-E 3 only support generating 1 image at a time

## Output

Generated images are saved to the `generated-images/` directory in the project root.

Filename format: `dalle-YYYY-MM-DDTHH-MM-SS-mmm-0.png`

## Examples

```bash
# Quick test with default settings (gpt-image-1-mini)
node scripts/test-image-generation.js

# Generate a logo with gpt-image-1-mini
node scripts/test-image-generation.js "minimalist logo for tech startup"

# High quality image with gpt-image-1-mini
node scripts/test-image-generation.js "professional portrait photo" --quality=hd --size=1024x1024

# Use DALL-E 3 for maximum quality
node scripts/test-image-generation.js "beautiful landscape" --model=dall-e-3 --quality=hd

# Generate multiple variations (DALL-E 2 legacy)
node scripts/test-image-generation.js "abstract pattern" --model=dall-e-2 --n=3
```

## Pricing (estimated)

### GPT-image-1-mini (Recommended) ⭐
- Cost-efficient model designed for budget-conscious applications
- Exact pricing TBD by OpenAI
- Expected to be significantly cheaper than DALL-E 3
- Good quality for most use cases

### DALL-E 3
- Standard 1024×1024: $0.040 per image
- Standard 1024×1792, 1792×1024: $0.080 per image
- HD 1024×1024: $0.080 per image
- HD 1024×1792, 1792×1024: $0.120 per image

### DALL-E 2 (Legacy)
- 1024×1024: $0.020 per image
- 512×512: $0.018 per image
- 256×256: $0.016 per image

## API Reference

Official docs: https://platform.openai.com/docs/api-reference/images/create

## Troubleshooting

### "OPENAI_API_KEY is not set"
Add your OpenAI API key to the `.env` file in the project root:
```
OPENAI_API_KEY=sk-...
```

### "Invalid size" error
Make sure the size you're requesting is supported by your selected model.

### Rate limits
If you hit rate limits, wait a moment and try again, or use DALL-E 2 which has higher rate limits.

