import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@/lib/api/orders";
import { CreateOrderDto, UpdateOrderDto } from "@/types";
import { toast } from "sonner";

export const useOrders = () => {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: ordersApi.getAll,
  });

  const createOrderMutation = useMutation({
    mutationFn: (data: CreateOrderDto) => ordersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create order");
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateOrderDto }) =>
      ordersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update order");
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: (id: number) => ordersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete order");
    },
  });

  return {
    orders: ordersQuery.data ?? [],
    isLoading: ordersQuery.isLoading,
    isError: ordersQuery.isError,
    error: ordersQuery.error,
    createOrder: createOrderMutation.mutate,
    updateOrder: updateOrderMutation.mutate,
    deleteOrder: deleteOrderMutation.mutate,
    isCreating: createOrderMutation.isPending,
    isUpdating: updateOrderMutation.isPending,
    isDeleting: deleteOrderMutation.isPending,
  };
};

export const useOrder = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => ordersApi.getById(id),
    enabled: !!id,
  });
};
