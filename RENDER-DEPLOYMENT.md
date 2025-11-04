# Render Deployment Guide

This guide explains how to deploy Crowley Capital to Render with two different options.

## 🚀 Quick Summary

I've configured your project for **Option B: Single Web Service** (recommended for simplicity).

## 📋 Deployment Options

### Option A: Separate Services (Static Site + Web Service)
- **Frontend**: Static site (free tier or $1/month)
- **Backend**: Web service (starter plan $7/month)
- **Total Cost**: ~$7-8/month
- **Pros**: Cheaper, frontend on CDN
- **Cons**: Requires CORS configuration, two services to manage

### Option B: Single Web Service ✅ (Current Configuration)
- **Combined**: Everything on one web service (starter plan $7/month)
- **Total Cost**: $7/month
- **Pros**: Simpler setup, no CORS issues, one service to manage
- **Cons**: Slightly more expensive than Option A if using free static tier

---

## 🎯 Option B: Single Web Service (Recommended)

Your `render.yaml` is already configured for this option!

### Build & Start Commands

**Build Command** (automatically runs on deploy):
```bash
# Install all dependencies
npm install
cd apps/web && npm install
cd ../api && npm install
# Build frontend
cd ../web && npm run build
# Create images directory in backend
cd ../api && mkdir -p public/images/articles
```

**Start Command**:
```bash
cd apps/api && npm start
```

### Environment Variables to Set in Render Dashboard

Go to your Render dashboard → Web Service → Environment:

| Key | Value | Notes |
|-----|-------|-------|
| `DATABASE_URL` | (auto-populated from database) | Render connects this automatically |
| `OPENAI_API_KEY` | `your-openai-api-key` | Get from OpenAI dashboard |
| `PORT` | `10000` | Render's default port |
| `NODE_ENV` | `production` | Enables production optimizations |
| `API_URL` | `/api` | Relative URL since frontend/backend are together |
| `ADMIN_PASSWORD` | `your-secure-password` | Admin panel password |
| `FRONTEND_URL` | `https://your-domain.onrender.com` | Your Render URL |

**Optional AI Model Configuration:**
| Key | Value | Default |
|-----|-------|---------|
| `CONTENT_MODEL` | `gpt-4o` | Main content generation model |
| `CONTENT_MODEL_FALLBACK` | `gpt-4o-mini` | Fallback if main fails |
| `FORMATTER_MODEL` | `gpt-4o-mini` | Formatting model |
| `FORMATTER_MODEL_FALLBACK` | `gpt-4o-mini` | Fallback formatter |

### Deployment Steps

1. **Create PostgreSQL Database** (if not already created):
   - Go to Render Dashboard → New → PostgreSQL
   - Name: `crowley-postgres`
   - Plan: Starter ($7/month)
   - Click "Create Database"

2. **Create Web Service**:
   - Go to Render Dashboard → New → Web Service
   - Connect your GitHub repository
   - Name: `crowley-capital`
   - Environment: `Node`
   - Plan: `Starter` ($7/month)
   - Build Command: (use the one from render.yaml - Render will auto-detect)
   - Start Command: `cd apps/api && npm start`

3. **Connect Database**:
   - In Web Service → Environment
   - Add `DATABASE_URL` from the database you created
   - Render will auto-populate this if you link the database

4. **Add Environment Variables**:
   - Copy the variables from the table above
   - Add each one in the Environment tab

5. **Set Health Check Path**:
   - Go to Settings → Health Check Path
   - Set to: `/health`

6. **Deploy**:
   - Click "Manual Deploy" → "Deploy latest commit"
   - Or push to `main` branch for auto-deploy

### Database Migration

After deployment, run the database migration:

1. Go to your Render Web Service → Shell (in the dashboard)
2. Run:
```bash
cd apps/api
psql $DATABASE_URL -f migrations/add-image-fields.sql
```

Or connect to your database directly:
```bash
psql <YOUR_DATABASE_URL> -f apps/api/migrations/add-image-fields.sql
```

