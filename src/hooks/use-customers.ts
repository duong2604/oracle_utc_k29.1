import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customersApi } from "@/lib/api/customers";
import { CreateCustomerDto, UpdateCustomerDto } from "@/types";
import { toast } from "sonner";

export const useCustomers = () => {
  const queryClient = useQueryClient();

  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: customersApi.getAll,
  });

  const createCustomerMutation = useMutation({
    mutationFn: (data: CreateCustomerDto) => customersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer created successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create customer"
      );
    },
  });

  const updateCustomerMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCustomerDto }) =>
      customersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update customer"
      );
    },
  });

  const deleteCustomerMutation = useMutation({
    mutationFn: (id: number) => customersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete customer"
      );
    },
  });

  return {
    customers: customersQuery.data ?? [],
    isLoading: customersQuery.isLoading,
    isError: customersQuery.isError,
    error: customersQuery.error,
    createCustomer: createCustomerMutation.mutate,
    updateCustomer: updateCustomerMutation.mutate,
    deleteCustomer: deleteCustomerMutation.mutate,
    isCreating: createCustomerMutation.isPending,
    isUpdating: updateCustomerMutation.isPending,
    isDeleting: deleteCustomerMutation.isPending,
  };
};

export const useCustomer = (id: number) => {
  return useQuery({
    queryKey: ["customers", id],
    queryFn: () => customersApi.getById(id),
    enabled: !!id,
  });
};
