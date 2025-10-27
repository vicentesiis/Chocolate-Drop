import type { Event } from "@/lib/types/event";

import { createEvent } from "@/lib/services/event-service";
import { calculateEventTotals } from "@/lib/utils/event-utils";
import { validateEventForSubmission } from "@/lib/utils/event-validation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useQuoteSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEvent, setSubmittedEvent] = useState<Event | null>(null);
  const [eventNumber, setEventNumber] = useState<string>("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

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
        const generatedEventNumber = await createEvent(eventWithTotals);

        // Set state for confirmation dialog
        setSubmittedEvent(eventWithTotals);
        setEventNumber(generatedEventNumber);
        setShowConfirmationDialog(true);

        toast.success("¡Cotización enviada exitosamente!");

        return generatedEventNumber;
      } catch (error) {
        console.error("Error submitting event:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";

        toast.error("Error al enviar la cotización", {
          description: errorMessage,
          action: {
            label: "Reintentar",
            onClick: () => handleSubmit(event),
          },
        });

        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting],
  );

  const closeConfirmationDialog = useCallback(() => {
    setShowConfirmationDialog(false);
    setSubmittedEvent(null);
    setEventNumber("");
  }, []);

  return {
    handleSubmit,
    isSubmitting,
    submittedEvent,
    eventNumber,
    showConfirmationDialog,
    closeConfirmationDialog,
  };
}
