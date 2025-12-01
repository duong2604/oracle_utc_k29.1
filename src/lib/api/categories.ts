import apiClient from "../api-client";
import { Category, CreateCategoryDto, UpdateCategoryDto } from "@/types";

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>("/categories");
    return data;
  },

  getById: async (id: number): Promise<Category> => {
    const { data } = await apiClient.get<Category>(`/categories/${id}`);
    return data;
  },

  create: async (category: CreateCategoryDto): Promise<Category> => {
    const { data } = await apiClient.post<Category>("/categories", category);
    return data;
  },

  update: async (
    id: number,
    category: UpdateCategoryDto
  ): Promise<Category> => {
    const { data } = await apiClient.put<Category>(
      `/categories/${id}`,
      category
    );
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  },
};
