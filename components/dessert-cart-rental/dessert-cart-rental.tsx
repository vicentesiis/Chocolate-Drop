"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DessertCartCarousel } from "./dessert-cart-carousel";
import { DessertCartContent } from "./dessert-cart-content";
import type { DessertCartRentalProps } from "./types";

export function DessertCartRental({ className }: DessertCartRentalProps) {
  return (
    <section
      className={`
        flex items-center py-16
        lg:py-24
        ${className || ""}
      `}
    >
      <div
        className={`
          container mx-auto max-w-7xl px-2
          sm:px-4
          md:px-6
          lg:px-8
        `}
      >
        <Card
          className={`
            mx-2 overflow-hidden border-none bg-gradient-to-br from-primary/5 to-primary/10
            shadow-lg
            sm:mx-0
          `}
        >
          <CardContent className="p-0">
            <div
              className={`
                flex flex-col
                sm:gap-6
                lg:grid lg:grid-cols-2 lg:items-center lg:gap-8
              `}
            >
              {/* Show carousel first on mobile for visual impact */}
              <div
                className={`
                  order-1
                  lg:order-2
                `}
              >
                <div
                  className={`
                    pt-3
                    sm:hidden
                  `}
                >
                  <h2 className={`text-center text-2xl font-bold text-primary`}>
                    Endulza tu Evento
                  </h2>
                </div>
                <DessertCartCarousel />
              </div>
              <div
                className={`
                  order-2
                  lg:order-1
                `}
              >
                <DessertCartContent />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
