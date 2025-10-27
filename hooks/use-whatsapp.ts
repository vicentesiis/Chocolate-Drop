import type { Event } from "@/lib/types/event";
import type { Order } from "@/lib/types/order";

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

export function useWhatsAppOrder(order: null | Order) {
  const whatsAppMessage = useMemo(() => {
    if (!order) return "";

    const formatPrice = (price: number) => `$${price.toLocaleString("es-MX")}`;

    const lines = [
      `¡Hola! Acabo de realizar un pedido en ChocolateDrop `,
      ``,
      ` *Detalles del Pedido:*`,
      `• ID de la órden: ${order.orderNumber}`,
      `• Cliente: ${order.customer.name}`,
      `• Teléfono: ${order.customer.phone}`,
      ``,
      ` *Productos:*`,
    ];

    // Add each cart item details
    for (const [index, item] of order.items.entries()) {
      lines.push(`*Caja ${index + 1}: ${item.boxType.name}*`);
      lines.push(`• Capacidad: ${item.boxType.capacity} brigadeiros`);
      lines.push(`• Precio caja: ${formatPrice(item.boxType.price)}`);
      lines.push(`• Brigadeiros seleccionados:`);

      for (const brigadeiro of item.brigadeiros) {
        lines.push(`  - ${brigadeiro.name} x${brigadeiro.quantity}`);
      }
      lines.push(``);
    }

    lines.push(`*Total del Pedido: ${formatPrice(order.total)}*`);
    lines.push(``);
    lines.push(`¿Podrían confirmar la disponibilidad y coordinar la entrega?`);
    lines.push(`¡Gracias!`);

    return encodeURIComponent(lines.join("\n"));
  }, [order]);

  return whatsAppMessage;
}
