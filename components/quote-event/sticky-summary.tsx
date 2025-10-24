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
import {
  Calendar,
  MapPin,
  PartyPopper,
  ShoppingBasket,
  Sparkles,
  Wallet,
} from "lucide-react";

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

  const formatDate = (d?: Date | string) => {
    if (!d) return "-";
    if (d instanceof Date) return d.toLocaleDateString("es-ES");
    const parsed = new Date(d);
    return Number.isNaN(parsed.getTime())
      ? d
      : parsed.toLocaleDateString("es-ES");
  };

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
                Detalles del evento
              </div>
              <div className="text-muted-foreground">
                <div className="space-y-1">
                  {event.date ? (
                    <div className="ml-2 space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="text-foreground">{event.city} </span>
                      </div>
                      <div className={`flex items-center gap-2`}>
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="text-foreground">
                          {formatDate(event.date)}{" "}
                        </span>
                      </div>
                      <div className={`flex items-center gap-2`}>
                        <Sparkles className="h-3.5 w-3.5" />
                        <span className="text-foreground">
                          {eventTypeLabel}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>Completa los detalles</div>
                  )}
                </div>
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
                <div className="ml-2 flex items-center justify-between">
                  <span>Pastelitos x {event.qtyPastelitos}</span>
                  <span className="font-medium">
                    {pesos(event.qtyPastelitos * UNIT_PRICE_PASTELITOS)}
                  </span>
                </div>
              ) : null}

              {event.qtyBrigadeiros > 0 ? (
                <div className="ml-2 flex items-center justify-between">
                  <span>Brigadeiros x {event.qtyBrigadeiros}</span>
                  <span className="font-medium">
                    {pesos(event.qtyBrigadeiros * UNIT_PRICE_BRIGADEIROS)}
                  </span>
                </div>
              ) : null}

              {event.qtyPastelitos === 0 && event.qtyBrigadeiros === 0 && (
                <div className="ml-2 text-muted-foreground">
                  Agrega cantidades para ver aquí.
                </div>
              )}

              {event.withCart && (
                <div className="ml-2 flex items-center justify-between">
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
              <div className="flex items-center justify-between text-base">
                <span
                  className={`
                    flex items-center justify-center gap-2 font-semibold
                  `}
                >
                  <Wallet className={`h-4 w-4 text-muted-foreground`} />
                  Total
                </span>
                <span className="font-semibold text-primary">
                  {pesos(subtotal)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
