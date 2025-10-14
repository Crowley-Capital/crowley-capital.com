# AI Prompt Updates - Brand Essence & Current Information

## Overview
Updated the article generation system to incorporate Brand Essence fields and ensure articles use the latest, most up-to-date information.

## Key Changes

### 1. Brand Essence Integration
The AI now automatically loads and incorporates your Brand Essence settings (positioning, tone, brand_pillars) into the content generation prompts.

**How it works:**
- Before generating an article, the system queries the database for your Brand Essence settings
- These values are dynamically added to the AI's system prompt
- The AI uses this context to maintain brand consistency across all generated content

**System Prompt Structure:**
```
You are an expert content writer for Crowley Capital, creating high-quality, informative content for startup founders.

BRAND POSITIONING:
[Your positioning statement from settings]

TONE & STYLE:
[Your tone guidelines from settings]

BRAND PILLARS:
[Your brand pillars from settings]

IMPORTANT: Focus on the LATEST and MOST UP-TO-DATE information...
```

### 2. Current Information Enforcement
Added explicit instructions to ensure articles use the latest information:

**What was added:**
- Current date context: The AI is told the current date (e.g., "October 2025")
- Explicit instructions to focus on recent trends, current data, and contemporary examples
- Warning NOT to reference outdated information from years ago
- Emphasis on keeping content fresh and relevant

**User Prompt Updates:**
All content prompts now include:
```
Focus on the latest, most up-to-date information ([Current Date]). 
Provide the raw content with clear structure but no HTML formatting.
```

### 3. Generation Process Flow

**Step 1: Load Brand Essence** (New!)
```javascript
// Query database for Brand Essence settings
SELECT positioning, tone, brand_pillars FROM articles_settings
```

**Step 2: Build Brand Context** (New!)
```javascript
// Build comprehensive brand context including:
- Positioning statement
- Tone & style guidelines
- Brand pillars
- Current date + recency instructions
```

**Step 3: Generate Content**
- Uses user's selected model (gpt-4o or gpt-4o-mini)
- Incorporates Brand Essence in system prompt
- Includes current date in user prompt

**Step 4: Format to HTML**
- Uses gpt-4o-mini for consistent formatting
- Applies Crowley Capital design system

**Step 5: Generate Metadata**
- Creates SEO-friendly title, slug, excerpt

**Step 6: Save to Database**
- Saves as "published" status automatically

## Files Modified

### Backend
- `apps/api/src/server.js`
  - Added Brand Essence loading from database
  - Updated system prompts to include Brand Essence
  - Added current date context
  - Added recency enforcement instructions

## Benefits

### Brand Consistency
- **Automatic**: No need to manually specify brand guidelines for each article
- **Centralized**: Update Brand Essence settings once, affects all future articles
- **Comprehensive**: Positioning, tone, and brand pillars all considered

### Content Freshness
- **Current Context**: AI knows the current date and prioritizes recent information
- **No Outdated References**: Explicit instructions to avoid old examples
- **Relevant**: Content stays aligned with today's startup ecosystem

### Better Quality
- **On-Brand**: Every article reflects your brand voice and values
- **Timely**: Articles feel fresh and relevant to readers
- **Consistent**: Uniform brand experience across all content

## Example Prompt Impact

### Before:
```
System: You are an expert content writer for Crowley Capital. 
Focus on creating high-quality, informative content for startup founders. 
Write in a professional yet conversational tone.

User: Write a comprehensive blog article about: Startup Fundraising
```

### After:
```
System: You are an expert content writer for Crowley Capital, 
creating high-quality, informative content for startup founders.

BRAND POSITIONING:
We empower first-time founders with tactical guidance, capital 
expertise, and a founder-first philosophy to navigate early-stage growth.

TONE & STYLE:
Professional yet approachable. Think "expert advisor over coffee" 
rather than corporate consulting. Use clear language, practical 
examples, and actionable insights.

BRAND PILLARS:
- Founder-First Philosophy
- Tactical Over Theoretical
- Transparency & Trust
- Long-Term Partnership

IMPORTANT: Focus on the LATEST and MOST UP-TO-DATE information. 
Use current trends, recent data, and contemporary examples from 
October 2025 or recent months. Do NOT reference outdated information 
from years ago unless specifically relevant for historical context. 
Keep content fresh and relevant to today's startup ecosystem.

User: Write a comprehensive blog article about: Startup Fundraising

Focus on the latest, most up-to-date information (October 2025). 
Provide the raw content with clear structure but no HTML formatting.
```

## How to Use

1. **Set Brand Essence** (One-time setup)
   - Go to Admin Panel → AI Settings tab
   - Fill in the "Brand Essence" card:
     - Positioning: Your brand's market position
     - Tone: Your communication style
     - Brand Pillars: Your core values
   - Click "Save All Settings"

2. **Generate Articles**
   - Your Brand Essence is now automatically applied to every article
   - No additional steps needed!
   - Each article will:
     - Match your brand voice and positioning
     - Use current, up-to-date information
     - Maintain consistency with your brand pillars

3. **Update Brand Essence Anytime**
   - Simply edit the fields in AI Settings
   - Save settings
   - All future articles will use the updated brand guidelines

## Technical Notes

- Brand Essence is loaded fresh for each article generation
- If Brand Essence fields are empty, the system uses default prompts
- Current date is calculated dynamically for each generation
- Database connection errors are handled gracefully (falls back to defaults)
- Brand context is only added to Step 1 (content generation), not formatting

## Monitoring

Check the backend logs during article generation to see:
```
✅ Loaded Brand Essence from database
📝 Step 1: Generating raw content with gpt-4o-mini...
```

If Brand Essence fails to load:
```
⚠️ Could not load Brand Essence, using defaults: [error message]
```

