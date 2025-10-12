import { Request } from 'express';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'author';
  created_at: Date;
  updated_at: Date;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  category_id: number;
  author_id: number;
  language: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  created_at: Date;
  updated_at: Date;
  published_at?: Date;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  created_at: Date;
  updated_at: Date;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  language: string;
  status: 'draft' | 'published';
  created_at: Date;
  updated_at: Date;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  created_at: Date;
}

export interface Comment {
  id: number;
  article_id: number;
  author_name: string;
  author_email: string;
  content: string;
  status: 'pending' | 'approved' | 'spam';
  created_at: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}

export interface JWTPayload {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

