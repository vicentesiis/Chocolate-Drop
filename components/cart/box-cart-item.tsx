import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/lib/types/cart";
import { CartDessertItem } from "./cart-dessert-item";

interface BoxCartItemProps {
  item: CartItem;
  index: number;
  onRemove: (index: number) => void;
}

export function BoxCartItem({ item, index, onRemove }: BoxCartItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);
  };

  const totalBrigadeiros = (item.brigadeiros || []).reduce((sum, b) => sum + b.quantity, 0);

  return (
    <div
      className={`
      group rounded-xl border border-border/50 bg-card p-5 shadow-sm transition-all
      hover:border-border hover:shadow-md
    `}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{item.boxType.name}</h3>
            <span
              className={`
              inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium
              text-primary
            `}
            >
              {totalBrigadeiros} piezas
            </span>
          </div>
          <p className="text-xl font-bold text-primary">{formatPrice(item.totalPrice)}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(index)}
          className={`
            text-muted-foreground opacity-0 transition-opacity
            group-hover:opacity-100
            hover:bg-destructive/10 hover:text-destructive
          `}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border"></div>
          <p className="px-2 text-sm font-medium text-muted-foreground">
            Brigadeiros seleccionados
          </p>
          <div className="h-px flex-1 bg-border"></div>
        </div>
        <div className="grid gap-2">
          {(item.brigadeiros || []).map((brigadeiro) => (
            <CartDessertItem
              key={brigadeiro.id}
              dessertId={brigadeiro.id}
              quantity={brigadeiro.quantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
