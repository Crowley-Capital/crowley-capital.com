-- Migration: Add image fields to articles table
-- Run this against your PostgreSQL database

-- Add image_url column to store the path to the article's hero image
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS image_url VARCHAR(500),
ADD COLUMN IF NOT EXISTS image_alt TEXT;

-- Add index for faster image queries
CREATE INDEX IF NOT EXISTS idx_articles_image_url ON articles(image_url);

-- Add comment for documentation
COMMENT ON COLUMN articles.image_url IS 'Path to article hero image (16:9 aspect ratio, optimized)';
COMMENT ON COLUMN articles.image_alt IS 'Alt text for article image (for accessibility and SEO)';

-- Display result
SELECT 'Migration completed: image_url and image_alt columns added to articles table' AS status;

