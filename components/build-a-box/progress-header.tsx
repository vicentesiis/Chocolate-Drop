"use client";

import { RotateCcw, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { BOXES } from "@/lib/data/products";

interface ProgressHeaderProps {
  selectedBox: (typeof BOXES)[0];
  totalSelected: number;
  progressPercentage: number;
  isBoxFull: boolean;
  onClearSelection: () => void;
  onAddToCart: () => void;
}

export function ProgressHeader({
  selectedBox,
  totalSelected,
  progressPercentage,
  isBoxFull,
  onClearSelection,
  onAddToCart,
}: ProgressHeaderProps) {
  return (
    <div className={`
      py-4
      sm:py-6
    `}>
      <div className={`
        flex flex-col gap-4
        lg:flex-row lg:items-center lg:justify-between
      `}>
        {/* Progress Section */}
        <div className="min-w-0 flex-1">
          <div className={`
            mb-3 flex flex-row items-center justify-between gap-3
            sm:justify-start
          `}>
            <h3 className={`
              truncate text-lg font-semibold text-gray-900
              sm:text-xl
            `}>
              {selectedBox.name}
            </h3>
            <Badge 
              variant="outline" 
              className="w-fit border-gray-300 bg-white text-gray-700"
            >
              {totalSelected}/{selectedBox.capacity} seleccionados
            </Badge>
          </div>

          <div className="sm:space-y-2">
            <Progress 
              value={progressPercentage} 
              className={`
                h-2 w-full max-w-md bg-gray-200
                sm:h-3
              `} 
            />
            <p className={`
              hidden text-sm text-gray-600
              sm:inline
            `}>
              {isBoxFull
                ? "¡Caja completa! Lista para agregar al carrito"
                : `Selecciona ${selectedBox.capacity - totalSelected} brigadeiro${selectedBox.capacity - totalSelected !== 1 ? "s" : ""} más`}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`
          flex flex-row gap-2
          sm:gap-3
          lg:flex-shrink-0
        `}>
          {totalSelected > 0 && (
            <Button 
              variant="outline" 
              onClick={onClearSelection} 
              size="sm"
              className={`
                h-10 w-auto border-gray-300 bg-white p-0 px-4 text-gray-700
                hover:bg-gray-50
                sm:h-11
              `}
              title="Limpiar selección"
            >
              <RotateCcw className={`
                h-4 w-4
                sm:mr-2
              `} />
              <span className={`

              `}>Limpiar</span>
            </Button>
          )}

          <Button 
            onClick={onAddToCart} 
            disabled={!isBoxFull} 
            className={`
              h-10 flex-1 font-medium
              sm:h-11 sm:min-w-[200px] sm:flex-initial
            `}
          >
            <ShoppingCart className={`
              h-4 w-4
              sm:mr-2
            `} />
              <span>Agregar al Carrito - ${selectedBox.price}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
