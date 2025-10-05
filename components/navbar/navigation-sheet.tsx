"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
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
          <Menu className="!size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className={`
          w-60 border-l border-border/40 bg-background/95 backdrop-blur-md
          supports-[backdrop-filter]:bg-background/80
        `}
      >
        <Logo />

        <div className="mt-8 space-y-1">
          <NavMenu orientation="vertical" onItemClick={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
