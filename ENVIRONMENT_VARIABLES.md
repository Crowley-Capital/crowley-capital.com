# Environment Variables - Complete List

## Summary

All environment variables using **clean, simple names** without `VITE_` prefixes.

## Complete List

### 1. Database
```bash
DATABASE_URL=postgresql://user:password@host:port/database
```
- **Used by**: Backend only
- **Purpose**: PostgreSQL connection string

### 2. OpenAI API
```bash
OPENAI_API_KEY=sk-your-openai-key-here
```
- **Used by**: Backend only
- **Purpose**: Authenticate with OpenAI API
- **Security**: NEVER expose to frontend!

### 3. AI Model Configuration
```bash
CONTENT_MODEL=gpt-4o
CONTENT_MODEL_FALLBACK=gpt-4o-mini
FORMATTER_MODEL=gpt-4o-mini
FORMATTER_MODEL_FALLBACK=gpt-4o-mini
```
- **Used by**: Backend only
- **Purpose**: Configure which AI models to use for article generation

### 4. Backend Server
```bash
PORT=3001
FRONTEND_URL=https://your-domain.com
```
- **Used by**: Backend only
- **Purpose**: Server configuration and CORS

### 5. Frontend API
```bash
API_URL=http://localhost:3001/api
```
- **Used by**: Frontend only
- **Purpose**: Backend API endpoint for frontend to call

### 6. Admin Authentication
```bash
ADMIN_PASSWORD=your-admin-password
```
- **Used by**: Frontend only
- **Purpose**: Client-side admin panel authentication

## Total: 10 Environment Variables

- **Backend**: 8 variables
- **Frontend**: 2 variables

## Quick Reference Table

| Variable | Backend | Frontend | Purpose |
|----------|---------|----------|---------|
| `DATABASE_URL` | ✅ | ❌ | PostgreSQL connection |
| `OPENAI_API_KEY` | ✅ | ❌ | OpenAI authentication |
| `CONTENT_MODEL` | ✅ | ❌ | Primary content model |
| `CONTENT_MODEL_FALLBACK` | ✅ | ❌ | Fallback content model |
| `FORMATTER_MODEL` | ✅ | ❌ | HTML formatting model |
| `FORMATTER_MODEL_FALLBACK` | ✅ | ❌ | Fallback formatter model |
| `PORT` | ✅ | ❌ | Server port |
| `FRONTEND_URL` | ✅ | ❌ | Frontend URL for CORS |
| `API_URL` | ❌ | ✅ | Backend API endpoint |
| `ADMIN_PASSWORD` | ❌ | ✅ | Admin panel password |

## .env File Template

Create a `.env` file in your project root:

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

## Development vs Production

### Development (`.env`)
```bash
DATABASE_URL=postgresql://localhost:5432/crowley_dev
OPENAI_API_KEY=sk-dev-key
CONTENT_MODEL=gpt-4o-mini  # Use mini for dev to save costs
CONTENT_MODEL_FALLBACK=gpt-4o-mini
FORMATTER_MODEL=gpt-4o-mini
FORMATTER_MODEL_FALLBACK=gpt-4o-mini
PORT=3001
FRONTEND_URL=http://localhost:8080
API_URL=http://localhost:3001/api
ADMIN_PASSWORD=admin123
```

### Production (Hosting Platform)
```bash
DATABASE_URL=postgresql://prod-host:5432/crowley_prod
OPENAI_API_KEY=sk-prod-key
CONTENT_MODEL=gpt-4o  # Use gpt-4o for production quality
CONTENT_MODEL_FALLBACK=gpt-4o-mini
FORMATTER_MODEL=gpt-4o-mini
FORMATTER_MODEL_FALLBACK=gpt-4o-mini
PORT=3001
FRONTEND_URL=https://crowley-capital.com
API_URL=https://api.crowley-capital.com/api
ADMIN_PASSWORD=secure-prod-password
```

## Security Best Practices

### ✅ DO
- Keep `.env` in `.gitignore`
- Use different values for dev/prod
- Rotate API keys regularly
- Use strong admin passwords
- Only expose necessary vars to frontend

### ❌ DON'T
- Commit `.env` to version control
- Share API keys in public repos
- Use same password for dev/prod
- Expose backend keys to frontend
- Hardcode sensitive values in code

## Migration from Old Names

If you're updating from the old `VITE_` prefixed names:

| Old Name | New Name |
|----------|----------|
| `VITE_API_URL` | `API_URL` |
| `VITE_ADMIN_PASSWORD` | `ADMIN_PASSWORD` |
| `VITE_OPENAI_API_KEY` | ❌ Remove (use backend only) |
| `VITE_DATABASE_URL` | ❌ Remove (use backend only) |
| `VITE_OPENAI_MODEL` | ❌ Remove (not needed) |
| `VITE_OPENAI_TEMPERATURE` | ❌ Remove (not needed) |
| `VITE_OPENAI_MAX_TOKENS` | ❌ Remove (not needed) |

## How Variables Are Loaded

### Backend (Node.js)
```javascript
// Loaded via dotenv
import dotenv from 'dotenv';
dotenv.config();

// Access via process.env
const apiKey = process.env.OPENAI_API_KEY;
```

### Frontend (Vite)
```javascript
// Loaded automatically by Vite
// Access via import.meta.env
const apiUrl = import.meta.env.API_URL;
```

**Note**: Vite configuration controls which variables are exposed to frontend (see `vite.config.ts`).

## Troubleshooting

### Variable Not Found
1. Check `.env` file exists in project root
2. Verify variable name spelling (case-sensitive)
3. Restart dev server after `.env` changes
4. Check Vite config for `envPrefix` setting

### Variable Undefined in Frontend
1. Ensure variable is in `.env`
2. Check `vite.config.ts` for `envPrefix` configuration
3. Restart Vite dev server
4. Clear browser cache

### Variable Undefined in Backend
1. Ensure `.env` is in correct location (project root)
2. Check `dotenv.config()` path
3. Restart Node.js server
4. Verify no typos in variable name

## Validation

### Backend Startup
Should see:
```
✅ PostgreSQL connected successfully
🤖 AI Model Configuration:
   Content Model: gpt-4o (fallback: gpt-4o-mini)
   Formatter Model: gpt-4o-mini (fallback: gpt-4o-mini)
```

### Frontend
Should be able to:
- Login to admin panel (uses `ADMIN_PASSWORD`)
- Load articles (uses `API_URL`)
- Generate articles via backend

## Need Help?

If you're setting up environment variables:
1. Copy template from this document
2. Replace placeholder values
3. Save as `.env` in project root
4. Restart both frontend and backend
5. Check logs for confirmation

## Related Documentation
- `ENV_VARIABLES_AUDIT.md` - Detailed audit and migration plan
- `ENV_MODEL_CONFIGURATION.md` - AI model configuration guide
- `env-example.txt` - Quick reference template

