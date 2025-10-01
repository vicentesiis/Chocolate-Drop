"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/contexts/cart-context";
import { CartEmptyState } from "./cart-empty-state";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";

export function CartSheet() {
  const { cart, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={`
            relative h-8 w-9
            [&_svg]:!size-5
          `}
        >
          <ShoppingCart />
          {getTotalItems() > 0 && (
            <span
              className={`
                absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full
                bg-primary text-xs text-primary-foreground
              `}
            >
              {getTotalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        className={`
          w-full
          sm:max-w-lg
        `}
      >
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
          <SheetDescription>
            {cart.length === 0
              ? "Tu carrito está vacío"
              : `${cart.length} caja${cart.length > 1 ? "s" : ""} en tu carrito`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <CartEmptyState />
          ) : (
            <div className="space-y-6">
              {cart.map((item, index) => (
                <CartItem
                  key={`cart-item-${index}`}
                  item={item}
                  index={index}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && <CartSummary totalPrice={getTotalPrice()} />}
      </SheetContent>
    </Sheet>
  );
}
