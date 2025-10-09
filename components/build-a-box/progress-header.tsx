"use client";

import { RotateCcw, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-orange-50">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <h3 className="text-lg font-semibold">{selectedBox.name}</h3>
              <Badge variant="outline" className="bg-white">
                {totalSelected}/{selectedBox.capacity} seleccionados
              </Badge>
            </div>

            <Progress value={progressPercentage} className="h-3 w-full max-w-md" />

            <p className="mt-2 text-sm text-muted-foreground">
              {isBoxFull
                ? "¡Caja completa! Lista para agregar al carrito"
                : `Selecciona ${selectedBox.capacity - totalSelected} brigadeiro${selectedBox.capacity - totalSelected !== 1 ? "s" : ""} más`}
            </p>
          </div>

          <div className="flex gap-2">
            {totalSelected > 0 && (
              <Button variant="outline" onClick={onClearSelection} className="bg-white">
                <RotateCcw className="mr-2 h-4 w-4" />
                Limpiar
              </Button>
            )}

            <Button onClick={onAddToCart} disabled={!isBoxFull} size="lg" className="min-w-[200px]">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Agregar al Carrito - ${selectedBox.price}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
