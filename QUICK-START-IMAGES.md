# Quick Start - Image Integration

## 🚀 3-Step Setup

### 1. Install Dependencies
```bash
cd apps/api
npm install
```

### 2. Run Database Migration
```bash
psql $DATABASE_URL -f apps/api/migrations/add-image-fields.sql
```

### 3. Create Images Directory
```bash
mkdir -p apps/web/public/images/articles
```

### 4. Restart Everything
```bash
# Terminal 1 - Backend
cd apps/api && npm run dev

# Terminal 2 - Frontend  
cd apps/web && npm run dev
```

---

## ✅ Test It

1. Go to `/admin`
2. Generate a new article
3. Wait ~60-90 seconds
4. Check `/articles` - image appears!

---

## 📸 What You Get

✅ **Auto-generated images** for every article  
✅ **Brand-aligned** (Navy, Cyan, your colors)  
✅ **Optimized** (<200KB, fast loading)  
✅ **16:9 aspect ratio** (perfect for web)  
✅ **SEO-friendly** (alt text included)  
✅ **Article-specific** (resonates with content)

---

## 🎨 Example Flow

```
Article: "Startup Growth Strategies for 2025"
    ↓
Image shows: Abstract visualization of growth, 
             data streams, upward momentum
             in brand colors (Navy + Cyan)
    ↓
Saved to: /images/articles/startup-growth-strategies-1234567.jpg
    ↓
Displayed: Articles page + Detail page
```

---

## 💡 Pro Tips

- Images generate automatically during article creation
- If image fails, article still publishes (non-blocking)
- Check console for: `📸 With hero image: /images/articles/...`
- Images stored in `apps/web/public/images/articles/`

---

## 🔍 Verify

```bash
# Check images directory
ls apps/web/public/images/articles/

# Check database
psql $DATABASE_URL -c "SELECT title, image_url FROM articles WHERE image_url IS NOT NULL LIMIT 5;"

# Test on site
open http://localhost:8080/articles
```

---

**That's it!** Your articles now have beautiful, branded hero images automatically. 🎉

For detailed documentation, see: `SETUP-IMAGE-INTEGRATION.md`

