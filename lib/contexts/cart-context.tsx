"use client";

import type { CartItem } from "@/lib/types/cart";

import { createContext, type ReactNode, use, useEffect, useState } from "react";

interface CartContextType {
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  removeFromCart: (index: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      // Clear corrupted cart data
      localStorage.removeItem("cart");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cart, isLoaded]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce(
      (total, item) =>
        total +
        item.brigadeiros.reduce((sum, dessert) => sum + dessert.quantity, 0),
      0,
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <CartContext
      value={{
        addToCart,
        cart,
        clearCart,
        getTotalItems,
        getTotalPrice,
        removeFromCart,
      }}
    >
      {children}
    </CartContext>
  );
}

export function useCart() {
  const context = use(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
