import apiClient from "../api-client";
import { Employee, CreateEmployeeDto, UpdateEmployeeDto } from "@/types";

export const employeesApi = {
  getAll: async (): Promise<Employee[]> => {
    const { data } = await apiClient.get<Employee[]>("/employees");
    return data;
  },

  getById: async (id: number): Promise<Employee> => {
    const { data } = await apiClient.get<Employee>(`/employees/${id}`);
    return data;
  },

  create: async (employee: CreateEmployeeDto): Promise<Employee> => {
    const { data } = await apiClient.post<Employee>("/employees", employee);
    return data;
  },

  update: async (
    id: number,
    employee: UpdateEmployeeDto
  ): Promise<Employee> => {
    const { data } = await apiClient.put<Employee>(
      `/employees/${id}`,
      employee
    );
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/employees/${id}`);
  },
};
