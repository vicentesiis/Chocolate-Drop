import type { CartItem } from "@/lib/types/cart";

import { Badge } from "@/components/ui/badge";

interface ExpandedProductsProps {
  items: CartItem[];
}

export function ExpandedProducts({ items }: ExpandedProductsProps) {
  return (
    <div className="space-y-4">
      {items.map((item, itemIndex) => (
        <div className="space-y-2" key={itemIndex}>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium">{item.boxType.name}</h4>
            <Badge className="text-xs" variant="secondary">
              ${item.totalPrice.toFixed(2)}
            </Badge>
          </div>

          <div
            className={`
              grid grid-cols-2 gap-2 pl-4
              sm:grid-cols-3
              md:grid-cols-4
            `}
          >
            {item.brigadeiros.map((brigadeiro, brigIndex) => (
              <div
                className={`
                  flex items-center justify-between rounded-md border
                  bg-background p-2 text-xs
                `}
                key={brigIndex}
              >
                <span className="truncate font-medium">{brigadeiro.name}</span>
                <Badge className="ml-1 text-xs" variant="outline">
                  {brigadeiro.quantity}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
