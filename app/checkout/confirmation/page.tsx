"use client";

import {
  ConfirmationActions,
  ConfirmationHeader,
  OrderDetails,
} from "@/components/checkout";
import { generateOrderNumber } from "@/lib/utils/order-utils";
import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  // Get order number from URL params, fallback to generated one if not found
  const orderNumber = searchParams.get("order") || generateOrderNumber();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <ConfirmationHeader />
      <OrderDetails orderNumber={orderNumber} />
      <ConfirmationActions />
    </div>
  );
}
