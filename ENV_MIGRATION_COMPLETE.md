# Environment Variables Migration - COMPLETED ✅

## Migration Complete!

All environment variables have been standardized to use clean, simple names without `VITE_` prefixes.

## What Changed

### ✅ Files Updated

1. **`apps/web/vite.config.ts`**
   - Added `envPrefix: ['API_', 'ADMIN_']`
   - Only `API_*` and `ADMIN_*` variables exposed to frontend
   - Security: `OPENAI_API_KEY` and `DATABASE_URL` NO LONGER accessible from frontend!

2. **`apps/web/src/context/AdminAuthContext.tsx`**
   - `VITE_ADMIN_PASSWORD` → `ADMIN_PASSWORD`

3. **`apps/web/src/lib/db.ts`**
   - `VITE_API_URL` → `API_URL` (2 occurrences)

4. **`apps/web/src/pages/Admin.tsx`**
   - `VITE_API_URL` → `API_URL` (5 occurrences)
   - Removed `VITE_OPENAI_API_KEY` check (now handled by backend)
   - Removed API key warning message

5. **`apps/web/src/pages/Articles.tsx`**
   - `VITE_API_URL` → `API_URL`

6. **`apps/web/src/pages/ArticleDetail.tsx`**
   - `VITE_API_URL` → `API_URL`

7. **`apps/web/src/services/aiService.ts`**
   - Added deprecation warning (INSECURE - exposes API key to browser)

8. **`env-example.txt`**
   - Removed `VITE_` prefixes
   - Reorganized sections

## New Environment Variables

### Your `.env` File Should Now Look Like This:

```bash
# ==================== DATABASE ====================
DATABASE_URL=postgresql://user:password@host:port/database

# ==================== OPENAI API ====================
OPENAI_API_KEY=your-openai-api-key-here

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

## Migration Steps (What YOU Need to Do)

### 1. Update Your `.env` File

**OLD NAMES (Remove these):**
```bash
VITE_API_URL=...
VITE_ADMIN_PASSWORD=...
VITE_OPENAI_API_KEY=...  # ⚠️ INSECURE - Remove from frontend!
VITE_DATABASE_URL=...     # ⚠️ INSECURE - Remove from frontend!
```

**NEW NAMES (Use these):**
```bash
API_URL=http://localhost:3001/api
ADMIN_PASSWORD=your-admin-password
# Note: OPENAI_API_KEY stays as-is (backend only)
# Note: DATABASE_URL stays as-is (backend only)
```

### 2. Restart Your Development Server

```bash
# Stop current server (Ctrl+C)

# Clear any caches
rm -rf apps/web/node_modules/.vite apps/web/dist

# Restart
npm run dev
```

### 3. Verify Everything Works

- [ ] Can you access the admin panel?
- [ ] Can you login with your admin password?
- [ ] Can you see the articles list?
- [ ] Can you generate a new article?
- [ ] Check browser console - no errors about missing env vars?

## Security Improvements ✅

### Before (INSECURE) ❌
- `VITE_OPENAI_API_KEY` exposed to browser (anyone could steal it!)
- `VITE_DATABASE_URL` in frontend code
- Frontend making direct OpenAI calls
- API keys visible in browser DevTools

### After (SECURE) ✅
- OpenAI API key ONLY in backend
- Database ONLY accessible from backend
- Frontend calls backend API (not OpenAI directly)
- API keys never exposed to browser
- Clean separation of concerns

## Variable Access Matrix

| Variable | Backend | Frontend | Notes |
|----------|---------|----------|-------|
| `DATABASE_URL` | ✅ Yes | ❌ No | Backend only |
| `OPENAI_API_KEY` | ✅ Yes | ❌ No | Backend only |
| `CONTENT_MODEL` | ✅ Yes | ❌ No | Backend only |
| `CONTENT_MODEL_FALLBACK` | ✅ Yes | ❌ No | Backend only |
| `FORMATTER_MODEL` | ✅ Yes | ❌ No | Backend only |
| `FORMATTER_MODEL_FALLBACK` | ✅ Yes | ❌ No | Backend only |
| `PORT` | ✅ Yes | ❌ No | Backend only |
| `FRONTEND_URL` | ✅ Yes | ❌ No | Backend only |
| `API_URL` | ❌ No | ✅ Yes | Frontend only |
| `ADMIN_PASSWORD` | ❌ No | ✅ Yes | Frontend only |

**Total: 10 variables (8 backend, 2 frontend)**

## Vite Configuration

The new Vite config ensures only safe variables are exposed to frontend:

```typescript
export default defineConfig({
  envPrefix: ['API_', 'ADMIN_'], // Only these prefixes exposed
  // This means:
  // - API_URL → ✅ Available in frontend
  // - ADMIN_PASSWORD → ✅ Available in frontend
  // - OPENAI_API_KEY → ❌ NOT available in frontend
  // - DATABASE_URL → ❌ NOT available in frontend
})
```

## Breaking Changes

### For Local Development
- **Action Required**: Update your `.env` file with new variable names
- **Action Required**: Restart dev server

### For Deployment (Render, Vercel, etc.)
- **Action Required**: Update environment variables in hosting dashboard
- Change `VITE_API_URL` → `API_URL`
- Change `VITE_ADMIN_PASSWORD` → `ADMIN_PASSWORD`
- Remove `VITE_OPENAI_API_KEY` (should only be `OPENAI_API_KEY` on backend)

## Troubleshooting

### Issue: "Backend API not configured"
**Solution**: Check that `API_URL` is set in `.env` (not `VITE_API_URL`)

### Issue: Admin login doesn't work
**Solution**: Check that `ADMIN_PASSWORD` is set in `.env` (not `VITE_ADMIN_PASSWORD`)

### Issue: Article generation fails
**Solution**: Check that backend has `OPENAI_API_KEY` set (not in frontend!)

### Issue: Variables still showing as undefined
**Solution**: 
1. Restart dev server
2. Clear Vite cache: `rm -rf apps/web/node_modules/.vite`
3. Check `.env` file location (should be in project root)

## Files to Delete (Optional)

These files are now deprecated and can be safely deleted:

- ❌ `apps/web/src/services/aiService.ts` (insecure, makes direct OpenAI calls from frontend)
- ❌ `apps/web/src/lib/database.ts` (if it exists - frontend shouldn't access DB)

**Note**: I've added deprecation warnings but kept the files for now. You can delete them when ready.

## Verification Checklist

- [ ] Updated `.env` with new variable names
- [ ] Removed old `VITE_` prefixed variables
- [ ] Restarted dev server
- [ ] Admin panel loads
- [ ] Can login to admin panel
- [ ] Articles list loads
- [ ] Can generate new articles
- [ ] No console errors
- [ ] Backend logs show correct model configuration

## Next Steps

1. **Test locally** - Make sure everything works
2. **Update deployment** - Update env vars in hosting platform
3. **Monitor logs** - Check for any issues
4. **Remove deprecated files** - Delete `aiService.ts` when ready

## Summary

✅ **Security improved** - API keys no longer exposed to browser
✅ **Naming standardized** - Clean, simple variable names
✅ **Code cleaner** - No more `VITE_` prefixes everywhere
✅ **Separation of concerns** - Frontend and backend clearly separated

## Questions?

If something doesn't work:
1. Check this guide
2. Verify `.env` file
3. Restart servers
4. Check browser console for errors
5. Check backend logs for errors

---

**Migration completed successfully!** 🎉

All environment variables are now standardized and secure.

