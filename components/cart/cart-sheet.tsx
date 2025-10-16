"use client";

import { useState } from "react";
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
  const { cart, removeFromCart, getTotalPrice } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`
            group relative rounded-full transition-all duration-200 ease-in-out
            hover:scale-105 hover:bg-accent/50
          `}
        >
          <ShoppingCart
            className={`
              !size-7 transition-transform
              group-hover:scale-110
            `}
          />
          {cart.length > 0 && (
            <span
              className={`
                absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full
                border-1 border-background bg-gradient-to-r from-primary to-primary/80 text-xs
                font-semibold text-primary-foreground shadow-lg duration-200 animate-in zoom-in-50
              `}
            >
              {cart.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        className={`
          flex h-full w-full flex-col
          sm:max-w-lg
        `}
      >
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Carrito de Compras</SheetTitle>
          <SheetDescription>
            {cart.length === 0
              ? ""
              : `${cart.length} empaque${cart.length > 1 ? "s" : ""} en tu carrito`}
          </SheetDescription>
        </SheetHeader>

        <div className=" flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <CartEmptyState />
          ) : (
            <div className="space-y-4">
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

        {cart.length > 0 && (
          <CartSummary totalPrice={getTotalPrice()} onClose={() => setOpen(false)} />
        )}
      </SheetContent>
    </Sheet>
  );
}
