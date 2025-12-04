"use client";

import { useState } from "react";
import { Product, ProductVariant } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores/cart-store";
import { toast } from "sonner";

interface VariantSelectorProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export function VariantSelector({
  product,
  open,
  onClose,
}: VariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) return null;

  const hasVariants = product.variants && product.variants.length > 0;

  const handleAddToCart = () => {
    if (!hasVariants) {
      // Product has no variants, add directly
      toast.error("This product has no variants available");
      return;
    }

    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }

    if (quantity > selectedVariant.stock) {
      toast.error("Not enough stock available");
      return;
    }

    addItem(product, selectedVariant, quantity);
    toast.success(`Added ${quantity}x ${product.productName} to cart`);
    onClose();
    setSelectedVariant(null);
    setQuantity(1);
  };

  const handleClose = () => {
    onClose();
    setSelectedVariant(null);
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product.productName}</DialogTitle>
          <DialogDescription>
            Select a variant and quantity to add to cart
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-2xl font-bold text-primary mb-2">
              ${product.price.toLocaleString()}
            </p>
            {product.category && (
              <Badge variant="outline">{product.category.categoryName}</Badge>
            )}
          </div>

          {hasVariants ? (
            <div className="space-y-4">
              <div>
                <Label>Select Variant</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {product.variants?.map((variant) => (
                    <button
                      key={variant.variantId}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={variant.stock === 0}
                      className={`p-3 border rounded-lg text-left transition-all ${
                        selectedVariant?.variantId === variant.variantId
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      } ${
                        variant.stock === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            {variant.size && <span>Size: {variant.size}</span>}
                            {variant.size && variant.color && (
                              <span className="mx-2">•</span>
                            )}
                            {variant.color && (
                              <span>Color: {variant.color}</span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Stock: {variant.stock}
                          </div>
                        </div>
                        {selectedVariant?.variantId === variant.variantId && (
                          <Badge>Selected</Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedVariant && (
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={selectedVariant.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Max: {selectedVariant.stock}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No variants available for this product
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddToCart} disabled={!selectedVariant}>
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
