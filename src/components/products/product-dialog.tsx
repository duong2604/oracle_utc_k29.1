"use client";

import { useEffect, useState } from "react";
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
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

interface Variant {
  size?: string | null;
  color?: string | null;
  stock: number;
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

  const [variants, setVariants] = useState<Variant[]>([]);
  const [newVariant, setNewVariant] = useState<Variant>({
    size: "",
    color: "",
    stock: 0,
  });

  useEffect(() => {
    register("categoryId", {
      valueAsNumber: true,
      validate: (value) => value > 0 || "Category is required",
    });
  }, [register]);

  useEffect(() => {
    if (product) {
      reset(product);
      // Load existing variants if editing
      if (product.variants && product.variants.length > 0) {
        setVariants(
          product.variants.map((v) => ({
            size: v.size,
            color: v.color,
            stock: v.stock,
          }))
        );
      }
    } else {
      reset({ productName: "", price: 0, quantity: 0, categoryId: 0 });
      setVariants([]);
    }
  }, [product, reset]);

  const handleAddVariant = () => {
    if (newVariant.stock > 0) {
      setVariants([...variants, newVariant]);
      setNewVariant({ size: "", color: "", stock: 0 });
    }
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const onSubmit = (data: CreateProductDto) => {
    // Ensure categoryId is a valid number
    const validatedData = {
      ...data,
      categoryId: Number.parseInt(data.categoryId.toString()),
      price: Number.parseFloat(data.price.toString()),
      quantity: Number.parseInt(data.quantity.toString()),
      variants: variants.length > 0 ? variants : undefined,
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
            setVariants([]);
          },
        }
      );
    } else {
      createProduct(validatedData, {
        onSuccess: () => {
          console.log("✅ Product created successfully");
          onClose();
          reset();
          setVariants([]);
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
                  setValue("categoryId", Number.parseInt(value), {
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

            {/* Variant Management Section */}
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">
                    Product Variants
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add size, color, and stock for each variant (optional)
                  </p>
                </div>
                <Badge variant="secondary">{variants.length} variants</Badge>
              </div>

              {/* Existing Variants */}
              {variants.length > 0 && (
                <div className="space-y-2">
                  {variants.map((variant, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50"
                    >
                      <div className="flex-1 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Size: </span>
                          <span className="font-medium">
                            {variant.size || "-"}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Color: </span>
                          <span className="font-medium">
                            {variant.color || "-"}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Stock: </span>
                          <span className="font-medium">{variant.stock}</span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveVariant(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Variant */}
              <div className="p-3 border rounded-lg space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="variantSize" className="text-xs">
                      Size
                    </Label>
                    <Input
                      id="variantSize"
                      placeholder="e.g., 42"
                      value={newVariant.size || ""}
                      onChange={(e) =>
                        setNewVariant({ ...newVariant, size: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="variantColor" className="text-xs">
                      Color
                    </Label>
                    <Input
                      id="variantColor"
                      placeholder="e.g., Black"
                      value={newVariant.color || ""}
                      onChange={(e) =>
                        setNewVariant({ ...newVariant, color: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="variantStock" className="text-xs">
                      Stock *
                    </Label>
                    <Input
                      id="variantStock"
                      type="number"
                      placeholder="0"
                      value={newVariant.stock || ""}
                      onChange={(e) =>
                        setNewVariant({
                          ...newVariant,
                          stock: Number.parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddVariant}
                  disabled={newVariant.stock <= 0}
                  className="w-full"
                >
                  <Plus className="h-3 w-3 mr-2" />
                  Add Variant
                </Button>
              </div>
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
