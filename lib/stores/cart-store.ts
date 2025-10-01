import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/components/build-a-box/types";

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => ({
          cart: [...state.cart, item],
        })),

      removeFromCart: (index) =>
        set((state) => ({
          cart: state.cart.filter((_, i) => i !== index),
        })),

      clearCart: () => set({ cart: [] }),

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) =>
            total + item.selectedDesserts.reduce((sum, dessert) => sum + dessert.quantity, 0),
          0,
        );
      },

      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.totalPrice, 0);
      },
    }),
    {
      name: "cart-storage", // localStorage key
      // Optional: only persist cart items, not computed values
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);
