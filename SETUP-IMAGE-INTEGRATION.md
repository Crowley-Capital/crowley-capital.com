# Image Generation Integration - Setup Guide

## 🎯 What Was Integrated

Your article creation flow now automatically:
1. ✅ Generates article content
2. ✅ **Generates branded hero image** (NEW!)
3. ✅ Optimizes image for web (<200KB)
4. ✅ Formats article
5. ✅ Saves everything to database
6. ✅ Displays images on articles page and detail page

---

## 📋 Setup Steps

### 1. Install New Dependencies

```bash
cd apps/api
npm install
```

New packages added:
- `sharp` - Image processing and optimization
- `node-fetch` - Download images from OpenAI

### 2. Run Database Migration

Execute the SQL migration to add image fields:

```bash
# Option 1: Using psql
psql $DATABASE_URL -f apps/api/migrations/add-image-fields.sql

# Option 2: Using database GUI (like TablePlus, pgAdmin)
# Open apps/api/migrations/add-image-fields.sql and run it

# Option 3: Direct SQL
# Connect to your database and run:
ALTER TABLE articles ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);
ALTER TABLE articles ADD COLUMN IF NOT EXISTS image_alt TEXT;
CREATE INDEX IF NOT EXISTS idx_articles_image_url ON articles(image_url);
```

### 3. Create Images Directory

```bash
mkdir -p apps/web/public/images/articles
```

### 4. Restart Servers

```bash
# Restart backend
cd apps/api
npm run dev

# Restart frontend (in another terminal)
cd apps/web
npm run dev
```

---

## 🎨 How It Works

### Article Generation Flow

```
User clicks "Generate" in Admin Panel
    ↓
1. Generate Article Content (GPT-4o)
    ↓
2. Format Content (GPT-4o-mini)
    ↓
3. Generate Metadata (title, excerpt)
    ↓
4. 🎨 GENERATE HERO IMAGE (NEW!)
   - Extract key themes from article
   - Generate DALL-E prompt with brand colors
   - Generate image (1792x1024, 16:9)
   - Download image
   - Optimize for web (resize, compress)
   - Save to /public/images/articles/
    ↓
5. Save Article + Image URL to Database
    ↓
6. Display on Website with Hero Image
```

### Image Specifications

- **Aspect Ratio**: 16:9 (1792x1024)
- **Format**: JPEG (progressive, optimized)
- **File Size**: <200KB (automatically compressed)
- **Style**: Brand-aligned abstract (Navy, Cyan, Neutrals)
- **Location**: `apps/web/public/images/articles/`
- **URL Format**: `/images/articles/article-slug-timestamp.jpg`

---

## 🖼️ Image Display Locations

### 1. Articles List Page (`/articles`)
- **Featured Articles**: Large hero image (h-64)
- **Regular Articles**: Medium hero image (h-48)
- Both with hover zoom effect

### 2. Article Detail Page (`/articles/:slug`)
- **Full-width hero image** between header and content
- Responsive, maintains aspect ratio
- SEO-optimized with alt text

---

## 🧪 Testing

### Test Article Generation

1. Go to `/admin` (login with password)
2. Click "Generate Article"
3. Enter a topic
4. Click "Generate Article"
5. Wait 60-90 seconds (includes image generation)
6. Check console for:
   ```
   🎨 Step 4: Generating article hero image...
   ✅ Image optimized: 1792x1008, 150KB, quality: 85
   ✅ Image saved: /path/to/public/images/articles/...
   📸 With hero image: /images/articles/...
   ```

### Verify Images

1. Check `apps/web/public/images/articles/` directory
2. Images should be:
   - JPEG format
   - <200KB file size
   - 1792x1008 pixels
   - Brand-aligned abstract visuals

3. Check database:
   ```sql
   SELECT title, image_url, image_alt FROM articles WHERE image_url IS NOT NULL;
   ```

4. View on website:
   - Visit `/articles` - see images in grid
   - Click article - see full hero image

---

## 🎨 Brand Image Specifications

All generated images maintain brand consistency:

