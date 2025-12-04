import apiClient from "../api-client";
import {
  ProductVariant,
  CreateProductVariantDto,
  UpdateProductVariantDto,
} from "@/types";

export const productVariantsApi = {
  getAll: async (): Promise<ProductVariant[]> => {
    const { data } = await apiClient.get<ProductVariant[]>("/product-variants");
    return data;
  },

  getById: async (id: number): Promise<ProductVariant> => {
    const { data } = await apiClient.get<ProductVariant>(
      `/product-variants/${id}`
    );
    return data;
  },

  getByProduct: async (productId: number): Promise<ProductVariant[]> => {
    const { data } = await apiClient.get<ProductVariant[]>(
      `/product-variants/product/${productId}`
    );
    return data;
  },

  create: async (variant: CreateProductVariantDto): Promise<ProductVariant> => {
    const { data } = await apiClient.post<ProductVariant>(
      "/product-variants",
      variant
    );
    return data;
  },

  update: async (
    id: number,
    variant: UpdateProductVariantDto
  ): Promise<ProductVariant> => {
    const { data } = await apiClient.put<ProductVariant>(
      `/product-variants/${id}`,
      variant
    );
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/product-variants/${id}`);
  },
};
