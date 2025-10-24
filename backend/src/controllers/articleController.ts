import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../types';
import { createSlug, paginate } from '../utils/helpers';

export const getAllArticles = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const category = req.query.category as string;
    const language = req.query.language as string;
    const search = req.query.search as string;

    const { limit: limitValue, offset } = paginate(page, limit);

    let query = `
      SELECT a.*, c.name as category_name, u.username as author_name
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      LEFT JOIN users u ON a.author_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status) {
      query += ' AND a.status = $' + (params.length + 1);
      params.push(status);
    } else {
      query += ' AND a.status = $' + (params.length + 1);
      params.push('published');
    }

    if (category) {
      query += ' AND c.slug = $' + (params.length + 1);
      params.push(category);
    }

    if (language) {
      query += ' AND a.language = $' + (params.length + 1);
      params.push(language);
    }

    if (search) {
      query += ' AND (a.title ILIKE $' + (params.length + 1) + ' OR a.content ILIKE $' + (params.length + 2) + ')';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY a.created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limitValue, offset);

    const result = await pool.query(query, params);
    const articles = result.rows;

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM articles a WHERE 1=1';
    const countParams: any[] = [];

    if (status) {
      countQuery += ' AND a.status = $' + (countParams.length + 1);
      countParams.push(status);
    } else {
      countQuery += ' AND a.status = $' + (countParams.length + 1);
      countParams.push('published');
    }

    if (category) {
      countQuery += ' AND c.slug = $' + (countParams.length + 1);
      countParams.push(category);
    }

    if (language) {
      countQuery += ' AND a.language = $' + (countParams.length + 1);
      countParams.push(language);
    }

    if (search) {
      countQuery += ' AND (a.title ILIKE $' + (countParams.length + 1) + ' OR a.content ILIKE $' + (countParams.length + 2) + ')';
      countParams.push(`%${search}%`, `%${search}%`);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = countResult.rows[0].total;

    res.json({
      articles,
      pagination: {
        page,
        limit: limitValue,
        total,
        totalPages: Math.ceil(total / limitValue)
      }
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
};

export const getArticleById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Check if id is a number (integer) or a slug (string)
    const isNumeric = /^\d+$/.test(id);
    
    let query, params;
    if (isNumeric) {
      // If it's a number, search by ID
      query = `SELECT a.*, c.name as category_name, u.username as author_name
               FROM articles a
               LEFT JOIN categories c ON a.category_id = c.id
               LEFT JOIN users u ON a.author_id = u.id
               WHERE a.id = $1`;
      params = [parseInt(id)];
    } else {
      // If it's not a number, search by slug
      query = `SELECT a.*, c.name as category_name, u.username as author_name
               FROM articles a
               LEFT JOIN categories c ON a.category_id = c.id
               LEFT JOIN users u ON a.author_id = u.id
               WHERE a.slug = $1`;
      params = [id];
    }

    const result = await pool.query(query, params);
    const articles = result.rows;

    if (articles.length === 0) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    const article = articles[0] as any;

    // Increment view count
    await pool.query(
      'UPDATE articles SET views = views + 1 WHERE id = $1',
      [article.id]
    );

    res.json({ article });
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
};

export const createArticle = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      content,
      excerpt,
      category_id,
      language,
      status,
      featured_image
    } = req.body;
    const author_id = req.user!.id;

    // Truncate title if too long (max 255 characters)
    const truncatedTitle = title.length > 255 ? title.substring(0, 252) + '...' : title;
    const slug = createSlug(truncatedTitle);

    // Check if slug exists
    const result = await pool.query(
      'SELECT id FROM articles WHERE slug = $1',
      [slug]
    );
    const existing = result.rows;

    let finalSlug = slug;
    if (existing.length > 0) {
      finalSlug = `${slug}-${Date.now()}`;
    }
    
    // Ensure slug doesn't exceed 255 characters
    if (finalSlug.length > 255) {
      finalSlug = finalSlug.substring(0, 255);
    }
    
    // No need to truncate featured_image anymore - TEXT field can handle long URLs/base64

    const insertResult = await pool.query(
      `INSERT INTO articles (title, slug, content, excerpt, featured_image, category_id, author_id, language, status, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      [
        truncatedTitle,
        finalSlug,
        content,
        excerpt,
        featured_image,
        category_id,
        author_id,
        language || 'en',
        status || 'draft',
        status === 'published' ? new Date() : null
      ]
    );

    const articleId = insertResult.rows[0].id;

    res.status(201).json({
      message: 'Article created successfully',
      articleId
    });
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
};

export const updateArticle = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      excerpt,
      category_id,
      language,
      status,
      featured_image
    } = req.body;

    // Check if article exists
    const result = await pool.query(
      'SELECT * FROM articles WHERE id = $1',
      [id]
    );
    const articles = result.rows;

    if (articles.length === 0) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    // Check permissions
    const article = articles[0];
    if (
      req.user!.role !== 'admin' &&
      req.user!.role !== 'editor' &&
      article.author_id !== req.user!.id
    ) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }

    // Truncate title if too long (max 255 characters)
    const truncatedTitle = title && title.length > 255 ? title.substring(0, 252) + '...' : title;
    
    let slug = article.slug;
    if (truncatedTitle && truncatedTitle !== article.title) {
      slug = createSlug(truncatedTitle);
    }
    
    // Ensure slug doesn't exceed 255 characters
    if (slug.length > 255) {
      slug = slug.substring(0, 255);
    }
    
    // No need to truncate featured_image anymore - TEXT field can handle long URLs/base64

    await pool.query(
      `UPDATE articles 
       SET title = $1, slug = $2, content = $3, excerpt = $4, featured_image = $5, 
           category_id = $6, language = $7, status = $8,
           published_at = CASE WHEN status = 'published' AND published_at IS NULL THEN NOW() ELSE published_at END
       WHERE id = $9`,
      [
        truncatedTitle || article.title,
        slug,
        content || article.content,
        excerpt || article.excerpt,
        featured_image || article.featured_image,
        category_id || article.category_id,
        language || article.language,
        status || article.status,
        id
      ]
    );

    res.json({ message: 'Article updated successfully' });
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
};

export const deleteArticle = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if article exists
    const result = await pool.query(
      'SELECT * FROM articles WHERE id = $1',
      [id]
    );
    const articles = result.rows;

    if (articles.length === 0) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    // Check permissions
    const article = articles[0];
    if (
      req.user!.role !== 'admin' &&
      article.author_id !== req.user!.id
    ) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }

    await pool.query('DELETE FROM articles WHERE id = $1', [id]);

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
};

