"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BOXES } from "@/lib/data/products";

export default function BuildABox() {
  return (
    <section
      className={`
      flex items-center px-4 py-8
      sm:py-16
    `}
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={`
          mb-8 text-center
          sm:mb-12
        `}
        >
          <h2
            className={`
            mb-3 text-2xl font-bold
            sm:mb-4 sm:text-4xl
          `}
          >
            Arma tu Caja Personalizada
          </h2>
          <p
            className={`
            mx-auto max-w-4xl text-lg text-muted-foreground
            sm:text-xl
          `}
          >
            Elige el tamaño de la caja y añade los brigadeiros que más te gusten.
          </p>
          <p
            className={`
            mx-auto mt-2 max-w-4xl text-lg text-muted-foreground
            sm:text-xl
          `}
          >
            Hechos con ingredientes premium para deleitarte en cada bocado.
          </p>
        </div>

        {/* Preview Cards */}
        <div
          className={`
          mb-8 grid gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        `}
        >
          {BOXES.map((box) => (
            <Card
              key={box.id}
              className={`
                group overflow-hidden transition-all duration-200
                hover:shadow-lg
              `}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={box.image}
                  alt={box.name}
                  className={`
                    h-full w-full object-cover transition-transform duration-200
                    group-hover:scale-105
                  `}
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{box.name}</h3>
                  <Badge variant="secondary">{box.capacity} piezas</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">${box.price}</span>
                  <span className="text-sm text-muted-foreground">
                    ${Math.round(box.price / box.capacity)} por pieza
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/build-a-box">
            <Button size="lg" className="gap-2 px-8 py-6 text-lg">
              Personalizar mi Caja
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Experiencia completa de personalización con filtros y vista previa
          </p>
        </div>
      </div>
    </section>
  );
}
