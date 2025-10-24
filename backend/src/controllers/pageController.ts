import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../types';
import { createSlug } from '../utils/helpers';

export const getAllPages = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const status = req.query.status as string;
    const language = req.query.language as string;

    let query = 'SELECT * FROM pages WHERE 1=1';
    const params: any[] = [];

    if (status) {
      query += ' AND status = $' + (params.length + 1);
      params.push(status);
    } else {
      query += ' AND status = \'published\'';
    }

    if (language) {
      query += ' AND language = $' + (params.length + 1);
      params.push(language);
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    const pages = result.rows;

    res.json({ pages });
  } catch (error) {
    console.error('Get pages error:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
};

export const getPageBySlug = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { slug } = req.params;

    const result = await pool.query(
      'SELECT * FROM pages WHERE slug = $1',
      [slug]
    );
    const pages = result.rows;

    if (pages.length === 0) {
      res.status(404).json({ error: 'Page not found' });
      return;
    }

    res.json({ page: pages[0] });
  } catch (error) {
    console.error('Get page error:', error);
    res.status(500).json({ error: 'Failed to fetch page' });
  }
};

export const createPage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, content, language, status } = req.body;

    const slug = createSlug(title);

    // Check if slug exists
    const result = await pool.query(
      'SELECT id FROM pages WHERE slug = $1',
      [slug]
    );
    const existing = result.rows;

    let finalSlug = slug;
    if (existing.length > 0) {
      finalSlug = `${slug}-${Date.now()}`;
    }

    const insertResult = await pool.query(
      'INSERT INTO pages (title, slug, content, language, status) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [title, finalSlug, content, language || 'en', status || 'draft']
    );

    const pageId = insertResult.rows[0].id;

    res.status(201).json({
      message: 'Page created successfully',
      pageId
    });
  } catch (error) {
    console.error('Create page error:', error);
    res.status(500).json({ error: 'Failed to create page' });
  }
};

export const updatePage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, language, status } = req.body;

    const result = await pool.query(
      'SELECT * FROM pages WHERE id = $1',
      [id]
    );
    const pages = result.rows;

    if (pages.length === 0) {
      res.status(404).json({ error: 'Page not found' });
      return;
    }

    const page = pages[0];
    let slug = page.slug;

    if (title && title !== page.title) {
      slug = createSlug(title);
    }

    await pool.query(
      'UPDATE pages SET title = $1, slug = $2, content = $3, language = $4, status = $5 WHERE id = $6',
      [
        title || page.title,
        slug,
        content || page.content,
        language || page.language,
        status || page.status,
        id
      ]
    );

    res.json({ message: 'Page updated successfully' });
  } catch (error) {
    console.error('Update page error:', error);
    res.status(500).json({ error: 'Failed to update page' });
  }
};

export const deletePage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM pages WHERE id = $1',
      [id]
    );
    const pages = result.rows;

    if (pages.length === 0) {
      res.status(404).json({ error: 'Page not found' });
      return;
    }

    await pool.query('DELETE FROM pages WHERE id = $1', [id]);

    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Delete page error:', error);
    res.status(500).json({ error: 'Failed to delete page' });
  }
};

