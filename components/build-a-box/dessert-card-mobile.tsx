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
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex gap-3 p-3">
          {/* Image - smaller and fixed size */}
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
            <img src={dessert.image} alt={dessert.name} className="h-full w-full object-cover" />

            {/* Quantity indicator badge */}
            {quantity > 0 && (
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg">
                {quantity}
              </div>
            )}
          </div>

          {/* Content - takes remaining space */}
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-semibold leading-tight">{dessert.name}</h4>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {dessert.description}
              </p>
            </div>

            {/* Stepper controls - compact horizontal layout */}
            <div className="mt-2 flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateQuantity(dessert.id, -1)}
                disabled={quantity === 0}
                className="h-6 w-6 rounded-full p-0 disabled:opacity-50"
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="min-w-[20px] text-center text-sm font-semibold">{quantity}</span>

              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateQuantity(dessert.id, 1)}
                disabled={isAddDisabled}
                className="h-6 w-6 rounded-full p-0 disabled:opacity-50"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
