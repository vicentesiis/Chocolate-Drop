import type { Event } from "@/lib/types/event";

import { createDefaultEvent } from "@/lib/schemas/event-details";
import {
  calculateEventTotals,
  calculateTotalPieces,
} from "@/lib/utils/event-utils";
import { meetsMinimumRequirements } from "@/lib/utils/event-utils";
import { useCallback, useMemo, useState } from "react";

export function useQuoteEvent() {
  const [event, setEvent] = useState<Event>(createDefaultEvent);

  // Memoized event change handler to prevent infinite loops
  const handleEventChange = useCallback((newEvent: Partial<Event>) => {
    setEvent((prev) => ({ ...prev, ...newEvent }));
  }, []);

  // Memoized calculations
  const piecesTotal = useMemo(
    () => calculateTotalPieces(event.products),
    [event.products],
  );

  const { subtotalProducts, subtotalExtras, total } = useMemo(
    () => calculateEventTotals(event.products),
    [event.products],
  );

  // Validation
  const isProductsStepValid = useMemo(
    () => meetsMinimumRequirements(event.products),
    [event.products],
  );

  return {
    event,
    handleEventChange,
    isProductsStepValid,
    piecesTotal,
    subtotalExtras,
    subtotalProducts,
    total,
  };
}
