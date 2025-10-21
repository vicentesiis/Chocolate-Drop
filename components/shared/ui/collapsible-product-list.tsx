import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronRight,
  CreditCard,
  Dessert,
  Package,
} from "lucide-react";
import { useState } from "react";

import type { CartItem } from "@/lib/types/cart";

interface CollapsibleProductListProps {
  className?: string;
  items: CartItem[];
  total: number;
}

export const CollapsibleProductList = ({
  className = "",
  items,
  total,
}: CollapsibleProductListProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItemExpansion = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div
      className={`
        space-y-2 rounded-lg bg-muted/30 px-1
        ${className}
      `}
    >
      <div className={`h-full space-y-2 overflow-y-auto py-1`}>
        {items.map((item, index) => (
          <Collapsible
            key={index}
            onOpenChange={() => toggleItemExpansion(index)}
            open={expandedItems.has(index)}
          >
            <div className={`rounded-lg bg-background/60 shadow-sm`}>
              <CollapsibleTrigger asChild>
                <div
                  className={`
                    flex w-full cursor-pointer items-center justify-between p-2
                    transition-colors
                    hover:bg-muted/20
                    sm:p-3
                  `}
                >
                  <div
                    className={`
                      flex min-w-0 flex-1 items-center gap-2
                      sm:gap-3
                    `}
                  >
                    <div
                      className={`
                        flex h-6 w-6 flex-shrink-0 items-center justify-center
                        rounded-full bg-primary/10
                        sm:h-8 sm:w-8
                      `}
                    >
                      <Dessert
                        className={`
                          h-3 w-3 text-primary
                          sm:h-4 sm:w-4
                        `}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`
                          truncate text-sm font-medium
                          sm:text-base
                        `}
                      >
                        {item.boxType.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p
                        className={`
                          text-sm font-bold text-primary
                          sm:text-base
                        `}
                      >
                        $
                        {item.totalPrice.toFixed(2)}
                      </p>
                    </div>
                    {item.brigadeiros.length > 0 && (
                      <div className="flex-shrink-0">
                        {expandedItems.has(index) ? (
                          <ChevronDown
                            className={`h-4 w-4 text-muted-foreground`}
                          />
                        ) : (
                          <ChevronRight
                            className={`h-4 w-4 text-muted-foreground`}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>

              {item.brigadeiros.length > 0 && (
                <CollapsibleContent>
                  <div
                    className={`
                      border-t bg-muted/10 px-2 py-2
                      sm:px-3
                    `}
                  >
                    <h5
                      className={`
                        mb-2 text-xs font-semibold text-muted-foreground
                        sm:text-sm
                      `}
                    >
                      Brigadeiros incluidos:
                    </h5>
                    <div className="space-y-1">
                      {item.brigadeiros.map((brigadeiro, brigIndex) => (
                        <div
                          className={`
                            flex items-center justify-between rounded-md
                            bg-background/40 px-2
                            sm:px-3 sm:py-1
                          `}
                          key={brigIndex}
                        >
                          <span
                            className={`
                              text-xs font-medium
                              sm:text-sm
                            `}
                          >
                            {brigadeiro.name}
                          </span>
                          <span
                            className={`
                              text-xs text-muted-foreground
                              sm:text-sm
                            `}
                          >
                            x{brigadeiro.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              )}
            </div>
          </Collapsible>
        ))}
      </div>

      <Separator className="my-2" />

      <div
        className={`
          flex items-center justify-between rounded-lg bg-primary/5 p-2
          sm:p-3
        `}
      >
        <div className="flex items-center gap-2">
          <CreditCard
            className={`
              h-4 w-4 text-primary
              sm:h-5 sm:w-5
            `}
          />
          <span
            className={`
              text-base font-semibold
              sm:text-lg
            `}
          >
            Total del Pedido
          </span>
        </div>
        <span
          className={`
            text-lg font-bold text-primary
            sm:text-2xl
          `}
        >
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
