"use client";

import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { DESSERTS } from "@/components/build-a-box/data";
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

export function CartSheet() {
  const { cart, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  const getDessertById = (id: string) => {
    return DESSERTS.find((dessert) => dessert.id === id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={`
            relative hidden
            sm:inline-flex
          `}
        >
          <ShoppingBag className="h-4 w-4" />
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
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">Tu carrito está vacío</p>
              <p className="text-sm text-muted-foreground">
                Agrega algunas cajas de brigadeiros para comenzar
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div key={`cart-item-${index}`} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.boxType.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.totalPrice)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(index)}
                      className={`
                        text-destructive
                        hover:text-destructive
                      `}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium">Brigadeiros seleccionados:</p>
                    {item.selectedDesserts.map((selectedDessert) => {
                      const dessert = getDessertById(selectedDessert.id);
                      if (!dessert) return null;

                      return (
                        <div
                          key={selectedDessert.id}
                          className="flex items-center gap-3 rounded-md bg-muted/50 p-2"
                        >
                          <Image
                            src={dessert.image}
                            alt={dessert.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{dessert.name}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{selectedDessert.quantity}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <Button className="mt-4 w-full" size="lg">
              Proceder al Pago
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
