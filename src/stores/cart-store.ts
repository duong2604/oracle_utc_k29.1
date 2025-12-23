import { create } from "zustand";
import { CartItem, Product, ProductVariant } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (
    product: Product,
    variant: ProductVariant,
    quantity?: number
  ) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalAmount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product, variant, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.variant.variantId === variant.variantId
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.variant.variantId === variant.variantId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { product, variant, quantity }],
      };
    });
  },

  removeItem: (variantId) => {
    set((state) => ({
      items: state.items.filter((item) => item.variant.variantId !== variantId),
    }));
  },

  updateQuantity: (variantId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(variantId);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.variant.variantId === variantId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotalAmount: () => {
    return get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  },
}));
