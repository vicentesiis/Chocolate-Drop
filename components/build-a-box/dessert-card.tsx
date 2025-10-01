import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { DESSERTS } from "./data";

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
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <img src={dessert.image} alt={dessert.name} className="h-full w-full object-cover" />
      </div>
      <CardContent className="p-4">
        <h4 className="text-xl font-medium">{dessert.name}</h4>
        <p className="text-md mb-3 text-muted-foreground">{dessert.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdateQuantity(dessert.id, -1)}
              disabled={quantity === 0}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="w-8 text-center text-sm font-medium">{quantity}</span>

            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdateQuantity(dessert.id, 1)}
              disabled={isAddDisabled}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
