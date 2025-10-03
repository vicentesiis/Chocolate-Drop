"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/contexts/cart-context";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  const { getTotalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`
            relative h-10 w-10 rounded-md transition-colors
            hover:bg-accent hover:text-accent-foreground
          `}
        >
          <Menu className="h-5 w-5" />
          {getTotalItems() > 0 && (
            <span
              className={`
                absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full
                bg-primary text-xs font-medium text-primary-foreground shadow-sm duration-200
                animate-in zoom-in-50
              `}
            >
              {getTotalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className={`
          w-80 border-l border-border/40 bg-background/95 backdrop-blur-md
          supports-[backdrop-filter]:bg-background/80
        `}
      >
        <Logo />

        <div className="mt-8 space-y-1">
          <NavMenu orientation="vertical" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
