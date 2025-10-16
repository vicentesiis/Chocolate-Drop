import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderDetailsProps {
  orderNumber: string;
}

export function OrderDetails({ orderNumber }: OrderDetailsProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Detalles del Pedido</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Número de Pedido:</span>
            <span className="font-mono">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Estado:</span>
            <span className="text-green-600">Confirmado</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Fecha:</span>
            <span>{new Date().toLocaleDateString("es-MX")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