---

## 🔧 Option A: Separate Services

If you prefer separate services, revert to the original `render.yaml`:

### Frontend (Static Site)

**Build Command**:
```bash
cd apps/web && npm install && npm run build
```

**Publish Directory**:
```
apps/web/dist
```

**Environment Variables**:
```
API_URL=https://crowley-capital-api.onrender.com/api
ADMIN_PASSWORD=your-secure-password
```

### Backend (Web Service)

**Build Command**:
```bash
cd apps/api && npm install
```

**Start Command**:
```bash
cd apps/api && npm start
```

**Environment Variables**:
```
DATABASE_URL=(auto from database)
OPENAI_API_KEY=your-openai-api-key
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://crowley-capital-web.onrender.com
```

**Note**: Remove the static file serving code from `server.js` (lines 680-705) for this option.

---

## 🧪 Testing Your Deployment

After deployment, test these endpoints:

1. **Health Check**: `https://your-app.onrender.com/health`
   - Should return: `{"status":"ok","message":"Backend API is running"}`

2. **Frontend**: `https://your-app.onrender.com/`
   - Should load the homepage

3. **API**: `https://your-app.onrender.com/api/articles`
   - Should return articles list

4. **Admin Panel**: `https://your-app.onrender.com/admin`
   - Should load the admin interface

---

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in package.json
- Verify Node version matches (18.0.0+)

### App Crashes on Start
- Check `PORT` environment variable is set
- Verify `DATABASE_URL` is connected
- Check application logs for errors

### Frontend Not Loading
- Verify frontend was built successfully
- Check that `apps/web/dist` directory exists in build logs
- Ensure static file serving is enabled in server.js

### API Calls Failing
- Check `API_URL` environment variable
- Verify CORS settings if using separate services
- Check network tab in browser DevTools

### Images Not Uploading
- Verify `public/images/articles` directory exists
- Check write permissions
- Ensure OPENAI_API_KEY is set

### Database Connection Errors
- Verify `DATABASE_URL` is set correctly
- Check database is running in Render dashboard
- Run database migrations

---

## 📊 Monitoring

### Render Dashboard
- **Metrics**: CPU, Memory, Response time
- **Logs**: Real-time application logs
- **Events**: Deployment history

### Application Logs
Check these log messages on startup:
```
✅ PostgreSQL connected successfully
🚀 Backend API server running on http://localhost:10000
📊 Health check: http://localhost:10000/api/health
```

---

## 🔄 Updating Your Deployment

### Automatic Deploys
- Push to `main` branch
- Render auto-deploys (if enabled)

### Manual Deploy
1. Go to Render Dashboard
2. Click "Manual Deploy"
3. Select "Deploy latest commit"

### Rolling Back
1. Go to Events tab
2. Click "Rollback" on a previous successful deploy

---

## 💰 Cost Breakdown

### Option A (Separate Services)
- PostgreSQL: $7/month (Starter)
- Backend Web Service: $7/month (Starter)
- Frontend Static Site: Free or $1/month
- **Total**: $14-15/month

### Option B (Single Web Service) ✅
- PostgreSQL: $7/month (Starter)
- Web Service: $7/month (Starter)
- **Total**: $14/month

---

## 🔐 Security Checklist

- ✅ `.env` file is in `.gitignore`
- ✅ Secrets stored in Render environment variables
- ✅ HTTPS enabled (default on Render)
- ✅ Database SSL enabled
- ✅ Admin password set
- ✅ API rate limiting (consider adding)

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Render Blueprint Spec](https://render.com/docs/blueprint-spec)
- [Node.js on Render](https://render.com/docs/deploy-node-express-app)
- [Static Sites on Render](https://render.com/docs/static-sites)

---

## 🆘 Need Help?

1. Check Render's build and runtime logs
2. Verify all environment variables are set
3. Test endpoints individually
4. Check the troubleshooting section above
5. Review recent commits for breaking changes

