import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  totalPrice: number;
}

export function CartSummary({ totalPrice }: CartSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);
  };

  return (
    <div>
      <div className="flex items-center justify-between text-lg font-semibold">
        <span>Total:</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
      <Link href="/checkout" className="block">
        <Button className="mt-4 w-full" size="lg">
          Proceder al Pago
        </Button>
      </Link>
    </div>
  );
}
