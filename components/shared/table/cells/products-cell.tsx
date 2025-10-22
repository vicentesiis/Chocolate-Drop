import type { CartItem } from "@/lib/types/cart";

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
  const totalItems = items.reduce(
    (sum, item) => sum + item.brigadeiros.length,
    0,
  );

  if (!onToggle) {
    // Non-collapsible version
    return (
      <div className="space-y-1">
        {items.map((item, index) => (
          <div className="text-sm" key={index}>
            {item.boxType.name} - {item.brigadeiros.length} brigadeiros
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <Button
        className={`
          h-auto justify-start p-0 font-normal
          hover:bg-transparent
        `}
        onClick={onToggle}
        size="sm"
        variant="ghost"
      >
        {isExpanded ? (
          <ChevronDown className="mr-1 h-4 w-4" />
        ) : (
          <ChevronRight className="mr-1 h-4 w-4" />
        )}
        <span className="text-sm">
          {items.length} {items.length === 1 ? "empaque" : "empaques"} -{" "}
          {totalItems} brigadeiros
        </span>
      </Button>
    </div>
  );
}
