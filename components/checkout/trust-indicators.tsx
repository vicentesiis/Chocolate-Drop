import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, CreditCard, Truck, Clock } from "lucide-react";

export function TrustIndicators() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4 flex items-center">
          <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
          Compra Segura
        </h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            <span>Pago seguro y protegido</span>
          </div>
          <div className="flex items-center">
            <Truck className="h-4 w-4 mr-2" />
            <span>Entrega rápida y confiable</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>Preparado el mismo día</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
