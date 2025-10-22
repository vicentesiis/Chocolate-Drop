import type { CartItem } from "@/lib/types/cart";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

interface ProductsCellProps {
  isExpanded?: boolean;
  items: CartItem[];
  onToggle?: () => void;
}

export function ProductsCell({
  isExpanded,
  items,
  onToggle,
}: ProductsCellProps) {
  if (!onToggle) {
    // Non-collapsible version - group by box type and show counts
    const boxCounts = items.reduce(
      (acc, item) => {
        const boxName = item.boxType.name;
        if (!acc[boxName]) {
          acc[boxName] = { count: 0, totalBrigadeiros: 0 };
        }
        acc[boxName].count += 1;
        acc[boxName].totalBrigadeiros += item.brigadeiros.length;
        return acc;
      },
      {} as Record<string, { count: number; totalBrigadeiros: number }>,
    );

    return (
      <div className="w-full space-y-1">
        {Object.entries(boxCounts).map(
          ([boxName, { count, totalBrigadeiros }]) => (
            <div className="text-sm" key={boxName}>
              <div
                className={`
                  flex w-full items-center justify-between font-medium
                `}
              >
                <span className="truncate">{boxName}</span>
                <Badge
                  className="ml-2 h-5 flex-shrink-0 px-2 text-xs"
                  variant="secondary"
                >
                  {count}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {totalBrigadeiros} brigadeiros
              </div>
            </div>
          ),
        )}
      </div>
    );
  }

  return (
    <div className="w-full space-y-1">
      <Button
        className={`
          h-auto w-full justify-start p-0 font-normal
          hover:bg-transparent
        `}
        onClick={onToggle}
        size="sm"
        variant="ghost"
      >
        <div className="flex w-full items-start">
          {isExpanded ? (
            <ChevronDown className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0" />
          ) : (
            <ChevronRight className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0" />
          )}
          <div className="flex-1 space-y-1.5">
            {Object.entries(
              items.reduce(
                (acc, item) => {
                  const boxName = item.boxType.name;
                  if (!acc[boxName]) {
                    acc[boxName] = 0;
                  }
                  acc[boxName] += 1;
                  return acc;
                },
                {} as Record<string, number>,
              ),
            ).map(([boxName, count]) => (
              <div
                className="flex w-full items-center justify-between text-sm"
                key={boxName}
              >
                <span className="truncate text-left font-medium">
                  {boxName}
                </span>
                <Badge
                  className="h-5 flex-shrink-0 px-2 text-xs"
                  variant="secondary"
                >
                  {count}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Button>
    </div>
  );
}
