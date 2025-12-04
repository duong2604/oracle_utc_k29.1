"use client";

import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CartSidebarProps {
  onCheckout: () => void;
}

export function CartSidebar({ onCheckout }: CartSidebarProps) {
  const {
    items,
    updateQuantity,
    removeItem,
    getTotalAmount,
    getTotalItems,
    clearCart,
  } = useCartStore();

  return (
    <div className="w-full lg:w-96 h-full flex flex-col border-l bg-card">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <h2 className="font-semibold text-lg">Cart</h2>
            <Badge>{getTotalItems()}</Badge>
          </div>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <ShoppingCart className="h-12 w-12 mb-4 opacity-50" />
            <p>Your cart is empty</p>
            <p className="text-sm mt-2">Add products to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.variant.variantId}
                className="bg-background p-3 rounded-lg border"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">
                      {item.product.productName}
                    </h4>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.variant.size && (
                        <span>Size: {item.variant.size}</span>
                      )}
                      {item.variant.size && item.variant.color && (
                        <span className="mx-1">•</span>
                      )}
                      {item.variant.color && (
                        <span>Color: {item.variant.color}</span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeItem(item.variant.variantId)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateQuantity(
                          item.variant.variantId,
                          item.quantity - 1
                        )
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.variant.variantId,
                          parseInt(e.target.value) || 1
                        )
                      }
                      min="1"
                      max={item.variant.stock}
                      className="h-7 w-16 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateQuantity(
                          item.variant.variantId,
                          item.quantity + 1
                        )
                      }
                      disabled={item.quantity >= item.variant.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ${item.product.price} each
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${getTotalAmount().toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">
              ${getTotalAmount().toLocaleString()}
            </span>
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
