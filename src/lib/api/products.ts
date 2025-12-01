import apiClient from "../api-client";
import { Product, CreateProductDto, UpdateProductDto } from "@/types";

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const { data } = await apiClient.get<Product[]>("/products");
    return data;
  },

  getById: async (id: number): Promise<Product> => {
    const { data } = await apiClient.get<Product>(`/products/${id}`);
    return data;
  },

  getByCategory: async (categoryId: number): Promise<Product[]> => {
    const { data } = await apiClient.get<Product[]>(
      `/products/category/${categoryId}`
    );
    return data;
  },

  create: async (product: CreateProductDto): Promise<Product> => {
    const { data } = await apiClient.post<Product>("/products", product);
    return data;
  },

  update: async (id: number, product: UpdateProductDto): Promise<Product> => {
    const { data } = await apiClient.put<Product>(`/products/${id}`, product);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};
