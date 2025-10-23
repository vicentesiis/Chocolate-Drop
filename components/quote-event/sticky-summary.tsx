import type { EventDetails } from "@/lib/types/quote-event-types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CART_RENTAL_PRICE,
  EVENT_TYPES,
  SERVICE_HOURS,
  UNIT_PRICE_BRIGADEIROS,
  UNIT_PRICE_PASTELITOS,
} from "@/lib/constants/quote-event-constants";
import { pesos } from "@/lib/utils/quote-event-utils";

interface StickySummaryProps {
  balance: number;
  deposit: number;
  discount: number;
  event: EventDetails;
  promoPct: number;
  qtyBrigadeiros: number;
  qtyPastelitos: number;
  subtotal: number;
  withCart: boolean;
}

export function StickySummary({
  balance,
  deposit,
  discount,
  event,
  promoPct,
  qtyBrigadeiros,
  qtyPastelitos,
  subtotal,
  withCart,
}: StickySummaryProps) {
  return (
    <div className="sticky top-6">
      <Card>
        <CardHeader>
          <CardTitle>Tu cotización</CardTitle>
          <CardDescription>Resumen en tiempo real</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-sm">
            <div>
              <div className="mb-1 font-medium">Evento</div>
              <div className="text-muted-foreground">
                {event.date ? (
                  <div>
                    <div>
                      {event.date} {event.time}
                    </div>
                    <div>
                      {event.city} ·{" "}
                      {EVENT_TYPES.find((t) => t.id === event.type)?.label}
                    </div>
                  </div>
                ) : (
                  <div>Completa los detalles</div>
                )}
              </div>
            </div>
            <Separator />
            <div className="space-y-1">
              <div className="font-medium">Productos</div>
              {qtyPastelitos > 0 ? (
                <div className="flex items-center justify-between">
                  <span>Pastelitos x {qtyPastelitos}</span>
                  <span>{pesos(qtyPastelitos * UNIT_PRICE_PASTELITOS)}</span>
                </div>
              ) : null}
              {qtyBrigadeiros > 0 ? (
                <div className="flex items-center justify-between">
                  <span>Brigadeiros x {qtyBrigadeiros}</span>
                  <span>{pesos(qtyBrigadeiros * UNIT_PRICE_BRIGADEIROS)}</span>
                </div>
              ) : null}
              {qtyPastelitos === 0 && qtyBrigadeiros === 0 && (
                <div className="text-muted-foreground">
                  Agrega cantidades para ver aquí.
                </div>
              )}
            </div>
            {withCart && (
              <div className="space-y-1">
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Carrito/Barra ({SERVICE_HOURS}h)</span>
                  <span>{pesos(CART_RENTAL_PRICE)}</span>
                </div>
              </div>
            )}
            <Separator />
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{pesos(subtotal)}</span>
              </div>
              {promoPct > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Descuento ({promoPct}%)
                  </span>
                  <span>-{pesos(discount)}</span>
                </div>
              )}
              <div
                className={`
                  flex items-center justify-between text-base font-semibold
                `}
              >
                <span>Total</span>
                <span>{pesos(subtotal - (promoPct ? discount : 0))}</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Anticipo 50%</span>
                <span>{pesos(deposit)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Saldo</span>
                <span>{pesos(balance)}</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Anticipo del 50% para confirmar fecha. Precios sujetos a
              disponibilidad.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}