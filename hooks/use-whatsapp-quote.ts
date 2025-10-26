import type { Event } from "@/lib/types/event";

import {
  CART_RENTAL_PRICE,
  EVENT_TYPES,
  SERVICE_HOURS,
  UNIT_PRICE_BRIGADEIROS,
  UNIT_PRICE_PASTELITOS,
} from "@/lib/constants/quote-event-constants";
import { pesos } from "@/lib/utils/quote-event-utils";
import { useMemo } from "react";

export function useWhatsAppQuote(event: Event, total: number) {
  const whatsAppMessage = useMemo(() => {
    const lines = [
      `Hola, me interesa una cotización para evento:`,
      `• Ciudad: ${event.details.city || "-"}`,
      `• Tipo: ${EVENT_TYPES.find((t) => t.id === event.details.type)?.label || "-"}`,
      event.products.qtyPastelitos
        ? `• Pastelitos: ${event.products.qtyPastelitos} x $${UNIT_PRICE_PASTELITOS}`
        : undefined,
      event.products.qtyBrigadeiros
        ? `• Brigadeiros: ${event.products.qtyBrigadeiros} x $${UNIT_PRICE_BRIGADEIROS}`
        : undefined,
      event.products.withCart
        ? `• Carrito: ${pesos(CART_RENTAL_PRICE)} (${SERVICE_HOURS}h)`
        : undefined,
      `Total: ${pesos(total)}`,
      `Anticipo 50%: ${pesos(total * 0.5)}`,
    ].filter(Boolean);
    return encodeURIComponent(lines.join("\n"));
  }, [event, total]);

  return whatsAppMessage;
}
