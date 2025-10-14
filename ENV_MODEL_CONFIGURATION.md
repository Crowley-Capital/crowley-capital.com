# Environment-Based Model Configuration

## Overview
All AI models are now configured via environment variables, making it easy to change models without modifying code.

## Environment Variables

Add these to your `.env` file in the project root:

```bash
# ==================== AI MODEL CONFIGURATION ====================
# Content Generation Models
CONTENT_MODEL=gpt-4o
CONTENT_MODEL_FALLBACK=gpt-4o-mini

# Formatting Models
FORMATTER_MODEL=gpt-4o-mini
FORMATTER_MODEL_FALLBACK=gpt-4o-mini
```

## Model Usage

### Content Generation (Step 1)
- **Primary**: `CONTENT_MODEL` (default: `gpt-4o`)
- **Fallback**: `CONTENT_MODEL_FALLBACK` (default: `gpt-4o-mini`)
- **Purpose**: Generate the raw article content
- **Token Limit**: 8,000 tokens

### HTML/CSS Formatting (Step 2)
- **Primary**: `FORMATTER_MODEL` (default: `gpt-4o-mini`)
- **Fallback**: `FORMATTER_MODEL_FALLBACK` (default: `gpt-4o-mini`)
- **Purpose**: Format raw content into semantic HTML with design system classes
- **Token Limit**: 10,000 tokens

### Metadata Generation (Step 3)
- **Model**: `FORMATTER_MODEL` (default: `gpt-4o-mini`)
- **Purpose**: Generate title, slug, and excerpt
- **Token Limit**: 100-150 tokens per call

## Available Models

### Recommended Options

| Model | Best For | Cost | Speed | Quality |
|-------|----------|------|-------|---------|
| `gpt-4o` | Content generation | $$$ | Medium | Excellent |
| `gpt-4o-mini` | Formatting, metadata | $ | Fast | Very Good |
| `gpt-4-turbo` | Premium content | $$$$ | Medium | Excellent |
| `gpt-3.5-turbo` | Budget option | $ | Very Fast | Good |

### Cost Comparison (per 1M tokens)

- `gpt-4o`: ~$5.00 input / $15.00 output
- `gpt-4o-mini`: ~$0.15 input / $0.60 output
- `gpt-4-turbo`: ~$10.00 input / $30.00 output
- `gpt-3.5-turbo`: ~$0.50 input / $1.50 output

## Configuration Examples

### Default Configuration (Recommended)
```bash
CONTENT_MODEL=gpt-4o
CONTENT_MODEL_FALLBACK=gpt-4o-mini
FORMATTER_MODEL=gpt-4o-mini
FORMATTER_MODEL_FALLBACK=gpt-4o-mini
```

**Cost per article**: ~$0.70-1.40
**Quality**: Excellent content, professional formatting

### Budget Configuration
```bash
CONTENT_MODEL=gpt-4o-mini
CONTENT_MODEL_FALLBACK=gpt-3.5-turbo
FORMATTER_MODEL=gpt-4o-mini
FORMATTER_MODEL_FALLBACK=gpt-3.5-turbo
```

**Cost per article**: ~$0.20-0.40
**Quality**: Very good content, professional formatting

### Premium Configuration
```bash
CONTENT_MODEL=gpt-4-turbo
CONTENT_MODEL_FALLBACK=gpt-4o
FORMATTER_MODEL=gpt-4o-mini
FORMATTER_MODEL_FALLBACK=gpt-4o-mini
```

**Cost per article**: ~$1.50-3.00
**Quality**: Outstanding content, professional formatting

### Testing Configuration
```bash
CONTENT_MODEL=gpt-4o-mini
CONTENT_MODEL_FALLBACK=gpt-4o-mini
FORMATTER_MODEL=gpt-4o-mini
FORMATTER_MODEL_FALLBACK=gpt-4o-mini
```

**Cost per article**: ~$0.20-0.40
**Quality**: Good for testing and development

## How It Works

### Startup
When the server starts, it loads the model configuration:

```
🤖 AI Model Configuration:
   Content Model: gpt-4o (fallback: gpt-4o-mini)
   Formatter Model: gpt-4o-mini (fallback: gpt-4o-mini)
```

### Article Generation
1. **Content Generation**: Tries `CONTENT_MODEL`, falls back to `CONTENT_MODEL_FALLBACK` if it fails
2. **HTML Formatting**: Tries `FORMATTER_MODEL`, falls back to `FORMATTER_MODEL_FALLBACK` if it fails
3. **Metadata**: Uses `FORMATTER_MODEL` (no fallback for metadata)

### Logs
The system logs which model was actually used:

