import api from "./config";
import type { Page } from "../types";

export const pagesAPI = {
  getAll: async (params?: {
    status?: string;
    language?: string;
  }): Promise<{ pages: Page[] }> => {
    const response = await api.get("/api/pages", { params });
    return response.data;
  },

  getBySlug: async (slug: string): Promise<{ page: Page }> => {
    const response = await api.get(`/api/pages/${slug}`);
    return response.data;
  },

  create: async (data: Partial<Page>) => {
    const response = await api.post("/api/pages", data);
    return response.data;
  },

  update: async (id: string | number, data: Partial<Page>) => {
    const response = await api.put(`/api/pages/${id}`, data);
    return response.data;
  },

  delete: async (id: string | number) => {
    const response = await api.delete(`/api/pages/${id}`);
    return response.data;
  },
};