### Colors
- Primary: `#0F172A` (Navy)
- Accent: `#22D3EE` (Cyan)
- Dark Neutral: `#0B1220`
- Light Neutral: `#E6EEF3`

### Style
- Abstract, photoreal hybrid
- Modern, minimal design
- High contrast
- Soft volumetric lighting
- Subtle depth-of-field
- Slight film grain
- Clean negative space
- Central 60% detail (allows 1:1 crop)
- **No text, logos, or typography**

---

## 📁 New Files Created

```
apps/
├── api/
│   ├── package.json              # Updated with sharp, node-fetch
│   ├── migrations/
│   │   └── add-image-fields.sql  # Database migration
│   └── src/
│       ├── server.js             # Updated with image generation
│       └── imageUtils.js         # NEW - Image generation utility
└── web/
    ├── public/
    │   └── images/
    │       └── articles/         # NEW - Article images directory
    └── src/
        └── pages/
            ├── Articles.tsx      # Updated to display images
            └── ArticleDetail.tsx # Updated to display hero image
```

---

## 💰 Cost Considerations

### Per Article Generation

- **Content Generation**: ~$0.02-0.05 (GPT-4o)
- **Image Generation**: ~$0.04 (DALL-E 3 standard)
- **Total**: ~$0.06-0.09 per article

### Cost Optimization

Image generation uses:
- **Model**: `dall-e-3`
- **Quality**: `standard` (not HD)
- **Size**: `1792x1024` (16:9)

If image generation fails, article still publishes without image.

---

## 🔧 Troubleshooting

### Images Not Generating

1. **Check OpenAI API key**:
   ```bash
   echo $OPENAI_API_KEY
   ```

2. **Check console logs**:
   ```
   ❌ Error generating image: ...
   ```

3. **Verify directory exists**:
   ```bash
   ls -la apps/web/public/images/articles/
   ```

4. **Check sharp installation**:
   ```bash
   cd apps/api && npm list sharp
   ```

### Images Not Displaying

1. **Check database**:
   ```sql
   SELECT image_url FROM articles LIMIT 1;
   ```

2. **Verify file exists**:
   ```bash
   ls apps/web/public/images/articles/
   ```

3. **Check browser console** for 404 errors

4. **Verify path** in database matches file location

### Image Quality Issues

- Images are automatically optimized to <200KB
- Quality adjusted automatically (85 → 60 if needed)
- If images look compressed, increase `IMAGE_CONFIG.quality` in `imageUtils.js`

---

## 🎯 Next Steps

### Optional Enhancements

1. **Regenerate Image for Existing Articles**
   - Add "Regenerate Image" button in admin
   - Useful for older articles without images

2. **Custom Image Prompts**
   - Add field in admin to customize image prompt
   - Override automatic theme extraction

3. **Multiple Image Sizes**
   - Generate thumbnail, medium, large versions
   - Optimize for different display contexts

4. **Image CDN**
   - Upload to Cloudinary, AWS S3, or similar
   - Serve from CDN for better performance

5. **Image Variations**
   - Generate 2-3 variations
   - Let admin choose preferred image

---

## ✅ Verification Checklist

- [ ] Database migration run successfully
- [ ] New dependencies installed (`sharp`, `node-fetch`)
- [ ] Images directory created
- [ ] Backend server restarted
- [ ] Frontend server restarted
- [ ] Test article generated with image
- [ ] Image visible on `/articles` page
- [ ] Image visible on article detail page
- [ ] Image file exists in `public/images/articles/`
- [ ] Image file size <200KB
- [ ] Alt text populated for accessibility

---

## 📚 Related Documentation

- Image generation scripts: `scripts/IMAGE-GENERATION-GUIDE.md`
- Brand image prompts: `scripts/brand-image-prompts.js`
- Database schema: Check `articles` table for `image_url`, `image_alt` columns

---

**Integration Complete!** 🎉

Your articles now automatically generate beautiful, branded hero images that resonate with the content while maintaining Crowley Capital's visual identity.

