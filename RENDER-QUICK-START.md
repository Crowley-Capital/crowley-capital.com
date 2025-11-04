# 🚀 Render Quick Start

## TL;DR - Deploy in 5 Minutes

Your project is configured for **Single Web Service** deployment (simplest option).

---

## 📝 Checklist

### 1. Create Database
- [ ] Go to Render → New → PostgreSQL
- [ ] Name: `crowley-postgres`
- [ ] Plan: Starter
- [ ] Click "Create Database"

### 2. Create Web Service
- [ ] Go to Render → New → Web Service
- [ ] Connect GitHub repo: `Crowley-Capital/crowley-capital.com`
- [ ] Name: `crowley-capital`
- [ ] Environment: `Node`
- [ ] Plan: `Starter`
- [ ] **Render will auto-detect your `render.yaml` configuration**

### 3. Set Environment Variables
Go to Web Service → Environment, add these:

```bash
# Database (auto-linked if you connect the database)
DATABASE_URL=<from database>

# Required
OPENAI_API_KEY=sk-...
ADMIN_PASSWORD=your-secure-password-here
PORT=10000
NODE_ENV=production

# Frontend API URL (relative since everything is on one service)
API_URL=/api

# Optional - Your domain
FRONTEND_URL=https://crowley-capital.onrender.com
```

### 4. Run Database Migration
After first deploy, open Shell in Render dashboard:

```bash
cd apps/api
psql $DATABASE_URL -f migrations/add-image-fields.sql
```

### 5. Deploy!
- [ ] Click "Manual Deploy" → "Deploy latest commit"
- [ ] Wait for build to complete (~3-5 minutes)
- [ ] Test: `https://your-app.onrender.com/health`

---

## ✅ What's Already Configured

Your `render.yaml` has:

**Build Command**:
```bash
npm install
cd apps/web && npm install
cd ../api && npm install
cd ../web && npm run build
cd ../api && mkdir -p public/images/articles
```

**Start Command**:
```bash
cd apps/api && npm start
```

**Health Check**: `/health`

---

## 🧪 Quick Test

After deployment:

1. **Health**: `https://your-app.onrender.com/health`
   - Should see: `{"status":"ok"}`

2. **Frontend**: `https://your-app.onrender.com/`
   - Homepage should load

3. **Admin**: `https://your-app.onrender.com/admin`
   - Enter your `ADMIN_PASSWORD`

4. **Generate Article**: 
   - Go to Admin → Generate Article
   - Fill in details and click "Generate Article Now"
   - Wait ~2-3 minutes for AI generation

---

## 💰 Cost

- PostgreSQL: $7/month
- Web Service: $7/month
- **Total: $14/month**

---

## 🐛 Common Issues

**Build fails?**
```bash
# Check logs in Render dashboard
# Verify package.json has all dependencies
```

**App won't start?**
```bash
# Verify PORT=10000 is set
# Check DATABASE_URL is connected
```

**Frontend 404?**
```bash
# Check build logs - should see "cd ../web && npm run build"
# Verify apps/web/dist was created
```

**API calls fail?**
```bash
# Verify API_URL=/api (not http://localhost:3001/api)
# Check browser console for errors
```

---

## 📚 Full Documentation

See `RENDER-DEPLOYMENT.md` for detailed guide.

---

## 🎉 You're Done!

Once deployed, your app will be live at:
`https://crowley-capital.onrender.com`

Auto-deploys on every push to `main` branch! 🚀

