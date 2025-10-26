import type { Event } from "@/lib/types/event";

export enum EventStatus {
  LEAD = "lead",
  CONTACTADO = "contactado",
  CONFIRMADO = "confirmado",
  FINALIZADO = "finalizado",
  CANCELADO = "cancelado",
}

export const statusVariants = {
  [EventStatus.LEAD]: "pending",
  [EventStatus.CONTACTADO]: "info",
  [EventStatus.CONFIRMADO]: "processing",
  [EventStatus.FINALIZADO]: "completed",
  [EventStatus.CANCELADO]: "destructive",
} as const;

export const statusLabels = {
  [EventStatus.LEAD]: "Lead",
  [EventStatus.CONTACTADO]: "Contactado",
  [EventStatus.CONFIRMADO]: "Confirmado",
  [EventStatus.FINALIZADO]: "Finalizado",
  [EventStatus.CANCELADO]: "Cancelado",
};

export const generateEventFilterTabs = (events: Event[]) => [
  { count: events.length, label: "Todos", value: "all" },
  {
    count: events.filter((event) => event.status === EventStatus.LEAD).length,
    label: statusLabels[EventStatus.LEAD],
    value: EventStatus.LEAD,
  },
  {
    count: events.filter((event) => event.status === EventStatus.CONTACTADO)
      .length,
    label: statusLabels[EventStatus.CONTACTADO],
    value: EventStatus.CONTACTADO,
  },
  {
    count: events.filter((event) => event.status === EventStatus.CONFIRMADO)
      .length,
    label: statusLabels[EventStatus.CONFIRMADO],
    value: EventStatus.CONFIRMADO,
  },
  {
    count: events.filter((event) => event.status === EventStatus.FINALIZADO)
      .length,
    label: statusLabels[EventStatus.FINALIZADO],
    value: EventStatus.FINALIZADO,
  },
  {
    count: events.filter((event) => event.status === EventStatus.CANCELADO)
      .length,
    label: statusLabels[EventStatus.CANCELADO],
    value: EventStatus.CANCELADO,
  },
];