**Success with primary model:**
```
✅ Successfully used gpt-4o for content generation
✅ Step 1 complete: Generated 12450 characters with gpt-4o
```

**Fallback scenario:**
```
⚠️ gpt-4o failed, falling back to gpt-4o-mini: Rate limit exceeded
✅ Successfully used gpt-4o-mini as fallback
✅ Step 1 complete: Generated 11850 characters with gpt-4o-mini
```

## Changing Models

### To Change Content Model
```bash
# In your .env file
CONTENT_MODEL=gpt-4-turbo  # Change from gpt-4o to gpt-4-turbo
```

### To Change Fallback Model
```bash
# In your .env file
CONTENT_MODEL_FALLBACK=gpt-3.5-turbo  # Change from gpt-4o-mini
```

### To Change Formatter Model
```bash
# In your .env file
FORMATTER_MODEL=gpt-4o  # Upgrade formatter to gpt-4o
```

## No Code Changes Required!

All model references in the code now use these environment variables:
- ✅ No hardcoded model strings
- ✅ Single source of truth
- ✅ Easy to update and test
- ✅ Consistent across all generation steps

## Default Values

If environment variables are not set, the system uses these defaults:
- `CONTENT_MODEL`: `gpt-4o`
- `CONTENT_MODEL_FALLBACK`: `gpt-4o-mini`
- `FORMATTER_MODEL`: `gpt-4o-mini`
- `FORMATTER_MODEL_FALLBACK`: `gpt-4o-mini`

## Setup Instructions

### 1. Create/Update `.env` File
```bash
# Copy from env-example.txt
cp env-example.txt .env

# Or create manually
touch .env
```

### 2. Add Model Configuration
```bash
# Add to .env
CONTENT_MODEL=gpt-4o
CONTENT_MODEL_FALLBACK=gpt-4o-mini
FORMATTER_MODEL=gpt-4o-mini
FORMATTER_MODEL_FALLBACK=gpt-4o-mini
```

### 3. Restart Server
```bash
# Stop current server (Ctrl+C)
npm run dev

# Or if using PM2
pm2 restart all
```

### 4. Verify Configuration
Check the startup logs for:
```
🤖 AI Model Configuration:
   Content Model: gpt-4o (fallback: gpt-4o-mini)
   Formatter Model: gpt-4o-mini (fallback: gpt-4o-mini)
```

## Testing Different Models

### Test Locally First
Before deploying, test different models locally:

1. Update `.env` with test model
2. Restart server
3. Generate a test article
4. Review quality and cost
5. Compare with baseline

### A/B Testing
To compare models, generate articles with different configurations:

```bash
# Test 1: Default (gpt-4o)
CONTENT_MODEL=gpt-4o npm run dev

# Test 2: Mini (gpt-4o-mini)
CONTENT_MODEL=gpt-4o-mini npm run dev

# Test 3: Turbo (gpt-4-turbo)
CONTENT_MODEL=gpt-4-turbo npm run dev
```

Compare:
- Content quality
- Generation time
- API costs
- Error rates

## Monitoring

### Cost Tracking
Monitor actual costs in OpenAI dashboard:
- https://platform.openai.com/usage

### Model Usage
Check server logs to see which models are being used:
```bash
# Watch logs in real-time
tail -f logs/server.log | grep "Successfully used"
```

### Fallback Rate
Track how often fallbacks occur:
```bash
# Count fallback occurrences
grep "falling back" logs/server.log | wc -l
```

## Troubleshooting

### Models Not Loading
**Symptom**: Using default models instead of configured ones

**Solution**:
1. Check `.env` file exists in project root
2. Verify variable names are exact (case-sensitive)
3. Restart server after changes
4. Check startup logs for confirmation

### Invalid Model Name
**Symptom**: API errors about invalid model

**Solution**:
1. Verify model name is correct (check OpenAI documentation)
2. Ensure you have access to the model in your OpenAI account
3. Check for typos in `.env`

### Rate Limits
**Symptom**: Frequent fallbacks to fallback model

**Solution**:
1. Upgrade OpenAI account tier
2. Implement request queuing
3. Space out article generation
4. Use lower-tier models during high-traffic periods

## Files Modified

- `apps/api/src/server.js` - Uses environment variables for all models
- `env-example.txt` - Template for `.env` file with model configuration

## Security Note

**Never commit `.env` files to version control!**

The `.env` file is already in `.gitignore` to prevent accidental commits.

## Future Enhancements

Consider adding:
- Model selection UI in admin panel
- Real-time cost tracking
- Model performance analytics
- Automatic model selection based on topic complexity
- Scheduled model rotation for cost optimization

