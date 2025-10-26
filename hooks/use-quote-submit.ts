import type { Event } from "@/lib/types/event";

import { useCallback } from "react";

export function useQuoteSubmit() {
  const handleSubmit = useCallback((event: Event) => {
    try {
      // Prepare the complete event data for Firestore
      const eventForFirestore = {
        ...event,
        createdAt: new Date(),
      };

      // Here you could POST to /api/quotes with eventForFirestore
      console.log("Event data ready for Firestore:", eventForFirestore);
      alert("Cotización enviada");
    } catch (error) {
      console.error("Error preparing event data:", error);
      alert("Error al procesar la cotización. Intenta de nuevo.");
    }
  }, []);

  return { handleSubmit };
}
