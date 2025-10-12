import api from './config';
import type { Article } from '../types';

export const articlesAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    language?: string;
    search?: string;
  }) => {
    const response = await api.get('/articles', { params });
    return response.data;
  },

  getById: async (id: string | number): Promise<{ article: Article }> => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  },

  create: async (data: Partial<Article>) => {
    const response = await api.post('/articles', data);
    return response.data;
  },

  update: async (id: string | number, data: Partial<Article>) => {
    const response = await api.put(`/articles/${id}`, data);
    return response.data;
  },

  delete: async (id: string | number) => {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  },
};

