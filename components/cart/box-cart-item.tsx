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
        group relative rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all
        hover:border-border hover:shadow-md
        sm:p-5
      `}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(index)}
        className={`
          absolute top-2 right-2 h-8 w-8 p-0 text-muted-foreground opacity-60 transition-all
          hover:bg-destructive/10 hover:text-destructive hover:opacity-100
          sm:opacity-0 sm:group-hover:opacity-100
        `}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <div className="mb-4">
        <h3 className={`
          mb-2 truncate text-base font-semibold text-foreground
          sm:text-lg
        `}>
          {item.boxType.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className={`
            text-lg font-bold text-primary
            sm:text-xl
          `}>{formatPrice(item.totalPrice)}</p>
          <span
            className={`
              inline-flex w-fit items-center rounded-full bg-primary/10 px-2 py-1 text-xs
              font-medium text-primary
            `}
          >
            {totalBrigadeiros} piezas
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border"></div>
          <p className={`px-2 text-sm font-medium whitespace-nowrap text-muted-foreground`}>
            Brigadeiros seleccionados
          </p>
          <div className="h-px flex-1 bg-border"></div>
        </div>
        <div className={`
          grid gap-2
          sm:gap-3
        `}>
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
