# Environment Variables - Migration Summary

## ✅ MIGRATION COMPLETE

All environment variables have been standardized to clean, simple names.

## What You Need to Do NOW

### 1. Update Your `.env` File

Replace these OLD variable names with NEW ones:

```bash
# OLD (Remove)              # NEW (Use This)
VITE_API_URL          →     API_URL
VITE_ADMIN_PASSWORD   →     ADMIN_PASSWORD

# REMOVE (Insecure!)
VITE_OPENAI_API_KEY   →     ❌ DELETE (backend only)
VITE_DATABASE_URL     →     ❌ DELETE (backend only)
```

### 2. Your Complete `.env` File Should Look Like:

```bash
# ==================== DATABASE ====================
DATABASE_URL=postgresql://user:password@host:port/database

# ==================== OPENAI API ====================
OPENAI_API_KEY=your-openai-api-key

# ==================== AI MODEL CONFIGURATION ====================
CONTENT_MODEL=gpt-4o
CONTENT_MODEL_FALLBACK=gpt-4o-mini
FORMATTER_MODEL=gpt-4o-mini
FORMATTER_MODEL_FALLBACK=gpt-4o-mini

# ==================== BACKEND ====================
PORT=3001
FRONTEND_URL=https://your-domain.com

# ==================== FRONTEND ====================
API_URL=http://localhost:3001/api
ADMIN_PASSWORD=your-admin-password
```

### 3. Restart Dev Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

## Changes Made

### Files Updated (8 files)
1. ✅ `apps/web/vite.config.ts` - Added security prefix filtering
2. ✅ `apps/web/src/context/AdminAuthContext.tsx` - Updated variable name
3. ✅ `apps/web/src/lib/db.ts` - Updated variable name
4. ✅ `apps/web/src/pages/Admin.tsx` - Updated variable names, removed insecure checks
5. ✅ `apps/web/src/pages/Articles.tsx` - Updated variable name
6. ✅ `apps/web/src/pages/ArticleDetail.tsx` - Updated variable name
7. ✅ `apps/web/src/services/aiService.ts` - Added deprecation warning
8. ✅ `env-example.txt` - Updated template

## Security Improvements

### Before ❌
- OpenAI API key exposed in browser
- Database credentials in frontend
- Anyone could steal your API key from DevTools

### After ✅
- OpenAI API key ONLY in backend
- Database ONLY in backend
- API keys never exposed to browser
- Frontend only calls your backend API

## All Environment Variables (Complete List)

### Backend Only (8 variables)
1. `DATABASE_URL` - PostgreSQL connection
2. `OPENAI_API_KEY` - OpenAI authentication  
3. `CONTENT_MODEL` - Primary AI model
4. `CONTENT_MODEL_FALLBACK` - Fallback AI model
5. `FORMATTER_MODEL` - Formatting AI model
6. `FORMATTER_MODEL_FALLBACK` - Fallback formatter
7. `PORT` - Server port
8. `FRONTEND_URL` - Frontend URL for CORS

### Frontend Only (2 variables)
9. `API_URL` - Backend API endpoint
10. `ADMIN_PASSWORD` - Admin panel password

**Total: 10 environment variables**

## Quick Test

After updating your `.env` and restarting:

1. Go to `/admin` - Can you access it? ✅
2. Try logging in - Does it work? ✅
3. Go to "All Articles" tab - Do articles load? ✅
4. Try generating an article - Does it work? ✅

If all ✅, you're good to go!

## Deployment Update

If you're using Render, Vercel, Netlify, etc., update your environment variables there too:

- Change `VITE_API_URL` → `API_URL`
- Change `VITE_ADMIN_PASSWORD` → `ADMIN_PASSWORD`
- Remove `VITE_OPENAI_API_KEY` (keep only `OPENAI_API_KEY`)

## Need Help?

See complete details in:
- `ENV_MIGRATION_COMPLETE.md` - Full migration guide
- `ENVIRONMENT_VARIABLES.md` - Complete variable reference
- `ENV_VARIABLES_AUDIT.md` - Technical details

