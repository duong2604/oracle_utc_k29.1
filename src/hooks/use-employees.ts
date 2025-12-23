import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { employeesApi } from "@/lib/api/employees";
import { CreateEmployeeDto, UpdateEmployeeDto } from "@/types";
import { toast } from "sonner";

export const useEmployees = () => {
  const queryClient = useQueryClient();

  const employeesQuery = useQuery({
    queryKey: ["employees"],
    queryFn: employeesApi.getAll,
  });

  const createEmployeeMutation = useMutation({
    mutationFn: (data: CreateEmployeeDto) => employeesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee created successfully");
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "Operation failed"
      );
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEmployeeDto }) =>
      employeesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee updated successfully");
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "Operation failed"
      );
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: (id: number) => employeesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee deleted successfully");
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "Operation failed"
      );
    },
  });

  return {
    employees: employeesQuery.data ?? [],
    isLoading: employeesQuery.isLoading,
    isError: employeesQuery.isError,
    error: employeesQuery.error,
    createEmployee: createEmployeeMutation.mutate,
    updateEmployee: updateEmployeeMutation.mutate,
    deleteEmployee: deleteEmployeeMutation.mutate,
    isCreating: createEmployeeMutation.isPending,
    isUpdating: updateEmployeeMutation.isPending,
    isDeleting: deleteEmployeeMutation.isPending,
  };
};

export const useEmployee = (id: number) => {
  return useQuery({
    queryKey: ["employees", id],
    queryFn: () => employeesApi.getById(id),
    enabled: !!id,
  });
};
