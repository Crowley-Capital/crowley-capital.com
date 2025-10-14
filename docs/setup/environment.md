# Crowley Capital Blog System - Setup Instructions

This guide will help you set up the PostgreSQL-powered blog system with AI content generation.

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **PostgreSQL** (v12 or higher)
3. **OpenAI API Key** (for AI content generation)

## 🚀 Installation Steps

### 1. Install Dependencies

First, install the required npm packages:

```bash
npm install pg @types/pg bcrypt @types/bcrypt jsonwebtoken @types/jsonwebtoken openai axios
```

These packages include:
- `pg`: PostgreSQL client for Node.js
- `bcrypt`: Password hashing
- `jsonwebtoken`: JWT authentication
- `openai`: OpenAI API client for AI generation
- `axios`: HTTP client

### 2. Set Up PostgreSQL Database

#### Create the database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE crowley_capital;

# Exit
\q
```

#### Run the schema:
```bash
psql -U postgres -d crowley_capital -f database/schema.sql
```

#### (Optional) Add seed data:
```bash
psql -U postgres -d crowley_capital -f database/seed.sql
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp env.example .env
```

Update the `.env` file with your credentials:

```env
# Database
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/crowley_capital
VITE_DATABASE_URL=postgresql://postgres:your_password@localhost:5432/crowley_capital

# OpenAI (for AI article generation)
OPENAI_API_KEY=sk-your-openai-api-key-here
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this
SESSION_SECRET=your-super-secret-session-key-change-this

# Admin
ADMIN_EMAIL=admin@crowleycapital.com
ADMIN_PASSWORD=ChangeThisPassword123!
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 📁 Project Structure

```
crowley-capital.com/
├── database/
│   ├── schema.sql          # PostgreSQL schema
│   ├── seed.sql            # Sample data
│   └── README.md           # Database documentation
├── src/
│   ├── config/
│   │   └── aiPrompts.ts    # AI prompt configuration (EDIT THIS!)
│   ├── lib/
│   │   ├── database.ts     # Database connection
│   │   └── api/
│   │       └── articles.ts # Article CRUD operations
│   ├── pages/
│   │   ├── Articles.tsx    # Public articles page
│   │   └── ArticleDetail.tsx
│   └── components/
│       └── admin/          # Admin dashboard (to be created)
└── env.example             # Environment variables template
```

## 🎨 Key Features

### 1. AI-Powered Content Generation
- **Location**: `src/config/aiPrompts.ts`
- **Customize**: Edit prompts to change tone, style, and focus
- **Topics**: Configure in database `article_generation_settings` table

### 2. Admin Dashboard
Access at `/admin` (to be implemented):
- Create, edit, and delete articles
- Generate articles with AI
- Schedule automatic generation
- Manage topics and settings
- Preview before publishing

### 3. Article Management
- Draft and published states
- Featured articles
- Categories and tags
- Full-text search
- SEO-friendly slugs

## 🤖 AI Configuration

### Editing AI Prompts

Open `src/config/aiPrompts.ts` and modify:

```typescript
export const AI_PROMPTS = {
  GENERATE_ARTICLE: `Your custom prompt here...`,
  // ... other prompts
};
```

### Configuring Generation Settings

Update in database:

```sql
UPDATE article_generation_settings 
SET setting_value = '{"frequency": "daily", "day": "monday", "time": "09:00"}'::jsonb
WHERE setting_key = 'generation_frequency';
```

Or use the admin dashboard (once implemented).

## 📊 Database Management

### View all articles:
```sql
SELECT * FROM articles ORDER BY created_at DESC;
```

### Get statistics:
```sql
SELECT * FROM article_statistics;
```

### Search articles:
```sql
SELECT * FROM search_articles('startup strategy');
```

### Update AI settings:
```sql
SELECT * FROM article_generation_settings;
```

## 🔐 Security Notes

1. **Change default passwords** immediately
2. **Use strong JWT secrets** in production
3. **Enable SSL** for database connections in production
4. **Keep API keys** secure and never commit to git
5. **Regularly backup** your database

## 🚧 Next Steps

1. **Implement Admin Dashboard** (`/admin` route)
2. **Add Authentication** (JWT-based)
3. **Create AI Generation Service** (background job)
4. **Add Image Upload** functionality
5. **Implement Email Notifications** for new articles
6. **Add Analytics** tracking

## 📝 Usage

### Creating an Article Manually

```typescript
import { createArticle } from '@/lib/api/articles';

const article = await createArticle({
  title: "Your Article Title",
  slug: "your-article-title",
  excerpt: "Brief description...",
  content: "<p>Full HTML content...</p>",
  category: "Strategy",
  tags: ["startup", "strategy"],
  published: true,
  featured: false,
});
```

### Generating with AI

```typescript
import { AI_PROMPTS, fillPromptTemplate } from '@/config/aiPrompts';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const prompt = fillPromptTemplate(AI_PROMPTS.GENERATE_ARTICLE, {
  topic: "Startup Strategy",
  focus: "Product-Market Fit",
  context: "For early-stage founders"
});

const response = await openai.chat.completions.create({
  model: "gpt-4-turbo-preview",
  messages: [{ role: "user", content: prompt }],
});
```

## 🆘 Troubleshooting

### Database connection issues:
- Check PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in `.env`
- Check firewall settings

### AI generation not working:
- Verify OPENAI_API_KEY is set
- Check API key has sufficient credits
- Review error logs

### Articles not displaying:
- Ensure articles are marked as `published = true`
- Check database connection
- Verify API endpoints are working

## 📚 Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)

## 🤝 Support

For issues or questions, contact the development team or refer to the project documentation.
