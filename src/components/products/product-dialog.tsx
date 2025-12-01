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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";
import { Product, CreateProductDto } from "@/types";

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

export function ProductDialog({
  isOpen,
  onClose,
  product,
}: ProductDialogProps) {
  const { createProduct, updateProduct, isCreating, isUpdating } =
    useProducts();
  const { categories } = useCategories();
  const {
    register,
    trigger,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProductDto>({
    defaultValues: product,
  });

  const categoryId = watch("categoryId");

  useEffect(() => {
    register("categoryId", {
      valueAsNumber: true,
      validate: (value) => value > 0 || "Category is required",
    });
  }, [register]);

  useEffect(() => {
    if (product) {
      reset(product);
    } else {
      reset({ productName: "", price: 0, quantity: 0, categoryId: 0 });
    }
  }, [product, reset]);

  const onSubmit = (data: CreateProductDto) => {
    // Ensure categoryId is a valid number
    const validatedData = {
      ...data,
      categoryId: parseInt(data.categoryId.toString()),
      price: parseFloat(data.price.toString()),
      quantity: parseInt(data.quantity.toString()),
    };

    console.log("📤 Submitting product data:", validatedData);

    if (product) {
      updateProduct(
        { id: product.productId, data: validatedData },
        {
          onSuccess: () => {
            console.log("✅ Product updated successfully");
            onClose();
            reset();
          },
        }
      );
    } else {
      createProduct(validatedData, {
        onSuccess: () => {
          console.log("✅ Product created successfully");
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
            {product ? "Edit Product" : "Create Product"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "Update the product information below."
              : "Add a new product to your inventory."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="productName" className="text-sm font-medium">
                Product Name *
              </Label>
              <Input
                id="productName"
                placeholder="e.g., Laptop Dell XPS 13, iPhone 15 Pro..."
                className="placeholder:text-muted-foreground/60"
                {...register("productName", {
                  required: "Product name is required",
                })}
              />
              {errors.productName && (
                <p className="text-sm text-destructive">
                  {errors.productName.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price" className="text-sm font-medium">
                  Price *
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="Enter price (e.g., 999.99)"
                  className="placeholder:text-muted-foreground/60"
                  {...register("price", {
                    valueAsNumber: true,
                    validate: (value) =>
                      value > 0 ||
                      "Price is required and must be greater than 0",
                  })}
                />
                {errors.price && (
                  <p className="text-sm text-destructive">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="quantity" className="text-sm font-medium">
                  Quantity *
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Available stock"
                  className="placeholder:text-muted-foreground/60"
                  {...register("quantity", {
                    valueAsNumber: true,
                    validate: (value) =>
                      value > 0 ||
                      "Quantity is required and must be at least 1",
                  })}
                />
                {errors.quantity && (
                  <p className="text-sm text-destructive">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="categoryId" className="text-sm font-medium">
                Category *
              </Label>
              <Select
                value={
                  categoryId && categoryId > 0 ? categoryId.toString() : ""
                }
                onValueChange={(value) => {
                  console.log("Category selected:", value);
                  setValue("categoryId", parseInt(value), {
                    shouldValidate: true,
                  });
                  trigger("categoryId");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder="Choose product category..."
                    className="text-muted-foreground/60"
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <SelectItem
                        key={category.categoryId}
                        value={category.categoryId.toString()}
                      >
                        {category.categoryName}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      No categories available. Create one first.
                    </div>
                  )}
                </SelectContent>
              </Select>
              {errors.categoryId && (
                <p className="text-sm text-destructive">
                  {errors.categoryId.message}
                </p>
              )}
              {categories.length === 0 && (
                <p className="text-xs text-amber-600">
                  ⚠️ Please create a category before adding products
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating
                ? "Saving..."
                : product
                ? "Update"
                : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
