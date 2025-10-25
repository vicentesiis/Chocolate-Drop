import type { CartItem } from "@/lib/types/cart";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ExpandedProductsProps {
  items: CartItem[];
}

export function ExpandedProducts({ items }: ExpandedProductsProps) {
  return (
    <div
      className={`space-y-4 rounded-lg border border-border/30 bg-background/50`}
    >
      {items.map((item, itemIndex) => (
        <Card className="border-border bg-background shadow-sm" key={itemIndex}>
          <CardContent className="p-4">
            {/* Box Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex h-8 w-8 items-center justify-center rounded-full border
                    border-primary/20 bg-primary/15
                  `}
                >
                  <span className="text-sm font-semibold text-primary">
                    {itemIndex + 1}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-foreground">
                  {item.boxType.name}
                </h4>
              </div>
              <Badge
                className={`
                  border-primary/20 bg-primary/10 text-sm font-medium
                  text-primary
                `}
                variant="secondary"
              >
                ${item.totalPrice.toFixed(2)}
              </Badge>
            </div>

            <Separator className="mb-4 bg-border/50" />

            {/* Brigadeiros Grid */}
            <div
              className={`
                grid grid-cols-1 gap-3
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              `}
            >
              {item.brigadeiros.map((brigadeiro, brigIndex) => (
                <div
                  className={`
                    group relative overflow-hidden rounded-lg border
                    border-border/60 bg-background/80 p-3 transition-all
                    duration-200
                    hover:border-border hover:bg-muted/30 hover:shadow-sm
                  `}
                  key={brigIndex}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p
                        className={`
                          truncate text-sm font-medium text-foreground
                        `}
                      >
                        {brigadeiro.name}
                      </p>
                    </div>
                    <Badge
                      className={`
                        shrink-0 border-border/50 bg-muted/50 text-xs
                        font-semibold text-foreground
                      `}
                      variant="outline"
                    >
                      ×{brigadeiro.quantity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
