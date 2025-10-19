import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CartSummaryProps {
  onClose: () => void;
  totalPrice: number;
}

export function CartSummary({ onClose, totalPrice }: CartSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      currency: "MXN",
      style: "currency",
    }).format(price);
  };

  return (
    <div>
      <div
        className={`
          -mt-2 flex items-center justify-between border-t-1 text-xl
          font-semibold text-primary
        `}
      >
        <span className="pt-2">Total:</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
      <Link className="block" href="/checkout">
        <Button className="mt-2 w-full" onClick={onClose} size="lg">
          Proceder al Pago
        </Button>
      </Link>
    </div>
  );
}
