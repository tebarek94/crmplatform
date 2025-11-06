import api from "./config";
import type { Comment } from "../types";

export interface CreateCommentData {
  article_id: number;
  author_name: string;
  author_email?: string;
  content: string;
}

export const commentsAPI = {
  getAll: async (status?: string): Promise<{ comments: Comment[] }> => {
    const url = status ? `/api/comments?status=${status}` : "/api/comments";
    const response = await api.get(url);
    return response.data;
  },

  getByArticle: async (articleId: number): Promise<{ comments: Comment[] }> => {
    const response = await api.get(`/api/comments/article/${articleId}`);
    return response.data;
  },

  create: async (data: CreateCommentData): Promise<{ comment: Comment }> => {
    const response = await api.post("/api/comments", data);
    return response.data;
  },

  update: async (id: number, data: Partial<Comment>) => {
    const response = await api.put(`/api/comments/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/api/comments/${id}`);
    return response.data;
  },

  approve: async (id: number) => {
    const response = await api.patch(`/api/comments/${id}/approve`);
    return response.data;
  },

  reject: async (id: number) => {
    const response = await api.patch(`/api/comments/${id}/reject`);
    return response.data;
  },
};
