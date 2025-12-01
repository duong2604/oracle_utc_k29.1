import apiClient from "../api-client";
import { Customer, CreateCustomerDto, UpdateCustomerDto } from "@/types";

export const customersApi = {
  getAll: async (): Promise<Customer[]> => {
    const { data } = await apiClient.get<Customer[]>("/customers");
    return data;
  },

  getById: async (id: number): Promise<Customer> => {
    const { data } = await apiClient.get<Customer>(`/customers/${id}`);
    return data;
  },

  create: async (customer: CreateCustomerDto): Promise<Customer> => {
    const { data } = await apiClient.post<Customer>("/customers", customer);
    return data;
  },

  update: async (
    id: number,
    customer: UpdateCustomerDto
  ): Promise<Customer> => {
    const { data } = await apiClient.put<Customer>(
      `/customers/${id}`,
      customer
    );
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/customers/${id}`);
  },
};
