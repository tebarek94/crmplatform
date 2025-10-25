import api from './config';
import type { Page } from '../types';

export const pagesAPI = {
  getAll: async (params?: { status?: string; language?: string }): Promise<{ pages: Page[] }> => {
    const response = await api.get('/pages', { params });
    return response.data;
  },

  getBySlug: async (slug: string): Promise<{ page: Page }> => {
    const response = await api.get(`/pages/${slug}`);
    return response.data;
  },

  create: async (data: Partial<Page>) => {
    const response = await api.post('/pages', data);
    return response.data;
  },

  update: async (id: string | number, data: Partial<Page>) => {
    const response = await api.put(`/pages/${id}`, data);
    return response.data;
  },

  delete: async (id: string | number) => {
    const response = await api.delete(`/pages/${id}`);
    return response.data;
  },
};

