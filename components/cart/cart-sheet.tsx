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
import { BoxCartItem } from "./box-cart-item";
import { CartEmptyState } from "./cart-empty-state";
import { CartSummary } from "./cart-summary";

export function CartSheet() {
  const { cart, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`
            group relative h-10 w-10 rounded-full transition-all duration-200 ease-in-out
            hover:scale-105 hover:bg-accent/50
          `}
        >
          <ShoppingCart
            className={`
              !size-5 transition-transform
              group-hover:scale-110
              sm:!size-6
            `}
          />
          {getTotalItems() > 0 && (
            <span
              className={`
                absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full
                border-1 border-background bg-gradient-to-r from-primary to-primary/80 text-xs
                font-semibold text-primary-foreground shadow-lg duration-200 animate-in zoom-in-50
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
              ? ""
              : `${cart.length} caja${cart.length > 1 ? "s" : ""} en tu carrito`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <CartEmptyState />
          ) : (
            <div className="space-y-6">
              {cart.map((item, index) => (
                <BoxCartItem
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
