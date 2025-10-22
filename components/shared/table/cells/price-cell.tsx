import { formatPrice } from "@/lib/utils/format-utils";

interface PriceCellProps {
  amount: number;
}

export function PriceCell({ amount }: PriceCellProps) {
  return <div className="font-medium">{formatPrice(amount)}</div>;
}
