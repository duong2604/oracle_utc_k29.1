"use client";

import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const hasVariants = product.variants && product.variants.length > 0;
  const totalStock = hasVariants
    ? product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0
    : product.quantity;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-2">
              {product.productName}
            </h3>
            {totalStock > 0 ? (
              <Badge variant="default" className="ml-2">
                {totalStock} in stock
              </Badge>
            ) : (
              <Badge variant="destructive" className="ml-2">
                Out of stock
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-primary">
              ${product.price.toLocaleString()}
            </p>
            {product.category && (
              <Badge variant="outline">{product.category.categoryName}</Badge>
            )}
          </div>

          {hasVariants && (
            <div className="text-xs text-muted-foreground">
              {product.variants?.length || 0} variant(s) available
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => onAddToCart(product)}
          disabled={totalStock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
