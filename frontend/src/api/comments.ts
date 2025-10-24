import api from './config';
import type { Comment } from '../types';

export interface CreateCommentData {
  article_id: number;
  author_name: string;
  author_email?: string;
  content: string;
}

export const commentsAPI = {
  getAll: async (status?: string): Promise<{ comments: Comment[] }> => {
    const url = status ? `/comments?status=${status}` : '/comments';
    const response = await api.get(url);
    return response.data;
  },

  getByArticle: async (articleId: number): Promise<{ comments: Comment[] }> => {
    const response = await api.get(`/comments/article/${articleId}`);
    return response.data;
  },

  create: async (data: CreateCommentData): Promise<{ comment: Comment }> => {
    const response = await api.post('/comments', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Comment>) => {
    const response = await api.put(`/comments/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
  },

  approve: async (id: number) => {
    const response = await api.patch(`/comments/${id}/approve`);
    return response.data;
  },

  reject: async (id: number) => {
    const response = await api.patch(`/comments/${id}/reject`);
    return response.data;
  }
};
