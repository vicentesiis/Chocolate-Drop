import { PedidosSection } from "@/components/dashboard";

export default function PedidosPage() {
  return (
    <div className={`
      min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50
    `}>
      <PedidosSection />
    </div>
  );
}