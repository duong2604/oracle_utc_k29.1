import apiClient from "../api-client";
import { Order, CreateOrderDto, UpdateOrderDto } from "@/types";

export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    const { data } = await apiClient.get<Order[]>("/orders");
    return data;
  },

  getById: async (id: number): Promise<Order> => {
    const { data } = await apiClient.get<Order>(`/orders/${id}`);
    return data;
  },

  create: async (order: CreateOrderDto): Promise<Order> => {
    const { data } = await apiClient.post<Order>("/orders", order);
    return data;
  },

  update: async (id: number, order: UpdateOrderDto): Promise<Order> => {
    const { data } = await apiClient.put<Order>(`/orders/${id}`, order);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/orders/${id}`);
  },
};
