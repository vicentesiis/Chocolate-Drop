"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger asChild>
        <Button
          className={`
            relative h-10 w-10 rounded-md transition-colors
            hover:bg-accent hover:text-accent-foreground
          `}
          size="icon"
          variant="ghost"
        >
          <Menu className="!size-7" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className={`
          flex w-64 flex-col border-l border-border/40 bg-background/95
          backdrop-blur-md
          supports-[backdrop-filter]:bg-background/80
        `}
        side="right"
      >
        <Logo />

        <div className="mt-4 flex-1">
          <NavMenu
            onItemClick={() => setIsOpen(false)}
            orientation="vertical"
          />
        </div>

        <div className="mt-auto mb-4">
          <Link href="/quote-event" onClick={() => setIsOpen(false)}>
            <Button className={`w-full `}>Cotiza tu Evento!</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
