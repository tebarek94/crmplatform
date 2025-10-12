import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../types';
import { createSlug, paginate } from '../utils/helpers';
import { RowDataPacket } from 'mysql2';

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
      query += ' AND a.status = ?';
      params.push(status);
    } else {
      query += ' AND a.status = "published"';
    }

    if (category) {
      query += ' AND c.slug = ?';
      params.push(category);
    }

    if (language) {
      query += ' AND a.language = ?';
      params.push(language);
    }

    if (search) {
      query += ' AND (a.title LIKE ? OR a.content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY a.created_at DESC LIMIT ? OFFSET ?';
    params.push(limitValue, offset);

    const [articles] = await pool.query<RowDataPacket[]>(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM articles a WHERE 1=1';
    const countParams: any[] = [];

    if (status) {
      countQuery += ' AND a.status = ?';
      countParams.push(status);
    } else {
      countQuery += ' AND a.status = "published"';
    }

    const [countResult] = await pool.query<RowDataPacket[]>(countQuery, countParams);
    const total = countResult[0].total;

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

    const [articles] = await pool.query<RowDataPacket[]>(
      `SELECT a.*, c.name as category_name, u.username as author_name
       FROM articles a
       LEFT JOIN categories c ON a.category_id = c.id
       LEFT JOIN users u ON a.author_id = u.id
       WHERE a.id = ? OR a.slug = ?`,
      [id, id]
    );

    if (articles.length === 0) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    // Increment views
    await pool.query('UPDATE articles SET views = views + 1 WHERE id = ?', [
      articles[0].id
    ]);

    res.json({ article: articles[0] });
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

    const slug = createSlug(title);

    // Check if slug exists
    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM articles WHERE slug = ?',
      [slug]
    );

    let finalSlug = slug;
    if (existing.length > 0) {
      finalSlug = `${slug}-${Date.now()}`;
    }

    const [result] = await pool.query(
      `INSERT INTO articles (title, slug, content, excerpt, featured_image, category_id, author_id, language, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
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

    const articleId = (result as any).insertId;

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
    const [articles] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM articles WHERE id = ?',
      [id]
    );

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

    let slug = article.slug;
    if (title && title !== article.title) {
      slug = createSlug(title);
    }

    await pool.query(
      `UPDATE articles 
       SET title = ?, slug = ?, content = ?, excerpt = ?, featured_image = ?, 
           category_id = ?, language = ?, status = ?,
           published_at = CASE WHEN status = 'published' AND published_at IS NULL THEN NOW() ELSE published_at END
       WHERE id = ?`,
      [
        title || article.title,
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
    const [articles] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM articles WHERE id = ?',
      [id]
    );

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

    await pool.query('DELETE FROM articles WHERE id = ?', [id]);

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
};

