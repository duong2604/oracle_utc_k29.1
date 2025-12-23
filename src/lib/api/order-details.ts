import apiClient from "../api-client";
import {
  OrderDetail,
  CreateOrderDetailDto,
  UpdateOrderDetailDto,
} from "@/types";

export const orderDetailsApi = {
  getAll: async (): Promise<OrderDetail[]> => {
    const { data } = await apiClient.get<OrderDetail[]>("/order-details");
    return data;
  },

  getById: async (id: number): Promise<OrderDetail> => {
    const { data } = await apiClient.get<OrderDetail>(`/order-details/${id}`);
    return data;
  },

  create: async (orderDetail: CreateOrderDetailDto): Promise<OrderDetail> => {
    const { data } = await apiClient.post<OrderDetail>(
      "/order-details",
      orderDetail
    );
    return data;
  },

  update: async (
    id: number,
    orderDetail: UpdateOrderDetailDto
  ): Promise<OrderDetail> => {
    const { data } = await apiClient.put<OrderDetail>(
      `/order-details/${id}`,
      orderDetail
    );
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/order-details/${id}`);
  },
};
