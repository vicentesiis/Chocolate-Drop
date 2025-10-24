import type { EventDetails } from "@/lib/types/quote-event-types";

import { Separator } from "@/components/ui/separator";
import {
  CART_RENTAL_PRICE,
  EVENT_TYPES,
  SERVICE_HOURS,
  UNIT_PRICE_BRIGADEIROS,
  UNIT_PRICE_PASTELITOS,
} from "@/lib/constants/quote-event-constants";
import { pesos } from "@/lib/utils/quote-event-utils";

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
  return (
    <div className="grid gap-6">
      <div className="grid gap-2 text-sm">
        <div className="font-medium">Evento</div>
        <div className="text-muted-foreground">
          Fecha: {event.date || "-"} · Hora: {event.time || "-"}
        </div>
        <div className="text-muted-foreground">
          Ciudad: {event.city || "-"} · Tipo:{" "}
          {EVENT_TYPES.find((t) => t.id === event.type)?.label}
        </div>
        {event.guests ? (
          <div className="text-muted-foreground">Invitados: {event.guests}</div>
        ) : null}
      </div>

      <div className="grid gap-2 text-sm">
        <div className="font-medium">Productos</div>
        {qtyPastelitos > 0 && (
          <div>
            Pastelitos: {qtyPastelitos} x {pesos(UNIT_PRICE_PASTELITOS)}
          </div>
        )}
        {qtyBrigadeiros > 0 && (
          <div>
            Brigadeiros: {qtyBrigadeiros} x {pesos(UNIT_PRICE_BRIGADEIROS)}
          </div>
        )}
        {withCart && (
          <div>
            Carrito: {pesos(CART_RENTAL_PRICE)} (incluye montaje, desmontaje y{" "}
            {SERVICE_HOURS}h)
          </div>
        )}
      </div>

      <div className="grid gap-1 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{pesos(subtotal)}</span>
        </div>

        <div
          className={`flex items-center justify-between text-base font-semibold`}
        >
          <span>Total</span>
          <span>{pesos(total)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Anticipo 50%</span>
          <span>{pesos(deposit)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Saldo</span>
          <span>{pesos(balance)}</span>
        </div>
      </div>

      <div className="grid gap-2">
        <div className="font-medium">Contacto</div>
        <div className="text-muted-foreground">{event.name || "-"}</div>
        <div className="text-muted-foreground">{event.phone || "-"}</div>
      </div>
    </div>
  );
}
