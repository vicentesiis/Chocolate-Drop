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
    <div className={`
      mb-8
      sm:mb-12
    `}>
      <div className={`
        grid grid-cols-1 gap-3
        xs:grid-cols-2
        sm:gap-4
        md:gap-6
        lg:grid-cols-4
      `}>
        {boxes.map((box) => {
          const isSelected = selectedBox?.id === box.id;

          return (
            <Card
              key={box.id}
              className={`
                group relative cursor-pointer overflow-hidden border-2 transition-all duration-300
                ease-out
                active:scale-95
                sm:hover:scale-[1.02] sm:hover:shadow-lg
                ${isSelected
                  ? `
                    border-primary bg-primary/5 shadow-md ring-2 ring-primary/20
                    sm:shadow-lg
                  `
                  : `
                    border-border
                    hover:border-primary/50
                    active:border-primary/70
                  `
                }
              `}
              onClick={() => onSelectBox(box)}
            >
              {isSelected && (
                <div className={`
                  absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full
                  bg-primary text-primary-foreground shadow-sm
                  sm:top-4 sm:right-4 sm:h-8 sm:w-8
                `}>
                  <Check className={`
                    h-3 w-3
                    sm:h-4 sm:w-4
                  `} />
                </div>
              )}

              <div className="aspect-square overflow-hidden">
                <img
                  src={box.image}
                  alt={box.name}
                  className={`
                    h-full w-full object-cover transition-transform duration-300
                    group-hover:scale-105
                  `}
                />
              </div>

              <CardContent className={`
                p-3
                sm:p-4
                lg:p-6
              `}>
                <div className={`
                  mb-2 flex flex-col gap-2
                  sm:flex-row sm:items-center sm:justify-between
                `}>
                  <h3 className={`
                    text-base font-semibold
                    sm:text-lg
                    lg:text-xl
                  `}>{box.name}</h3>
                  <Badge variant="secondary" className={`
                    hidden text-xs whitespace-nowrap
                    sm:block sm:text-sm
                  `}>
                    {box.capacity} piezas
                  </Badge>
                </div>

                <div className={`
                  flex flex-col gap-1
                  sm:flex-row sm:items-center sm:justify-between
                `}>
                  <div className={`
                    flex items-center justify-between
                    sm:justify-start
                  `}>
                    <span className={`
                      text-xl font-bold text-primary
                      sm:text-2xl
                    `}>${box.price}</span>
                    <Badge variant="secondary" className={`
                      text-xs whitespace-nowrap
                      sm:hidden
                    `}>
                      {box.capacity} piezas
                    </Badge>
                  </div>
                  <span className={`
                    text-xs text-muted-foreground
                    sm:text-sm
                  `}>
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
