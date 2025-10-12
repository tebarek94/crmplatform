import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../types';
import { createSlug } from '../utils/helpers';
import { RowDataPacket } from 'mysql2';

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
      query += ' AND status = ?';
      params.push(status);
    } else {
      query += ' AND status = "published"';
    }

    if (language) {
      query += ' AND language = ?';
      params.push(language);
    }

    query += ' ORDER BY created_at DESC';

    const [pages] = await pool.query<RowDataPacket[]>(query, params);

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

    const [pages] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM pages WHERE slug = ?',
      [slug]
    );

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
    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM pages WHERE slug = ?',
      [slug]
    );

    let finalSlug = slug;
    if (existing.length > 0) {
      finalSlug = `${slug}-${Date.now()}`;
    }

    const [result] = await pool.query(
      'INSERT INTO pages (title, slug, content, language, status) VALUES (?, ?, ?, ?, ?)',
      [title, finalSlug, content, language || 'en', status || 'draft']
    );

    const pageId = (result as any).insertId;

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

    const [pages] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM pages WHERE id = ?',
      [id]
    );

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
      'UPDATE pages SET title = ?, slug = ?, content = ?, language = ?, status = ? WHERE id = ?',
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

    const [pages] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM pages WHERE id = ?',
      [id]
    );

    if (pages.length === 0) {
      res.status(404).json({ error: 'Page not found' });
      return;
    }

    await pool.query('DELETE FROM pages WHERE id = ?', [id]);

    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Delete page error:', error);
    res.status(500).json({ error: 'Failed to delete page' });
  }
};

