import Image from "next/image";
import type { DESSERTS } from "@/lib/data/products";
import type { CartDessertItemProps } from "./types";

export function CartDessertItem({ dessertId, quantity }: CartDessertItemProps) {
  const dessert = DESSERTS.find((d) => d.id === dessertId);

  if (!dessert) return null;

  return (
    <div className="flex items-center gap-3 rounded-md bg-muted/50 p-2">
      <Image
        src={dessert.image}
        alt={dessert.name}
        width={32}
        height={32}
        className="rounded-full"
      />
      <div className="flex-1">
        <p className="text-sm font-medium">{dessert.name}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{quantity}</span>
      </div>
    </div>
  );
}
