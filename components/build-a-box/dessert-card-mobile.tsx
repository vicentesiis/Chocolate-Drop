import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { DESSERTS } from "./data";

interface DessertCardMobileProps {
  dessert: (typeof DESSERTS)[0];
  quantity: number;
  onUpdateQuantity: (dessertId: string, change: number) => void;
  isAddDisabled: boolean;
}

export function DessertCardMobile({
  dessert,
  quantity,
  onUpdateQuantity,
  isAddDisabled,
}: DessertCardMobileProps) {
  return (
    <Card
      className={`
        overflow-hidden bg-gradient-to-br from-white to-stone-50/80 transition-all duration-200
        hover:shadow-md
      `}
    >
      <CardContent className="p-0">
        <div className="flex items-center gap-3 p-2">
          <div className="relative h-20 w-20 flex-shrink-0">
            <div className="h-full w-full overflow-hidden rounded-lg">
              <img src={dessert.image} alt={dessert.name} className="h-full w-full object-cover" />
            </div>

            {/* Quantity indicator badge */}
            {quantity > 0 && (
              <div
                className={`
                  absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full
                  bg-primary text-xs font-bold text-primary-foreground shadow-lg
                `}
              >
                {quantity}
              </div>
            )}
          </div>

          {/* Content - takes remaining space */}
          <div className="flex flex-1 flex-col justify-center">
            <div className="flex-1">
              <h4 className="text leading-tight font-semibold text-primary">{dessert.name}</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {dessert.description}
              </p>
            </div>

            {/* Stepper controls - bigger for better mobile UX */}
            <div className="mt-0 flex items-center justify-end gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateQuantity(dessert.id, -1)}
                disabled={quantity === 0}
                className={`
                  h-8 w-8 rounded-full p-0 transition-all duration-150
                  hover:scale-105
                  active:scale-95
                  disabled:opacity-50
                `}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="min-w-[28px] text-center text-base font-semibold">{quantity}</span>

              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateQuantity(dessert.id, 1)}
                disabled={isAddDisabled}
                className={`
                  h-8 w-8 rounded-full p-0 transition-all duration-150
                  hover:scale-105
                  active:scale-95
                  disabled:opacity-50
                `}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
