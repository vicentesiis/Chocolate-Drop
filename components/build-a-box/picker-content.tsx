import { RotateCcw, ShoppingCart } from "lucide-react";
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
  onClearSelection: () => void;
}

export function PickerContent({
  selectedBox,
  selectedDesserts,
  totalSelected,
  progressPercentage,
  isBoxFull,
  onUpdateQuantity,
  onAddToCart,
  onClearSelection,
}: PickerContentProps) {
  return (
    <div className="space-y-2">
      {selectedBox && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Selecciona tus brigadeiros</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {totalSelected}/{selectedBox.capacity}
              </Badge>
              {totalSelected > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearSelection}
                  className="h-0 px-0 text-xs"
                >
                  <RotateCcw className="mr-1 h-3 w-3" />
                  Limpiar
                </Button>
              )}
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      )}

      <ScrollArea
        className={`
          h-[70vh]
          md:h-[630px]
        `}
      >
        <div
          className={`
            grid grid-cols-2 gap-4 p-1
            sm:grid-cols-4
            lg:grid-cols-6
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

      {/* Desktop button - always visible, disabled when not full */}
      <div
        className={`
          hidden justify-end border-t py-2
          sm:flex
        `}
      >
        <Button onClick={onAddToCart} disabled={!isBoxFull}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar al Carrito - ${selectedBox?.price}
        </Button>
      </div>

      {/* Mobile floating button - only appears when box is full */}
      {isBoxFull && (
        <div
          className={`
            fixed right-4 bottom-4 left-4 z-50 duration-500 animate-in slide-in-from-bottom-8
            sm:hidden
          `}
        >
          <Button
            onClick={onAddToCart}
            className={`
              w-full shadow-lg transition-shadow
              hover:shadow-xl
            `}
            size="lg"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Agregar al Carrito - ${selectedBox?.price}
          </Button>
        </div>
      )}
    </div>
  );
}
