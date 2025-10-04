import { ShoppingBag } from "lucide-react";

export function CartEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <ShoppingBag className="h-12 w-12 text-muted-foreground" />
      <p className="mt-4 text-xl font-medium">Tu carrito está vacío</p>
      <p className=" text-lg text-muted-foreground">
        Agrega algunas cajas de brigadeiros para comenzar
      </p>
    </div>
  );
}
