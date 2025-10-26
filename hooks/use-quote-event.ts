import type { Event } from "@/lib/types/event";

import {
  CART_RENTAL_PRICE,
  MIN_BRIGADEIROS,
  MIN_PASTELITOS,
  UNIT_PRICE_BRIGADEIROS,
  UNIT_PRICE_PASTELITOS,
} from "@/lib/constants/quote-event-constants";
import { createDefaultEvent } from "@/lib/schemas/event-details";
import { useCallback, useState } from "react";

export function useQuoteEvent() {
  const [event, setEvent] = useState<Event>(createDefaultEvent);

  // Memoized event change handler to prevent infinite loops
  const handleEventChange = useCallback((newEvent: Partial<Event>) => {
    setEvent((prev) => ({ ...prev, ...newEvent }));
  }, []);

  // Calculations
  const piecesTotal =
    event.products.qtyPastelitos + event.products.qtyBrigadeiros;

  const subtotalProducts =
    event.products.qtyPastelitos * UNIT_PRICE_PASTELITOS +
    event.products.qtyBrigadeiros * UNIT_PRICE_BRIGADEIROS;

  const subtotalExtras = event.products.withCart ? CART_RENTAL_PRICE : 0;
  const total = subtotalProducts + subtotalExtras;

  // Validation
  const isProductsStepValid =
    (event.products.qtyPastelitos === 0 ||
      event.products.qtyPastelitos >= MIN_PASTELITOS) &&
    (event.products.qtyBrigadeiros === 0 ||
      event.products.qtyBrigadeiros >= MIN_BRIGADEIROS) &&
    piecesTotal > 0;

  return {
    event,
    handleEventChange,
    piecesTotal,
    subtotalProducts,
    subtotalExtras,
    total,
    isProductsStepValid,
  };
}
