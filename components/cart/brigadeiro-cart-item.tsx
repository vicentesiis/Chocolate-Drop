import Image from "next/image";
import { BRIGADEIROS } from "@/lib/data/products";

interface BrigadeiroCartItemProps {
  dessertId: string;
  quantity: number;
}

export function BrigadeiroCartItem({ dessertId, quantity }: BrigadeiroCartItemProps) {
  const dessert = BRIGADEIROS.find((d) => d.id === dessertId);

  if (!dessert) return null;

  return (
    <div
      className={`flex items-center gap-4 rounded-lg bg-card py-2 transition-colors`}
    >
      <div className="relative">
        <Image
          src={dessert.image}
          alt={dessert.name}
          width={100}
          height={100}
        />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className={`leading-tight font-semibold`}>{dessert.name}</h4>
        <p className={`mt-2 text-base text-muted-foreground`}>
          {quantity} {quantity === 1 ? "pieza" : "piezas"}
        </p>
      </div>
    </div>
  );
}