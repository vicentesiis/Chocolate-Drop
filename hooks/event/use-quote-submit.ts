import type { Event } from "@/lib/types/event";

import { createEvent } from "@/lib/services/event-service";
import { calculateEventTotals } from "@/lib/utils/event-utils";
import { validateEventForSubmission } from "@/lib/utils/event-validation";
import { useCallback, useState } from "react";

export function useQuoteSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (event: Event) => {
      if (isSubmitting) return;

      setIsSubmitting(true);

      try {
        // Calculate totals before submission
        const calculatedTotals = calculateEventTotals(event.products);
        const eventWithTotals = {
          ...event,
          totals: calculatedTotals,
        };

        // Validate event data for submission
        const validationErrors = validateEventForSubmission(eventWithTotals);
        if (validationErrors.length > 0) {
          throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
        }

        // Submit to Firebase
        const eventNumber = await createEvent(eventWithTotals);

        alert(
          `Cotización enviada exitosamente. Número de evento: ${eventNumber}`,
        );

        return eventNumber;
      } catch (error) {
        console.error("Error submitting event:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";
        alert(`Error al enviar la cotización: ${errorMessage}`);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting],
  );

  return {
    handleSubmit,
    isSubmitting,
  };
}
