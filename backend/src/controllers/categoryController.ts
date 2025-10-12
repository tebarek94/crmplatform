import { Request, Response } from 'express';
import pool from '../config/database';
import { createSlug } from '../utils/helpers';
import { RowDataPacket } from 'mysql2';
import { AuthRequest } from '../types';

export const getAllCategories = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const [categories] = await pool.query<RowDataPacket[]>(
      `SELECT c.*, COUNT(a.id) as article_count
       FROM categories c
       LEFT JOIN articles a ON c.id = a.category_id AND a.status = 'published'
       GROUP BY c.id
       ORDER BY c.name ASC`
    );

    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const [categories] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM categories WHERE id = ? OR slug = ?',
      [id, id]
    );

    if (categories.length === 0) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json({ category: categories[0] });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

export const createCategory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, description, parent_id } = req.body;

    const slug = createSlug(name);

    // Check if slug exists
    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM categories WHERE slug = ?',
      [slug]
    );

    if (existing.length > 0) {
      res.status(400).json({ error: 'Category with this name already exists' });
      return;
    }

    const [result] = await pool.query(
      'INSERT INTO categories (name, slug, description, parent_id) VALUES (?, ?, ?, ?)',
      [name, slug, description, parent_id || null]
    );

    const categoryId = (result as any).insertId;

    res.status(201).json({
      message: 'Category created successfully',
      categoryId
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
};

export const updateCategory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, parent_id } = req.body;

    const [categories] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    if (categories.length === 0) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    let slug = categories[0].slug;
    if (name && name !== categories[0].name) {
      slug = createSlug(name);
    }

    await pool.query(
      'UPDATE categories SET name = ?, slug = ?, description = ?, parent_id = ? WHERE id = ?',
      [
        name || categories[0].name,
        slug,
        description !== undefined ? description : categories[0].description,
        parent_id !== undefined ? parent_id : categories[0].parent_id,
        id
      ]
    );

    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
};

export const deleteCategory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if category exists
    const [categories] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    if (categories.length === 0) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    await pool.query('DELETE FROM categories WHERE id = ?', [id]);

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

