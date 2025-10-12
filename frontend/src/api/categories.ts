import api from './config';
import type { Category } from '../types';

export const categoriesAPI = {
  getAll: async (): Promise<{ categories: Category[] }> => {
    const response = await api.get('/categories');
    return response.data;
  },

  getById: async (id: string | number): Promise<{ category: Category }> => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  create: async (data: Partial<Category>) => {
    const response = await api.post('/categories', data);
    return response.data;
  },

  update: async (id: string | number, data: Partial<Category>) => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },

  delete: async (id: string | number) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

