import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDessertItem } from "./cart-dessert-item";
import type { CartItemProps } from "./types";

export function CartItem({ item, index, onRemove }: CartItemProps) {
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
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-3 space-y-2">
        <p className="text-sm font-medium">Brigadeiros seleccionados:</p>
        {item.selectedDesserts.map((selectedDessert) => (
          <CartDessertItem
            key={selectedDessert.id}
            dessertId={selectedDessert.id}
            quantity={selectedDessert.quantity}
          />
        ))}
      </div>
    </div>
  );
}
