import { Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

interface Comment {
  id: number;
  article_id: number;
  author_name: string;
  author_email: string;
  content: string;
  status: 'pending' | 'approved' | 'spam';
  created_at: string;
}

export const getCommentsByArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { articleId } = req.params;

    const [comments] = await pool.query<RowDataPacket[]>(
      `SELECT id, article_id, author_name, author_email, content, status, created_at 
       FROM comments 
       WHERE article_id = ? AND status IN ('approved', 'pending')
       ORDER BY created_at DESC`,
      [articleId]
    );

    res.json({ comments });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { article_id, author_name, author_email, content } = req.body;

    // Basic validation
    if (!article_id || !author_name || !content) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Check if article exists
    const [articles] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM articles WHERE id = ? AND status = "published"',
      [article_id]
    );

    if (articles.length === 0) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    // Create comment
    const [result] = await pool.query(
      'INSERT INTO comments (article_id, author_name, author_email, content, status) VALUES (?, ?, ?, ?, ?)',
      [article_id, author_name, author_email || null, content, 'pending']
    );

    const commentId = (result as any).insertId;

    res.status(201).json({
      message: 'Comment submitted successfully. It will be reviewed before being published.',
      comment: {
        id: commentId,
        article_id,
        author_name,
        author_email,
        content,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

export const updateComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const [result] = await pool.query(
      'UPDATE comments SET content = ? WHERE id = ?',
      [content, id]
    );

    if ((result as any).affectedRows === 0) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    res.json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM comments WHERE id = ?',
      [id]
    );

    if ((result as any).affectedRows === 0) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

export const approveComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'UPDATE comments SET status = "approved" WHERE id = ?',
      [id]
    );

    if ((result as any).affectedRows === 0) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    res.json({ message: 'Comment approved successfully' });
  } catch (error) {
    console.error('Approve comment error:', error);
    res.status(500).json({ error: 'Failed to approve comment' });
  }
};

export const rejectComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'UPDATE comments SET status = "spam" WHERE id = ?',
      [id]
    );

    if ((result as any).affectedRows === 0) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    res.json({ message: 'Comment rejected successfully' });
  } catch (error) {
    console.error('Reject comment error:', error);
    res.status(500).json({ error: 'Failed to reject comment' });
  }
};

export const getAllComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.query;

    let query = `
      SELECT c.id, c.article_id, c.author_name, c.author_email, c.content, c.status, c.created_at,
             a.title as article_title
      FROM comments c
      LEFT JOIN articles a ON c.article_id = a.id
    `;

    const params: any[] = [];

    if (status) {
      query += ' WHERE c.status = ?';
      params.push(status);
    }

    query += ' ORDER BY c.created_at DESC';

    const [comments] = await pool.query<RowDataPacket[]>(query, params);

    res.json({ comments });
  } catch (error) {
    console.error('Get all comments error:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};
