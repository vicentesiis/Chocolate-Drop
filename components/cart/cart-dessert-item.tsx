import Image from "next/image";
import { BRIGADEIROS } from "@/lib/data/products";

interface CartDessertItemProps {
  dessertId: string;
  quantity: number;
}

export function CartDessertItem({ dessertId, quantity }: CartDessertItemProps) {
  const dessert = BRIGADEIROS.find((d) => d.id === dessertId);

  if (!dessert) return null;

  return (
    <div
      className={`
      flex items-center gap-3 rounded-lg bg-muted/30 p-3 transition-colors
      hover:bg-muted/50
    `}
    >
      <div className="relative">
        <Image
          src={dessert.image}
          alt={dessert.name}
          width={40}
          height={40}
          className="rounded-full object-cover shadow-sm ring-2 ring-background"
        />
        <div
          className={`
          absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary
          text-xs font-bold text-primary-foreground
        `}
        >
          {quantity}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{dessert.name}</p>
        <p className="text-xs text-muted-foreground">
          {quantity} {quantity === 1 ? "pieza" : "piezas"}
        </p>
      </div>
    </div>
  );
}
