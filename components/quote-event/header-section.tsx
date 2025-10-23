import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SERVICE_HOURS } from "@/lib/constants/quote-event-constants";

export function HeaderSection() {
  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardHeader className="space-y-3 p-0">
        <CardTitle
          className={`
            font-display text-3xl font-bold tracking-tight
            md:text-5xl
          `}
        >
          Renta de Carrito y Barra de Postres para Eventos
        </CardTitle>
        <CardDescription
          className={`
            text-base
            md:text-lg
          `}
        >
          Haz de tu celebración un momento inolvidable con nuestras opciones de
          renta: el encantador <strong>Carrito de Postres</strong> o la elegante{" "}
          <strong>Barra de Postres</strong>. Arma tu cotización en minutos.
        </CardDescription>
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="secondary">Montaje y desmontaje incluidos</Badge>
          <Badge variant="outline">Atención {SERVICE_HOURS} horas</Badge>
          <Badge variant="outline">Presentación premium</Badge>
        </div>
      </CardHeader>
    </Card>
  );
}