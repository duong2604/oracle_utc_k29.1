"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";
import { Product } from "@/types";
import { ProductCard } from "@/components/pos/product-card";
import { VariantSelector } from "@/components/pos/variant-selector";
import { CartSidebar } from "@/components/pos/cart-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Store } from "lucide-react";
import { useRouter } from "next/navigation";

export default function POSPage() {
  const router = useRouter();
  const { products, isLoading: productsLoading } = useProducts();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [variantDialogOpen, setVariantDialogOpen] = useState(false);

  const isLoading = productsLoading || categoriesLoading;

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === null || product.categoryId === selectedCategory;
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setVariantDialogOpen(true);
  };

  const handleCheckout = () => {
    router.push("/pos/checkout");
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 shadow-lg">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <Store className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Shoe Store POS</h1>
                <p className="text-sm opacity-90">Point of Sale System</p>
              </div>
            </div>
            <Button variant="secondary" onClick={() => router.push("/")}>
              Admin Panel
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-background border-b p-4">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                size="sm"
              >
                All
                <Badge variant="secondary" className="ml-2">
                  {products.length}
                </Badge>
              </Button>
              {categories.map((category) => {
                const count = products.filter(
                  (p) => p.categoryId === category.categoryId
                ).length;
                return (
                  <Button
                    key={category.categoryId}
                    variant={
                      selectedCategory === category.categoryId
                        ? "default"
                        : "outline"
                    }
                    onClick={() => setSelectedCategory(category.categoryId)}
                    size="sm"
                  >
                    {category.categoryName}
                    <Badge variant="secondary" className="ml-2">
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm mt-2">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.productId}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar onCheckout={handleCheckout} />

      {/* Variant Selector Dialog */}
      <VariantSelector
        product={selectedProduct}
        open={variantDialogOpen}
        onClose={() => {
          setVariantDialogOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
}
