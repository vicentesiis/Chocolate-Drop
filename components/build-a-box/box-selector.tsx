"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BOXES } from "@/lib/data/products";

interface BoxSelectorProps {
  boxes: typeof BOXES;
  selectedBox: (typeof BOXES)[0] | null;
  onSelectBox: (box: (typeof BOXES)[0]) => void;
}

export function BoxSelector({ boxes, selectedBox, onSelectBox }: BoxSelectorProps) {
  return (
    <div className="mb-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {boxes.map((box) => {
          const isSelected = selectedBox?.id === box.id;

          return (
            <Card
              key={box.id}
              className={`
                group relative cursor-pointer overflow-hidden border-2 transition-all duration-200
                hover:scale-[1.02] hover:shadow-lg
                ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border hover:border-primary/50"
                }
              `}
              onClick={() => onSelectBox(box)}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" />
                </div>
              )}

              <div className="aspect-square overflow-hidden">
                <img
                  src={box.image}
                  alt={box.name}
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>

              <CardContent className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{box.name}</h3>
                  <Badge variant="secondary">{box.capacity} piezas</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">${box.price}</span>
                  <span className="text-sm text-muted-foreground">
                    ${Math.round(box.price / box.capacity)} por pieza
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
