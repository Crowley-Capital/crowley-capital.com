-- Add Brand Essence columns to articles_settings table
-- Run this SQL on your PostgreSQL database

ALTER TABLE articles_settings 
ADD COLUMN IF NOT EXISTS positioning TEXT,
ADD COLUMN IF NOT EXISTS tone TEXT,
ADD COLUMN IF NOT EXISTS brand_pillars TEXT;

-- Add comments for documentation
COMMENT ON COLUMN articles_settings.positioning IS 'Brand positioning statement describing unique market position';
COMMENT ON COLUMN articles_settings.tone IS 'Brand communication tone and style guidelines';
COMMENT ON COLUMN articles_settings.brand_pillars IS 'Core brand pillars and values';

