import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function DeliveryInfo() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-3 font-semibold">Información de Entrega</h3>
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
            <span className="font-medium text-green-600">Desde $75</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Horario de servicio:</span>
            <div className="text-right">
              <div className="font-medium">10 am a 7 pm</div>
              <div className="text-xs text-muted-foreground">
                Lunes a viernes
              </div>
              <div className="text-xs text-muted-foreground">
                Sábados de 10 am a 6 pm
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Área de entrega:</span>
            <span className="text-right font-medium">
              Solo área metropolitana
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
