import { eventService } from "@/lib/services/event-service";
import type { Event } from "@/lib/types/event";
import type { EventStatus } from "@/lib/constants/event-constants";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingEvent, setUpdatingEvent] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      const eventsData = await eventService.getAllEventsSorted();
      setEvents(eventsData);
    } catch (error) {
      console.error("Error loading events:", error);
      toast.error("Error al cargar los eventos");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = async (eventNumber: string, newStatus: EventStatus) => {
    try {
      setUpdatingEvent(eventNumber);
      await eventService.updateEventStatus(eventNumber, newStatus);

      // Update local state
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventNumber
            ? { ...event, status: newStatus, updatedAt: new Date() }
            : event,
        ),
      );

      toast.success("Estado del evento actualizado");
    } catch (error) {
      console.error("Error updating event status:", error);
      toast.error("Error al actualizar el estado del evento");
    } finally {
      setUpdatingEvent(null);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    events,
    loading,
    updatingEvent,
    loadEvents,
    updateStatus,
  };
};
