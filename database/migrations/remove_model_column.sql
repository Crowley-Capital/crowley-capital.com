-- Remove model column from articles_settings table
-- Models are now configured via environment variables (CONTENT_MODEL, FORMATTER_MODEL)

ALTER TABLE articles_settings 
DROP COLUMN IF EXISTS model;

-- Note: This migration is safe because:
-- 1. Model selection is now handled by environment variables
-- 2. Frontend no longer sends/receives model in settings
-- 3. Backend APIs have been updated to not use this column

