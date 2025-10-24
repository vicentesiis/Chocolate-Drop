import type { EventDetails } from "@/lib/types/quote-event-types";

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
  Wallet,
} from "lucide-react";

interface SummaryDetailsProps {
  balance: number;
  deposit: number;
  event: EventDetails;
  qtyBrigadeiros: number;
  qtyPastelitos: number;
  subtotal: number;
  total: number;
  withCart: boolean;
}

export function SummaryDetails({
  balance,
  deposit,
  event,
  qtyBrigadeiros,
  qtyPastelitos,
  subtotal,
  total,
  withCart,
}: SummaryDetailsProps) {
  const eventTypeLabel =
    EVENT_TYPES.find((t) => t.id === event.type)?.label ?? "-";

  return (
    <div className="grid gap-2 text-[15px] leading-snug">
      {/* Evento */}
      <section
        className={`
          rounded-lg border p-4
          md:p-5
        `}
      >
        <div className="mb-2 flex items-center gap-2">
          <PartyPopper className="!size-5 text-muted-foreground" />
          <h3 className="text-base font-semibold text-foreground">
            Detalles del evento
          </h3>
        </div>

        <div className="grid gap-1.5 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>Fecha:</span>
            <span className="font-medium text-foreground">
              {event.date || "-"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>Ciudad:</span>
            <span className="font-medium text-foreground">
              {event.city || "-"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingBasket className="h-3.5 w-3.5" />
            <span>Tipo:</span>
            <span
              className={`
                rounded-full bg-muted px-2 py-0.5 text-xs font-medium
                text-foreground
              `}
            >
              {eventTypeLabel}
            </span>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section
        className={`
          rounded-lg border p-4
          md:p-5
        `}
      >
        <div className="mb-2 flex items-center gap-2">
          <ShoppingBasket className="!size-5 text-muted-foreground" />
          <h3 className="text-base font-semibold text-foreground">Productos</h3>
        </div>

        <div className="grid gap-1.5">
          {qtyPastelitos > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Pastelitos x {qtyPastelitos}
              </span>
              <span className="font-medium">
                {pesos(qtyPastelitos * UNIT_PRICE_PASTELITOS)}
              </span>
            </div>
          )}
          {qtyBrigadeiros > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Brigadeiros x {qtyBrigadeiros}
              </span>
              <span className="font-medium">
                {pesos(qtyBrigadeiros * UNIT_PRICE_BRIGADEIROS)}
              </span>
            </div>
          )}
          {withCart && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Carrito de postres ({SERVICE_HOURS}h)
              </span>
              <span className="font-medium">{pesos(CART_RENTAL_PRICE)}</span>
            </div>
          )}
        </div>
      </section>

      {/* Totales */}
      <section
        className={`
          rounded-lg border p-4
          md:p-5
        `}
      >
        <div className="mb-2 flex items-center gap-2">
          <Wallet className="!size-5 text-muted-foreground" />
          <h3 className="text-base font-semibold text-foreground">Totales</h3>
        </div>

        <div className="space-y-1.5">
          <div
            className={`
              flex items-center justify-between text-sm text-muted-foreground
            `}
          >
            <span>Subtotal</span>
            <span className="font-medium text-foreground">
              {pesos(subtotal)}
            </span>
          </div>

          <Separator className="my-2" />

          <div
            className={`
              flex items-center justify-between text-base font-semibold
            `}
          >
            <span>Total</span>
            <span className="text-foreground">{pesos(total)}</span>
          </div>

          <Separator className="my-2" />

          <div className="grid gap-1 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Anticipo (50%)</span>
              <span>{pesos(deposit)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Saldo</span>
              <span>{pesos(balance)}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
