import type { DateFilterOption } from "@/components/shared/date-filter";
import type { Event } from "@/lib/types/event";
import type { Order } from "@/lib/types/order";

import { getDateRange } from "@/components/shared/date-filter";
import {
  EventStatus,
  statusLabels as eventStatusLabels,
} from "@/lib/constants/event-constants";
import {
  OrderStatus,
  statusLabels as orderStatusLabels,
} from "@/lib/constants/order-constants";
import { getStatusHexColor } from "@/lib/utils/status-colors";

export function filterDataByDate<T extends { createdAt: Date }>(
  data: T[],
  dateFilter: DateFilterOption,
): T[] {
  if (dateFilter === "all") return data;

  const { end, start } = getDateRange(dateFilter);

  return data.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= start && itemDate <= end;
  });
}

export function getOrderStatusData(orders: Order[]) {
  const statusCounts = orders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    {} as Record<OrderStatus, number>,
  );

  return Object.entries(statusCounts).map(([status, count]) => ({
    color: getStatusHexColor(status as OrderStatus),
    name: orderStatusLabels[status as OrderStatus],
    value: count,
    status: status as OrderStatus,
  }));
}

export function getEventStatusData(events: Event[]) {
  const statusCounts = events.reduce(
    (acc, event) => {
      acc[event.status] = (acc[event.status] || 0) + 1;
      return acc;
    },
    {} as Record<EventStatus, number>,
  );

  return Object.entries(statusCounts).map(([status, count]) => ({
    color: getStatusHexColor(status as EventStatus),
    name: eventStatusLabels[status as EventStatus],
    value: count,
    status: status as EventStatus,
  }));
}

export function calculateOrderStats(orders: Order[]) {
  const total = orders.length;
  const pending = orders.filter(
    (order) => order.status === OrderStatus.PENDING,
  ).length;
  const confirmed = orders.filter(
    (order) => order.status === OrderStatus.CONFIRMED,
  ).length;
  const delivered = orders.filter(
    (order) => order.status === OrderStatus.DELIVERED,
  ).length;
  const totalRevenue = orders
    .filter((order) => order.status === OrderStatus.DELIVERED)
    .reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = delivered > 0 ? totalRevenue / delivered : 0;

  return {
    averageOrderValue,
    confirmed,
    delivered,
    pending,
    total,
    totalRevenue,
  };
}

export function calculateEventStats(events: Event[]) {
  const total = events.length;
  const leads = events.filter(
    (event) => event.status === EventStatus.LEAD,
  ).length;
  const contacted = events.filter(
    (event) => event.status === EventStatus.CONTACTADO,
  ).length;
  const confirmed = events.filter(
    (event) => event.status === EventStatus.CONFIRMADO,
  ).length;
  const finished = events.filter(
    (event) => event.status === EventStatus.FINALIZADO,
  ).length;
  const totalRevenue = events
    .filter((event) => event.status === EventStatus.FINALIZADO)
    .reduce((sum, event) => sum + event.totals.total, 0);
  const averageEventValue = finished > 0 ? totalRevenue / finished : 0;

  return {
    averageEventValue,
    confirmed,
    contacted,
    finished,
    leads,
    total,
    totalRevenue,
  };
}
