export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'author';
  created_at: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  category_id: number;
  category_name?: string;
  author_id: number;
  author_name?: string;
  language: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  article_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  language: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
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

export interface Comment {
  id: number;
  article_id: number;
  author_name: string;
  author_email: string;
  content: string;
  status: 'pending' | 'approved' | 'spam';
  created_at: string;
}

