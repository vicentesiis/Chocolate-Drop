"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/contexts/cart-context";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  const { getTotalItems } = useCart();

  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Drawer</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Menu />
          {getTotalItems() > 0 && (
            <span
              className={`
                absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full
                bg-primary text-xs text-primary-foreground
              `}
            >
              {getTotalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Logo />
        <NavMenu orientation="vertical" className="mt-12" />

        <div className="mt-8">
          <Button variant="outline" className="w-full justify-start">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Ver Carrito
            {getTotalItems() > 0 && <span className="ml-auto">({getTotalItems()})</span>}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
