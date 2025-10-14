# Environment Variables Audit & Standardization

## Current Issues

1. **Inconsistent naming**: Mix of `VITE_` prefixed and non-prefixed variables
2. **Security concern**: Frontend has access to `VITE_OPENAI_API_KEY` (should only be backend)
3. **Unused variables**: Several AI configuration variables not properly used
4. **Frontend database access**: `VITE_DATABASE_URL` exists (frontend should never access DB directly!)

## Proposed Standard Convention

**Remove all `VITE_` prefixes** - Use simple, clean names:
- ✅ `DATABASE_URL` (not `VITE_DATABASE_URL`)
- ✅ `ADMIN_PASSWORD` (not `VITE_ADMIN_PASSWORD`)
- ✅ `OPENAI_API_KEY` (not `VITE_OPENAI_API_KEY`)
- ✅ `API_URL` (not `VITE_API_URL`)

## Complete Environment Variables List

### Backend Only (Node.js)
```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# OpenAI
OPENAI_API_KEY=sk-...

# AI Model Configuration
CONTENT_MODEL=gpt-4o
CONTENT_MODEL_FALLBACK=gpt-4o-mini
FORMATTER_MODEL=gpt-4o-mini
FORMATTER_MODEL_FALLBACK=gpt-4o-mini

# Server
PORT=3001
FRONTEND_URL=https://your-domain.com
```

### Frontend (Vite)
```bash
# API Configuration
API_URL=http://localhost:3001/api

# Admin Authentication
ADMIN_PASSWORD=your-admin-password
```

### Shared (Both)
```bash
# None - keep backend and frontend separated
```

## Security Architecture

### ✅ Correct Setup
- **Backend**: Has `OPENAI_API_KEY`, makes AI calls
- **Frontend**: Has `API_URL`, calls backend API
- **Frontend**: Has `ADMIN_PASSWORD`, for client-side auth check

### ❌ Current Problem
- **Frontend**: Has `VITE_OPENAI_API_KEY` (exposed to browser!)
- **Frontend**: Has unused AI config variables
- **Frontend**: Has `VITE_DATABASE_URL` (dangerous!)

## Migration Plan

### Files to Update

1. **Frontend (`apps/web/src/`)**:
   - `context/AdminAuthContext.tsx` - Update `VITE_ADMIN_PASSWORD` → `ADMIN_PASSWORD`
   - `lib/db.ts` - Update `VITE_API_URL` → `API_URL`
   - `pages/Admin.tsx` - Update `VITE_API_URL` → `API_URL`, remove `VITE_OPENAI_API_KEY`
   - `pages/Articles.tsx` - Update `VITE_API_URL` → `API_URL`
   - `pages/ArticleDetail.tsx` - Update `VITE_API_URL` → `API_URL`
   - `services/aiService.ts` - Remove (frontend shouldn't call OpenAI directly!)
   - `config/aiPrompts.ts` - Remove AI config env vars

2. **Vite Configuration (`apps/web/vite.config.ts`)**:
   - Update `envPrefix` from `VITE_` to `''` (empty string)

3. **Documentation**:
   - Update `env-example.txt`
   - Update all docs referencing env vars

### Variables to Remove

#### From Frontend
- ❌ `VITE_OPENAI_API_KEY` - OpenAI calls should only be from backend
- ❌ `VITE_OPENAI_MODEL` - Not used properly
- ❌ `VITE_OPENAI_TEMPERATURE` - Not used properly
- ❌ `VITE_OPENAI_MAX_TOKENS` - Not used properly
- ❌ `VITE_DATABASE_URL` - Frontend should NEVER access DB directly!

### Files to Remove/Deprecate

1. `apps/web/src/services/aiService.ts` - Frontend shouldn't call OpenAI
2. `apps/web/src/lib/database.ts` - Frontend shouldn't access DB
3. `apps/web/src/config/aiPrompts.ts` - AI config should be backend only

## New `.env` Template

```bash
# ==================== DATABASE ====================
DATABASE_URL=postgresql://user:password@host:port/database

# ==================== OPENAI API ====================
OPENAI_API_KEY=sk-your-key-here

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

## Security Benefits

### Before (Insecure)
- ❌ OpenAI API key exposed in browser
- ❌ Database credentials in frontend code
- ❌ Frontend making direct AI/DB calls

### After (Secure)
- ✅ OpenAI API key only in backend
- ✅ Database only accessible from backend
- ✅ Frontend only calls backend API
- ✅ Clean separation of concerns

## Implementation Steps

1. Update Vite config to remove `VITE_` prefix requirement
2. Update all frontend files to use new variable names
3. Remove frontend AI service files
4. Update documentation
5. Update `.env` template
6. Test all functionality
7. Deploy with new env vars

## Breaking Changes

### For Developers
- Must update local `.env` file with new variable names
- Must restart dev server after changes

### For Deployment
- Must update environment variables in hosting platform (Render, Vercel, etc.)
- Variables without `VITE_` prefix will still be available to frontend via Vite

## Vite Environment Variable Handling

By default, Vite only exposes variables prefixed with `VITE_` to the frontend. We'll change this:

**Current (`vite.config.ts`)**:
```javascript
// Default behavior - only VITE_ variables exposed
```

**New (`vite.config.ts`)**:
```javascript
export default defineConfig({
  envPrefix: '', // Expose all variables (be careful!)
  // OR
  envPrefix: ['API_', 'ADMIN_'], // Only expose specific prefixes
})
```

**Recommended**: Use specific prefixes for frontend:
```javascript
envPrefix: ['API_', 'ADMIN_'] // Only API_* and ADMIN_* exposed to frontend
```

Then:
- `API_URL` → available in frontend
- `ADMIN_PASSWORD` → available in frontend
- `OPENAI_API_KEY` → NOT available in frontend ✅
- `DATABASE_URL` → NOT available in frontend ✅

## Final Variable List

### Backend Environment Variables
```bash
DATABASE_URL=...
OPENAI_API_KEY=...
CONTENT_MODEL=...
CONTENT_MODEL_FALLBACK=...
FORMATTER_MODEL=...
FORMATTER_MODEL_FALLBACK=...
PORT=...
FRONTEND_URL=...
```

### Frontend Environment Variables (with prefix filtering)
```bash
API_URL=...
ADMIN_PASSWORD=...
```

Total: **10 environment variables** (8 backend, 2 frontend)

## Checklist

- [ ] Update `vite.config.ts` with `envPrefix`
- [ ] Update `AdminAuthContext.tsx`
- [ ] Update `db.ts`
- [ ] Update `Admin.tsx`
- [ ] Update `Articles.tsx`
- [ ] Update `ArticleDetail.tsx`
- [ ] Remove/deprecate `aiService.ts`
- [ ] Remove/deprecate `database.ts`
- [ ] Clean up `aiPrompts.ts`
- [ ] Update `env-example.txt`
- [ ] Update all documentation
- [ ] Test frontend
- [ ] Test backend
- [ ] Update deployment env vars

