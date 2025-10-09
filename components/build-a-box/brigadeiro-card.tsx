"use client";

import { Minus, Plus, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { BRIGADEIROS } from "@/lib/data/products";

interface BrigadeiroCardProps {
  dessert: (typeof BRIGADEIROS)[0];
  quantity: number;
  onUpdateQuantity: (dessertId: string, change: number) => void;
  isAddDisabled: boolean;
}

export function BrigadeiroCard({
  dessert,
  quantity,
  onUpdateQuantity,
  isAddDisabled,
}: BrigadeiroCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
      {/* Seasonal Badge */}
      {dessert.isSeasonal && (
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 z-10 gap-1 bg-orange-100 text-orange-800"
        >
          <Sparkles className="h-3 w-3" />
          {dessert.season}
        </Badge>
      )}

      {/* Quantity Badge */}
      {quantity > 0 && (
        <div className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground shadow-lg">
          {quantity}
        </div>
      )}

      <div className="relative aspect-square overflow-hidden">
        <img
          src={dessert.image}
          alt={dessert.name}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <h4 className="font-semibold leading-tight">{dessert.name}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{dessert.description}</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between rounded-full border bg-white/95 p-1 shadow-sm backdrop-blur-sm">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onUpdateQuantity(dessert.id, -1)}
            disabled={quantity === 0}
            className="h-8 w-8 rounded-full p-0 hover:bg-gray-100 disabled:opacity-50"
          >
            <Minus className="h-3 w-3" />
          </Button>

          <span className="min-w-[32px] text-center text-sm font-semibold">{quantity}</span>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => onUpdateQuantity(dessert.id, 1)}
            disabled={isAddDisabled && quantity === 0}
            className="h-8 w-8 rounded-full p-0 hover:bg-gray-100 disabled:opacity-50"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
