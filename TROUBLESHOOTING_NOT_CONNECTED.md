# Troubleshooting "Not Connected" Error

## Issue
Browser shows "Not Connected" - frontend can't reach backend API.

## Root Cause
After the environment variable migration, the frontend is looking for `API_URL` instead of `VITE_API_URL`.

## Solution

### Step 1: Update Your `.env` File

Open `/Users/antonspromac/crowley-capital.com/.env` and make sure it has:

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
FRONTEND_URL=http://localhost:8080

# ==================== FRONTEND ====================
API_URL=http://localhost:3001/api
ADMIN_PASSWORD=your-admin-password
```

**CRITICAL**: 
- ✅ Use `API_URL` (NOT `VITE_API_URL`)
- ✅ Use `ADMIN_PASSWORD` (NOT `VITE_ADMIN_PASSWORD`)
- ❌ Remove any `VITE_` prefixed variables

### Step 2: Stop All Servers

Press `Ctrl+C` in all terminal windows to stop:
- Frontend dev server
- Backend dev server

### Step 3: Clear Caches

```bash
cd /Users/antonspromac/crowley-capital.com

# Clear frontend cache
rm -rf apps/web/node_modules/.vite
rm -rf apps/web/dist

# Optional: Clear node_modules cache
rm -rf apps/web/.vite
```

### Step 4: Restart Backend

```bash
cd /Users/antonspromac/crowley-capital.com

# Start backend
cd apps/api
npm run dev
```

**Expected output:**
```
✅ PostgreSQL connected successfully
🤖 AI Model Configuration:
   Content Model: gpt-4o (fallback: gpt-4o-mini)
   Formatter Model: gpt-4o-mini (fallback: gpt-4o-mini)
Server running on http://localhost:3001
```

### Step 5: Restart Frontend (New Terminal)

```bash
cd /Users/antonspromac/crowley-capital.com

# Start frontend
cd apps/web
npm run dev
```

**Expected output:**
```
VITE v... ready in ...ms
➜  Local:   http://localhost:8080/
```

### Step 6: Test Connection

Open browser and go to:
- Frontend: http://localhost:8080
- Backend health check: http://localhost:3001/api/health

## Quick Verification Checklist

- [ ] `.env` file exists in project root (`/Users/antonspromac/crowley-capital.com/.env`)
- [ ] `.env` has `API_URL=http://localhost:3001/api` (not `VITE_API_URL`)
- [ ] `.env` has `ADMIN_PASSWORD=...` (not `VITE_ADMIN_PASSWORD`)
- [ ] No `VITE_OPENAI_API_KEY` in `.env` (should only be `OPENAI_API_KEY`)
- [ ] Backend is running on port 3001
- [ ] Frontend is running on port 8080
- [ ] Backend health check works: http://localhost:3001/api/health
- [ ] Browser console shows no "API_URL is undefined" errors

## Common Issues

### Issue: "API_URL is undefined"
**Solution**: 
1. Add `API_URL=http://localhost:3001/api` to `.env`
2. Restart frontend server

### Issue: Backend won't start
**Solution**: 
1. Check `DATABASE_URL` in `.env`
2. Check `OPENAI_API_KEY` in `.env`
3. Check backend logs for errors

### Issue: Still showing "Not Connected"
**Solution**:
1. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
2. Check browser console for errors
3. Verify both servers are running
4. Check `API_URL` points to correct backend

### Issue: "ADMIN_PASSWORD is undefined"
**Solution**:
1. Add `ADMIN_PASSWORD=your-password` to `.env`
2. Restart frontend server

## Debugging

### Check Backend Status
```bash
curl http://localhost:3001/api/health
```

**Expected response:**
```json
{"status":"ok","message":"Backend API is running"}
```

### Check Environment Variables (Frontend)
Open browser console and type:
```javascript
console.log(import.meta.env.API_URL)
console.log(import.meta.env.ADMIN_PASSWORD)
```

**Expected output:**
```
http://localhost:3001/api
your-password
```

**Should NOT see:**
```
undefined
undefined
```

### Check Environment Variables (Backend)
In your backend terminal, look for:
```
🤖 AI Model Configuration:
   Content Model: gpt-4o (fallback: gpt-4o-mini)
   Formatter Model: gpt-4o-mini (fallback: gpt-4o-mini)
```

## If Nothing Works

### Nuclear Option: Full Restart

```bash
cd /Users/antonspromac/crowley-capital.com

# Stop everything
killall node

# Clear all caches
rm -rf apps/web/node_modules/.vite
rm -rf apps/web/dist
rm -rf apps/api/dist

# Make sure .env is correct (use template above)
cat .env

# Restart backend (Terminal 1)
cd apps/api && npm run dev

# Wait for "Server running on http://localhost:3001"

# Restart frontend (Terminal 2)
cd apps/web && npm run dev

# Wait for "Local: http://localhost:8080/"

# Open browser
# Go to http://localhost:8080
```

## Still Having Issues?

Check these files to verify the migration was successful:

1. **`apps/web/vite.config.ts`**
   - Should have: `envPrefix: ['API_', 'ADMIN_']`

2. **`apps/web/src/context/AdminAuthContext.tsx`**
   - Should have: `import.meta.env.ADMIN_PASSWORD` (not `VITE_ADMIN_PASSWORD`)

3. **`apps/web/src/lib/db.ts`**
   - Should have: `import.meta.env.API_URL` (not `VITE_API_URL`)

4. **`apps/web/src/pages/Admin.tsx`**
   - Should have: `import.meta.env.API_URL` (not `VITE_API_URL`)

## Alternative: Use Root Scripts

If you have root-level scripts:

```bash
cd /Users/antonspromac/crowley-capital.com

# Stop everything
killall node

# Start everything
npm run dev
```

This should start both frontend and backend together.

---

**Most likely solution**: Add `API_URL=http://localhost:3001/api` to your `.env` file and restart both servers!

