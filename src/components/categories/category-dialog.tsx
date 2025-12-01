"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/hooks/use-categories";
import { Category, CreateCategoryDto } from "@/types";

interface CategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
}

export function CategoryDialog({
  isOpen,
  onClose,
  category,
}: CategoryDialogProps) {
  const { createCategory, updateCategory, isCreating, isUpdating } =
    useCategories();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCategoryDto>({
    defaultValues: category,
  });

  useEffect(() => {
    if (category) {
      reset(category);
    } else {
      reset({ categoryName: "", description: "" });
    }
  }, [category, reset]);

  const onSubmit = (data: CreateCategoryDto) => {
    if (category) {
      updateCategory(
        { id: category.categoryId, data },
        {
          onSuccess: () => {
            onClose();
            reset();
          },
        }
      );
    } else {
      createCategory(data, {
        onSuccess: () => {
          onClose();
          reset();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Create Category"}
          </DialogTitle>
          <DialogDescription>
            {category
              ? "Update the category information below."
              : "Add a new category to your system."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="categoryName" className="text-sm font-medium">
                Category Name *
              </Label>
              <Input
                id="categoryName"
                placeholder="e.g., Electronics, Clothing, Books..."
                className="placeholder:text-muted-foreground/60"
                {...register("categoryName", {
                  required: "Category name is required",
                })}
              />
              {errors.categoryName && (
                <p className="text-sm text-destructive">
                  {errors.categoryName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter a detailed description of this category..."
                className="placeholder:text-muted-foreground/60 resize-none"
                rows={4}
                {...register("description")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating
                ? "Saving..."
                : category
                ? "Update"
                : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
