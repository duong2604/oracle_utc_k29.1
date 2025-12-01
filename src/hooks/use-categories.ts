import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoriesApi } from "@/lib/api/categories";
import { CreateCategoryDto, UpdateCategoryDto } from "@/types";
import { toast } from "sonner";

export const useCategories = () => {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesApi.getAll,
  });

  const createCategoryMutation = useMutation({
    mutationFn: (data: CreateCategoryDto) => categoriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create category"
      );
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryDto }) =>
      categoriesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update category"
      );
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => categoriesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete category"
      );
    },
  });

  return {
    categories: categoriesQuery.data ?? [],
    isLoading: categoriesQuery.isLoading,
    isError: categoriesQuery.isError,
    error: categoriesQuery.error,
    createCategory: createCategoryMutation.mutate,
    updateCategory: updateCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
    isCreating: createCategoryMutation.isPending,
    isUpdating: updateCategoryMutation.isPending,
    isDeleting: deleteCategoryMutation.isPending,
  };
};

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  });
};
