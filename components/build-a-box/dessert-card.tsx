import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { DESSERTS } from "@/lib/data/products";

interface DessertCardProps {
  dessert: (typeof DESSERTS)[0];
  quantity: number;
  onUpdateQuantity: (dessertId: string, change: number) => void;
  isAddDisabled: boolean;
}

export function DessertCard({
  dessert,
  quantity,
  onUpdateQuantity,
  isAddDisabled,
}: DessertCardProps) {
  return (
    <Card
      className={`
        group relative overflow-hidden bg-gradient-to-br from-white to-stone-50/80 transition-all
        duration-200
        hover:scale-[1.02] hover:shadow-lg
      `}
    >
      <div className="relative aspect-square">
        <img
          src={dessert.image}
          alt={dessert.name}
          className={`
            h-full w-full object-cover transition-transform duration-200
            group-hover:scale-105
          `}
        />

        {/* Quantity indicator badge */}
        {quantity > 0 && (
          <div
            className={`
              text absolute top-1 right-1 flex h-9 w-9 items-center justify-center rounded-full
              bg-primary font-bold text-primary-foreground shadow-lg
            `}
          >
            {quantity}
          </div>
        )}

        {/* Gradient overlay for better text readability */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0
            transition-opacity duration-200
            group-hover:opacity-100
          `}
        />
      </div>

      <CardContent className="p-3 pb-14">
        <h4
          className={`
            text-md leading-tight font-semibold
            sm:text-lg
          `}
        >
          {dessert.name}
        </h4>
        <p className="mt-1 text-sm text-muted-foreground">{dessert.description}</p>
      </CardContent>

      {/* Enhanced stepper with glassmorphism effect */}
      <div
        className={`
          absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-full border
          border-white/20 bg-white/95 p-1 shadow-lg backdrop-blur-sm
          sm:right-3 sm:left-auto sm:w-auto sm:justify-center sm:space-x-1
        `}
      >
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onUpdateQuantity(dessert.id, -1)}
          disabled={quantity === 0}
          className={`
            h-7 w-7 rounded-full p-0 transition-all duration-150
            hover:bg-gray-100
            disabled:opacity-50
          `}
        >
          <Minus className="h-3 w-3" />
        </Button>

        <span
          className={`
            flex-1 text-center text-sm font-semibold
            sm:min-w-[28px] sm:flex-none sm:px-1
          `}
        >
          {quantity}
        </span>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => onUpdateQuantity(dessert.id, 1)}
          disabled={isAddDisabled}
          className={`
            h-7 w-7 rounded-full p-0 transition-all duration-150
            hover:bg-gray-100
            disabled:opacity-50
          `}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
}
