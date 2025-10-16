import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DeliveryInfo() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-3">Información de Entrega</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Método:</span>
            <Badge variant="secondary">Entrega a domicilio</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tiempo:</span>
            <span className="font-medium">2-4 horas</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Costo:</span>
            <span className="font-medium text-green-600">Gratis</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
