# Brand Essence Feature Setup

## Overview
Added a new "Brand Essence" card to the AI Settings tab that allows you to define your brand's core identity and voice. This information will be stored in the database and can be used to inform AI-generated content.

## Database Migration

Run the following SQL on your PostgreSQL database to add the Brand Essence columns:

```sql
-- Add Brand Essence columns to articles_settings table
ALTER TABLE articles_settings 
ADD COLUMN IF NOT EXISTS positioning TEXT,
ADD COLUMN IF NOT EXISTS tone TEXT,
ADD COLUMN IF NOT EXISTS brand_pillars TEXT;

-- Add comments for documentation
COMMENT ON COLUMN articles_settings.positioning IS 'Brand positioning statement describing unique market position';
COMMENT ON COLUMN articles_settings.tone IS 'Brand communication tone and style guidelines';
COMMENT ON COLUMN articles_settings.brand_pillars IS 'Core brand pillars and values';
```

**Location:** The full SQL migration file is saved at:
- `database/migrations/add_brand_essence.sql`

## Features Added

### Frontend (Admin Panel)
1. **New Brand Essence Card** - Located on the "AI Settings" tab, to the left of "Generation Frequency"
2. **Three Text Fields:**
   - **Positioning** - Textarea for brand positioning statement
   - **Tone** - Textarea for brand communication tone and style
   - **Brand Pillars** - Textarea for core brand pillars and values

### Backend API
Updated the following endpoints to handle Brand Essence fields:

1. **GET `/api/settings`** - Now returns `positioning`, `tone`, and `brand_pillars`
2. **PUT `/api/settings`** - Now accepts and saves Brand Essence fields

### Database Schema
Added three new columns to the `articles_settings` table:
- `positioning` (TEXT, nullable)
- `tone` (TEXT, nullable)
- `brand_pillars` (TEXT, nullable)

## Files Modified

### Frontend
- `apps/web/src/pages/Admin.tsx` - Added Brand Essence UI and state management
- `apps/web/src/lib/db.ts` - Updated types and interfaces to include Brand Essence fields

### Backend
- `apps/api/src/server.js` - Updated settings endpoints to handle Brand Essence fields

### Database
- `database/migrations/add_brand_essence.sql` - New migration file

## How to Use

1. **Run the SQL Migration**
   ```bash
   # Connect to your PostgreSQL database
   psql $DATABASE_URL -f database/migrations/add_brand_essence.sql
   ```

2. **Access the Admin Panel**
   - Navigate to `/admin`
   - Go to the "AI Settings" tab
   - Find the "Brand Essence" card (left of "Generation Frequency")

3. **Fill in Brand Essence Fields**
   - **Positioning**: Describe your brand's unique market position
   - **Tone**: Describe your brand's communication tone and style
   - **Brand Pillars**: List your brand's core pillars and values

4. **Save Settings**
   - Click "Save All Settings" at the bottom of the AI Settings tab
   - The Brand Essence information will be saved to the database

## Next Steps

You can now use these Brand Essence fields to inform AI-generated content. Consider:
- Passing this information to the AI generation prompts
- Using it to maintain brand consistency across articles
- Referencing it in the article generation workflow

## Technical Notes

- All Brand Essence fields are optional (nullable in database)
- Fields default to empty strings if not set
- Settings are saved to both the database (if configured) and localStorage as a fallback
- The `transition-none` class is applied to all textareas to prevent UI freezing on hover

