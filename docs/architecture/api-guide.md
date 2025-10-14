# Backend API Integration Guide

## Overview

The Admin Dashboard is now configured to save and load settings. Currently, it uses **localStorage as a fallback** when no backend API is configured. To persist settings to PostgreSQL, you need to create a backend API.

## Current Status

✅ **Working Now (Fallback Mode):**
- Settings are saved to browser localStorage
- Settings persist across page refreshes
- All admin functionality works

🔄 **Requires Backend API:**
- Persistent storage in PostgreSQL database
- Settings shared across devices/browsers
- Article generation and storage

## Database Schema

Your PostgreSQL database should have these tables (already defined in `database/schema.sql`):

### `articles` table:
```sql
- id (SERIAL PRIMARY KEY)
- date_created (TIMESTAMP)
- date_published (TIMESTAMP)
- date_modified (TIMESTAMP)
- title (VARCHAR)
- description (TEXT)
- article (TEXT)
- url (VARCHAR UNIQUE)
- meta_description (TEXT)
- topic (VARCHAR)
- author (VARCHAR)
- publisher (VARCHAR)
- status (VARCHAR) -- 'draft', 'published', 'archived'
```

### `articles_settings` table:
```sql
- id (SERIAL PRIMARY KEY)
- topics (TEXT[]) -- Array of topic strings
- schedule (VARCHAR) -- Cron expression (e.g., '0 9 * * 1')
- auto (BOOLEAN) -- Automatic generation enabled/disabled
- model (VARCHAR) -- AI model name (e.g., 'gpt-5-mini')
- updated_at (TIMESTAMP)
```

## Required API Endpoints

Create these endpoints in your backend:

### 1. **GET /api/settings**
Load current settings from database.

**Response:**
```json
{
  "id": 1,
  "topics": ["Startup Strategy", "Product Development", "Fundraising"],
  "schedule": "0 9 * * 1",
  "auto": false,
  "model": "gpt-5-mini",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### 2. **PUT /api/settings**
Save/update settings to database.

**Request Body:**
```json
{
  "topics": ["Startup Strategy", "Product Development"],
  "schedule": "0 9 * * 1",
  "auto": true,
  "model": "gpt-5"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Settings updated successfully"
}
```

### 3. **POST /api/articles** (Future)
Save generated articles to database.

**Request Body:**
```json
{
  "title": "Article Title",
  "description": "Short description",
  "article": "Full article content in HTML",
  "url": "article-slug",
  "meta_description": "SEO description",
  "topic": "Startup Strategy",
  "author": "Jake Crowley",
  "publisher": "Crowley Capital",
  "status": "draft"
}
```

## Environment Variables

Add to your `.env` file:

```env
# Backend API URL (when you set up your backend)
VITE_API_URL=http://localhost:3000/api

# Database connection (for backend server only)
DATABASE_URL=postgresql://username:password@localhost:5432/crowley_capital
```

## Example Backend Implementation (Node.js/Express)

```javascript
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(cors());
app.use(express.json());

// GET /api/settings
app.get('/api/settings', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM articles_settings ORDER BY id DESC LIMIT 1'
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error loading settings:', error);
    res.status(500).json({ error: 'Failed to load settings' });
  }
});

// PUT /api/settings
app.put('/api/settings', async (req, res) => {
  const { topics, schedule, auto, model } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO articles_settings (topics, schedule, auto, model)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE
       SET topics = $1, schedule = $2, auto = $3, model = $4, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [topics, schedule, auto, model]
    );
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error saving settings:', error);
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

// POST /api/articles
app.post('/api/articles', async (req, res) => {
  const { title, description, article, url, meta_description, topic, author, publisher, status } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO articles 
       (title, description, article, url, meta_description, topic, author, publisher, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [title, description, article, url, meta_description, topic, author, publisher, status || 'draft']
    );
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ error: 'Failed to save article' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
```

## Testing the Integration

1. **Set up PostgreSQL database:**
   ```bash
   psql -U postgres -d crowley_capital -f database/schema.sql
   ```

2. **Start your backend API server:**
   ```bash
   node server.js
   ```

3. **Update `.env` file:**
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Restart the frontend dev server:**
   ```bash
   npm run dev
   ```

5. **Test in Admin Dashboard:**
   - Go to `/admin`
   - Change some settings
   - Click "Save Settings"
   - Refresh the page - settings should persist!

## Current Behavior (Without Backend)

✅ **What Works:**
- All settings are saved to browser localStorage
- Settings persist across page refreshes (same browser)
- Full admin UI functionality
- AI article generation (preview only)

❌ **What Doesn't Work:**
- Settings not shared across browsers/devices
- Articles not saved to database
- No scheduled article generation

## Next Steps

1. Create a backend API server (Node.js/Express recommended)
2. Set up PostgreSQL database connection
3. Implement the 3 API endpoints above
4. Update `VITE_API_URL` in `.env`
5. Test the integration

The frontend is **fully ready** and will automatically switch from localStorage to API when you configure `VITE_API_URL`!
