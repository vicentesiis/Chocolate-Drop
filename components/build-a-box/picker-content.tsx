import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type BOXES, DESSERTS } from "./data";
import { DessertCard } from "./dessert-card";
import type { SelectedDessert } from "./types";

interface PickerContentProps {
  selectedBox: (typeof BOXES)[0] | null;
  selectedDesserts: SelectedDessert[];
  totalSelected: number;
  progressPercentage: number;
  isBoxFull: boolean;
  onUpdateQuantity: (dessertId: string, change: number) => void;
  onAddToCart: () => void;
}

export function PickerContent({
  selectedBox,
  selectedDesserts,
  totalSelected,
  progressPercentage,
  isBoxFull,
  onUpdateQuantity,
  onAddToCart,
}: PickerContentProps) {
  return (
    <div className="space-y-4">
      {selectedBox && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{selectedBox.name}</h3>
            <Badge variant="secondary">
              {totalSelected}/{selectedBox.capacity}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      )}

      <ScrollArea
        className={`
          h-[70vh]
          md:h-[600px]
        `}
      >
        <div
          className={`
            grid grid-cols-2 gap-4 p-1
            sm:grid-cols-4
          `}
        >
          {DESSERTS.map((dessert) => {
            const selected = selectedDesserts.find((d) => d.id === dessert.id);
            const quantity = selected?.quantity || 0;
            const isAddDisabled = selectedBox ? totalSelected >= selectedBox.capacity : true;

            return (
              <DessertCard
                key={dessert.id}
                dessert={dessert}
                quantity={quantity}
                onUpdateQuantity={onUpdateQuantity}
                isAddDisabled={isAddDisabled}
              />
            );
          })}
        </div>
      </ScrollArea>

      <div className="flex justify-end border-t pt-4">
        <Button
          onClick={onAddToCart}
          disabled={!isBoxFull}
          className={`
            w-full
            sm:w-auto
          `}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar al Carrito - ${selectedBox?.price}
        </Button>
      </div>
    </div>
  );
}
