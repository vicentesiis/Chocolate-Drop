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

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium">{item.boxType.name}</h3>
          <p className="text-sm text-muted-foreground">{formatPrice(item.totalPrice)}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(index)}
          className={`
            text-destructive
            hover:text-destructive
          `}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-3 space-y-2">
        <p className="text-sm font-medium">Brigadeiros seleccionados:</p>
        {(item.brigadeiros || []).map((brigadeiro) => (
          <CartDessertItem
            key={brigadeiro.id}
            dessertId={brigadeiro.id}
            quantity={brigadeiro.quantity}
          />
        ))}
      </div>
    </div>
  );
}
