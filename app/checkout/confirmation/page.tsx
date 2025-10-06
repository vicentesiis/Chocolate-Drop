import {
  ConfirmationActions,
  ConfirmationHeader,
  NextSteps,
  OrderDetails,
} from "@/components/checkout";
import { generateOrderNumber } from "@/lib/order-utils";

export default function ConfirmationPage() {
  // In a real app, you'd get this from URL params or state
  const orderNumber = generateOrderNumber();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <ConfirmationHeader />
      <OrderDetails orderNumber={orderNumber} />
      <NextSteps />
      <ConfirmationActions />
    </div>
  );
}
