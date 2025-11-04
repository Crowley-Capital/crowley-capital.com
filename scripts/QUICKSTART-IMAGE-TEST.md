# Quick Start: Test Image Generation

## 1. Make sure you have your OpenAI API key in `.env`

```bash
# Check if .env exists and has OPENAI_API_KEY
cat .env | grep OPENAI_API_KEY
```

If not, add it:
```bash
echo "OPENAI_API_KEY=sk-your-key-here" >> .env
```

## 2. Run the basic test

```bash
node scripts/test-image-generation.js
```

This will:
- Generate an image using GPT-image-1-mini (cost-efficient model)
- Save it to `generated-images/` folder
- Show you the URL and revised prompt

## 3. Try a custom prompt

```bash
node scripts/test-image-generation.js "a minimalist logo for a tech startup"
```

## 4. Try different settings

```bash
# High quality with gpt-image-1-mini
node scripts/test-image-generation.js "mountain landscape" --quality=hd --size=1024x1024

# Use DALL-E 3 for highest quality (more expensive)
node scripts/test-image-generation.js "professional photo" --model=dall-e-3 --quality=hd

# Use DALL-E 2 for multiple images (legacy)
node scripts/test-image-generation.js "abstract pattern" --model=dall-e-2 --n=2
```

## 5. View the simple example

```bash
node scripts/image-generation-example.js
```

This shows you basic usage that you can copy into your own code.

## 6. Check the output

Generated images will be in:
```
generated-images/dalle-YYYY-MM-DDTHH-MM-SS-0.png
```

## Common Issues

### "OPENAI_API_KEY is not set"
➡️ Add your key to `.env` file

### "Insufficient quota" error
➡️ Check your OpenAI billing at https://platform.openai.com/account/billing

### "Invalid size" error
➡️ Make sure you're using a valid size for your chosen model
- gpt-image-1-mini: 1024x1024 (recommended)
- DALL-E 3: 1024x1024, 1792x1024, 1024x1792
- DALL-E 2: 256x256, 512x512, 1024x1024

## Cost Estimates

- gpt-image-1-mini: Cost-efficient (exact pricing TBD) ⭐ Recommended
- DALL-E 3 standard 1024×1024: $0.04 per image
- DALL-E 3 HD 1024×1024: $0.08 per image
- DALL-E 2 1024×1024: $0.02 per image

## Next Steps

Once you've tested the scripts, you can:
1. Integrate image generation into your API (see `image-generation-example.js`)
2. Add an endpoint to your Express app
3. Use it in your admin panel for generating article images

Happy generating! 🎨

