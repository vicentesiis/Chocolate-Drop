import type { EventStatus } from "@/lib/constants/event-constants";
import type { Event } from "@/lib/types/event";

import {
  CustomerCell,
  DateCell,
  EventStatusCell,
  PriceCell,
} from "@/components/shared";
import { useMemo } from "react";

interface UseEventColumnsProps {
  onStatusChange: (eventId: string, status: EventStatus) => void;
  updatingEvent?: null | string;
}

export function useEventColumns({
  onStatusChange,
  updatingEvent,
}: UseEventColumnsProps) {
  return useMemo(
    () => [
      {
        header: "Evento",
        key: "eventNumber",
        render: (event: Event) => (
          <div className="font-mono text-sm font-medium">#{event.id}</div>
        ),
        width: "120px",
      },
      {
        align: "left" as const,
        header: "Cliente",
        key: "customer",
        render: (event: Event) => (
          <CustomerCell
            name={event.customer.name}
            phone={event.customer.phone}
          />
        ),
        width: "150px",
      },
      {
        align: "left" as const,
        header: "Tipo",
        key: "type",
        render: (event: Event) => (
          <div className="text-sm">{event.details.type}</div>
        ),
        width: "120px",
      },
      {
        align: "left" as const,
        header: "Ciudad",
        key: "city",
        render: (event: Event) => (
          <div className="text-sm text-muted-foreground">
            {event.details.city}
          </div>
        ),
        width: "100px",
      },
      {
        align: "center" as const,
        header: "Productos",
        key: "products",
        render: (event: Event) => (
          <div className="text-sm">
            <div>Brigadeiros: {event.products.qtyBrigadeiros}</div>
            <div>Pastelitos: {event.products.qtyPastelitos}</div>
            {event.products.withCart && (
              <div className="text-xs text-muted-foreground">Con carrito</div>
            )}
          </div>
        ),
        width: "120px",
      },
      {
        align: "center" as const,
        header: "Total",
        key: "total",
        render: (event: Event) => <PriceCell amount={event.totals.total} />,
        width: "100px",
      },
      {
        align: "center" as const,
        header: "Estatus",
        key: "status",
        render: (event: Event) => (
          <EventStatusCell
            disabled={updatingEvent === event.id}
            onStatusChange={(status: EventStatus) =>
              onStatusChange(event.id!, status)
            }
            status={event.status}
          />
        ),
        width: "0px",
      },
      {
        align: "center" as const,
        header: "Fecha",
        key: "date",
        render: (event: Event) => <DateCell date={event.createdAt} />,
        width: "120px",
      },
    ],
    [onStatusChange, updatingEvent],
  );
}
