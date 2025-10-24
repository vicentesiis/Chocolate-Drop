import type { Event } from "@/lib/types/quote-event-types";

import {
  Card,
  CardContent,
  CardDescription,
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
import { cn } from "@/lib/utils";
import { pesos } from "@/lib/utils/quote-event-utils";
import { MapPin, PartyPopper, ShoppingBasket, Wallet } from "lucide-react";

interface StickySummaryProps {
  deposit: number;
  event: Event;
  subtotal: number;
}

export function StickySummary({
  deposit,
  event,
  subtotal,
}: StickySummaryProps) {
  const eventTypeLabel = EVENT_TYPES.find((t) => t.id === event.type)?.label;

  return (
    <div className="sticky top-24">
      <Card className={cn(`overflow-hidden border shadow-lg`)}>
        <div className="border-b bg-muted/40 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Tu cotización</CardTitle>
              <CardDescription className="text-xs">
                Resumen en tiempo real
              </CardDescription>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="grid gap-3 text-sm">
            {/* Evento */}
            <div>
              <div className="mb-1 flex items-center gap-2 font-medium">
                <PartyPopper className="h-4 w-4 text-muted-foreground" />
                Evento
              </div>
              <div className="text-muted-foreground">
                {event.date ? (
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>
                        {event.city} ·{" "}
                        <span className="text-foreground">
                          {eventTypeLabel}
                        </span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>Completa los detalles</div>
                )}
              </div>
            </div>

            <Separator />

            {/* Productos */}
            <div className="space-y-1">
              <div className="mb-1 flex items-center gap-2 font-medium">
                <ShoppingBasket className="h-4 w-4 text-muted-foreground" />
                Tu selección
              </div>

              {event.qtyPastelitos > 0 ? (
                <div className="flex items-center justify-between">
                  <span>Pastelitos x {event.qtyPastelitos}</span>
                  <span className="font-medium">
                    {pesos(event.qtyPastelitos * UNIT_PRICE_PASTELITOS)}
                  </span>
                </div>
              ) : null}

              {event.qtyBrigadeiros > 0 ? (
                <div className="flex items-center justify-between">
                  <span>Brigadeiros x {event.qtyBrigadeiros}</span>
                  <span className="font-medium">
                    {pesos(event.qtyBrigadeiros * UNIT_PRICE_BRIGADEIROS)}
                  </span>
                </div>
              ) : null}

              {event.qtyPastelitos === 0 && event.qtyBrigadeiros === 0 && (
                <div className="text-muted-foreground">
                  Agrega cantidades para ver aquí.
                </div>
              )}

              {event.withCart && (
                <div className="flex items-center justify-between">
                  <span>Carrito de postres ({SERVICE_HOURS}h)</span>
                  <span className="font-medium">
                    {pesos(CART_RENTAL_PRICE)}
                  </span>
                </div>
              )}
            </div>

            <Separator />

            {/* Totales */}
            <div className="space-y-1">
              <div className="mb-1 flex items-center gap-2 font-medium">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                Totales
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{pesos(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between text-base">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-primary">
                  {pesos(subtotal)}
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Anticipo 50%</span>
                <span>{pesos(deposit)}</span>
              </div>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Anticipo del 50% para confirmar fecha.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
