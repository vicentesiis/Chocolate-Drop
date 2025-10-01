"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DessertCartCarousel } from "./dessert-cart-carousel";
import { DessertCartContent } from "./dessert-cart-content";
import type { DessertCartRentalProps } from "./types";

export function DessertCartRental({ className }: DessertCartRentalProps) {
  return (
    <section className={className}>
      <div
        className={`
          container mx-auto max-w-7xl px-4
          sm:px-6
          lg:px-8
        `}
      >
        <Card
          className={`
            overflow-hidden border-none bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg
          `}
        >
          <CardContent className="p-0">
            <div
              className={`
                grid items-center gap-8
                lg:grid-cols-2
              `}
            >
              <DessertCartContent />
              <DessertCartCarousel />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
