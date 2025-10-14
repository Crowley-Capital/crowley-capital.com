/**
 * Article API Functions
 * 
 * This file contains all database operations for articles
 */

import { query } from '../database';

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: Date;
  updated_at: Date;
  read_time: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  image_url?: string;
  meta_description?: string;
  created_at: Date;
}

export interface ArticleInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author?: string;
  read_time?: string;
  category: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  image_url?: string;
  meta_description?: string;
}

/**
 * Get all published articles
 */
export const getPublishedArticles = async (): Promise<Article[]> => {
  const result = await query(
    `SELECT * FROM articles 
     WHERE published = true 
     ORDER BY published_at DESC`
  );
  return result.rows;
};

/**
 * Get all articles (including drafts) - for admin use
 */
export const getAllArticles = async (): Promise<Article[]> => {
  const result = await query(
    `SELECT * FROM articles 
     ORDER BY created_at DESC`
  );
  return result.rows;
};

/**
 * Get a single article by slug
 */
export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  const result = await query(
    `SELECT * FROM articles 
     WHERE slug = $1 AND published = true`,
    [slug]
  );
  return result.rows[0] || null;
};

/**
 * Get a single article by ID
 */
export const getArticleById = async (id: number): Promise<Article | null> => {
  const result = await query(
    `SELECT * FROM articles WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

/**
 * Get articles by category
 */
export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  const result = await query(
    `SELECT * FROM get_articles_by_category($1)`,
    [category]
  );
  return result.rows;
};

/**
 * Search articles
 */
export const searchArticles = async (searchTerm: string): Promise<Article[]> => {
  const result = await query(
    `SELECT * FROM search_articles($1)`,
    [searchTerm]
  );
  return result.rows;
};

/**
 * Get featured articles
 */
export const getFeaturedArticles = async (): Promise<Article[]> => {
  const result = await query(
    `SELECT * FROM articles 
     WHERE published = true AND featured = true 
     ORDER BY published_at DESC 
     LIMIT 3`
  );
  return result.rows;
};

/**
 * Create a new article
 */
export const createArticle = async (article: ArticleInput): Promise<Article> => {
  const result = await query(
    `INSERT INTO articles (
      title, slug, excerpt, content, author, read_time, 
      category, tags, featured, published, image_url, meta_description
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *`,
    [
      article.title,
      article.slug,
      article.excerpt,
      article.content,
      article.author || 'Jake Crowley',
      article.read_time || '5 min read',
      article.category,
      article.tags || [],
      article.featured || false,
      article.published || false,
      article.image_url,
      article.meta_description,
    ]
  );
  return result.rows[0];
};

/**
 * Update an existing article
 */
export const updateArticle = async (
  id: number,
  article: Partial<ArticleInput>
): Promise<Article> => {
  const fields: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  Object.entries(article).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }
  });

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  values.push(id);
  const result = await query(
    `UPDATE articles 
     SET ${fields.join(', ')} 
     WHERE id = $${paramCount}
     RETURNING *`,
    values
  );

  if (result.rows.length === 0) {
    throw new Error('Article not found');
  }

  return result.rows[0];
};

/**
 * Delete an article
 */
export const deleteArticle = async (id: number): Promise<boolean> => {
  const result = await query(
    `DELETE FROM articles WHERE id = $1 RETURNING id`,
    [id]
  );
  return result.rowCount > 0;
};

/**
 * Toggle article published status
 */
export const togglePublished = async (id: number): Promise<Article> => {
  const result = await query(
    `UPDATE articles 
     SET published = NOT published,
         published_at = CASE WHEN NOT published THEN CURRENT_TIMESTAMP ELSE published_at END
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  
  if (result.rows.length === 0) {
    throw new Error('Article not found');
  }
  
  return result.rows[0];
};

/**
 * Toggle article featured status
 */
export const toggleFeatured = async (id: number): Promise<Article> => {
  const result = await query(
    `UPDATE articles 
     SET featured = NOT featured
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  
  if (result.rows.length === 0) {
    throw new Error('Article not found');
  }
  
  return result.rows[0];
};

/**
 * Get article statistics
 */
export const getArticleStatistics = async () => {
  const result = await query(`SELECT * FROM article_statistics`);
  return result.rows[0];
};

/**
 * Get all unique categories
 */
export const getCategories = async (): Promise<string[]> => {
  const result = await query(
    `SELECT DISTINCT category FROM articles 
     WHERE published = true 
     ORDER BY category`
  );
  return result.rows.map(row => row.category);
};

/**
 * Get all unique tags
 */
export const getAllTags = async (): Promise<string[]> => {
  const result = await query(
    `SELECT DISTINCT unnest(tags) as tag FROM articles 
     WHERE published = true 
     ORDER BY tag`
  );
  return result.rows.map(row => row.tag);
};
