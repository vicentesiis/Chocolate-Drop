import { OrderSection } from "@/components/dashboard";

export default function OrderPage() {
  return (
    <div
      className={`
        min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50
        px-2
        sm:px-0
      `}
    >
      <OrderSection />
    </div>
  );
}
