import type { CartItem } from "@/lib/types/cart";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ExpandedProductsProps {
  items: CartItem[];
}

export function ExpandedProducts({ items }: ExpandedProductsProps) {
  return (
    <div className="space-y-6">
      {items.map((item, itemIndex) => (
        <Card className="shadow-sm" key={itemIndex}>
          <CardContent className="p-4">
            {/* Box Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex h-8 w-8 items-center justify-center rounded-full
                    bg-primary/10
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
              <Badge className="text-sm font-medium" variant="secondary">
                ${item.totalPrice.toFixed(2)}
              </Badge>
            </div>

            <Separator className="mb-4" />

            {/* Brigadeiros Grid */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Brigadeiros ({item.brigadeiros.length})
              </p>
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
                      group relative overflow-hidden rounded-lg border bg-card
                      p-3 transition-all duration-200
                      hover:border-primary/20 hover:shadow-md
                    `}
                    key={brigIndex}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p
                          className={`
                            truncate text-sm font-medium text-card-foreground
                          `}
                        >
                          {brigadeiro.name}
                        </p>
                      </div>
                      <Badge
                        className="shrink-0 text-xs font-semibold"
                        variant="outline"
                      >
                        ×{brigadeiro.quantity}
                      </Badge>
                    </div>

                    {/* Subtle accent line */}
                    <div
                      className={`
                        absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r
                        from-primary/20 to-transparent opacity-0
                        transition-opacity duration-200
                        group-hover:opacity-100
                      `}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
