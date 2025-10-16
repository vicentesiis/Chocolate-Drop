import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/lib/types/cart";
import { BrigadeiroCartItem } from "./brigadeiro-cart-item";
import { Badge } from "../ui/badge";

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

  const totalBrigadeiros = (item.brigadeiros || []).reduce(
    (sum, b) => sum + b.quantity,
    0,
  );

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
          absolute top-2 right-4 h-8 w-8 p-0 text-muted-foreground opacity-60 transition-all
          hover:bg-destructive/10 hover:text-destructive hover:opacity-100
          sm:opacity-0 sm:group-hover:opacity-100
        `}
      >
        <Trash2 className="!size-6" />
      </Button>

      <div className="mb-4">
        <h3
          className={`
          mb-2 truncate text-base font-semibold
          sm:text-lg
          lg:text-xl
        `}
        >
          {item.boxType.name}
        </h3>
        <div className="flex items-center justify-between">
          <span
            className={`
            text-xl font-bold text-primary
            sm:text-2xl
          `}
          >
            {formatPrice(item.totalPrice)}
          </span>
          <Badge variant="secondary" className={`text-sm whitespace-nowrap`}>
            {totalBrigadeiros} piezas
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span
            className={`
            px-2 text-xs font-medium whitespace-nowrap text-muted-foreground
            sm:text-sm
          `}
          >
            Brigadeiros seleccionados
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div
          className={`
          flex flex-col gap-2
          sm:gap-3
        `}
        >
          {(item.brigadeiros || []).map((brigadeiro, brigadeiroIndex) => (
            <div key={brigadeiro.id}>
              <BrigadeiroCartItem
                dessertId={brigadeiro.id}
                quantity={brigadeiro.quantity}
              />
              {brigadeiroIndex < (item.brigadeiros || []).length - 1 && (
                <div
                  className={`
                  mt-1 h-px bg-border/50
                  sm:mt-3
                `}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
