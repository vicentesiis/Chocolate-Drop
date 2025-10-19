"use client";

import type { BRIGADEIROS } from "@/lib/data/products";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

interface BrigadeiroCardProps {
  dessert: (typeof BRIGADEIROS)[0];
  isAddDisabled: boolean;
  onUpdateQuantity: (dessertId: string, change: number) => void;
  quantity: number;
}

export function BrigadeiroCard({
  dessert,
  isAddDisabled,
  onUpdateQuantity,
  quantity,
}: BrigadeiroCardProps) {
  return (
    <Card
      className={`
        group relative flex flex-col overflow-hidden bg-card transition-all
        duration-200
        hover:scale-[1.02] hover:shadow-lg
      `}
    >
      {/* Quantity Badge */}
      {quantity > 0 && (
        <div
          className={`
            absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center
            rounded-full bg-primary font-bold text-primary-foreground shadow-lg
          `}
        >
          {quantity}
        </div>
      )}

      <div
        className={`
          relative aspect-square overflow-hidden bg-gradient-to-br
          from-orange-100 via-amber-100 to-yellow-50
        `}
      >
        <Image
          alt={dessert.name}
          className={`
            object-contain p-4 transition-transform duration-200
            group-hover:scale-105
          `}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 45vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          src={dessert.image}
        />

        {/* Overlay gradient */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-t from-black/20 via-transparent
            to-transparent opacity-0 transition-opacity duration-200
            group-hover:opacity-100
          `}
        />
      </div>

      <CardContent
        className={`
          flex flex-1 flex-col p-3
          sm:p-4
        `}
      >
        <div className="flex-1">
          <h4 className="leading-tight font-semibold">{dessert.name}</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            {dessert.description}
          </p>
        </div>

        {/* Quantity Controls */}
        <div
          className={`
            mt-3 flex items-center justify-between rounded-full border p-1
            shadow-sm backdrop-blur-sm
          `}
        >
          <Button
            className={`
              h-8 w-12 rounded-full p-0
              hover:bg-gray-100
              disabled:opacity-50
            `}
            disabled={quantity === 0}
            onClick={() => onUpdateQuantity(dessert.id, -1)}
            size="lg"
            variant="ghost"
          >
            <Minus className="!size-5" />
          </Button>

          <span className="min-w-[32px] text-center font-semibold">
            {quantity}
          </span>

          <Button
            className={`
              h-8 w-12 rounded-full p-0
              hover:bg-gray-100
              disabled:opacity-50
            `}
            disabled={isAddDisabled && quantity === 0}
            onClick={() => onUpdateQuantity(dessert.id, 1)}
            size="lg"
            variant="ghost"
          >
            <Plus className="!size-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
