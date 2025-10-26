import type { Order } from "@/lib/types/order";

export enum OrderStatus {
  CANCELLED = "cancelled",
  CONFIRMED = "confirmed",
  DELIVERED = "delivered",
  PENDING = "pending",
  PREPARING = "preparing",
  READY = "ready",
}

export const statusVariants = {
  [OrderStatus.CANCELLED]: "destructive",
  [OrderStatus.CONFIRMED]: "processing",
  [OrderStatus.DELIVERED]: "completed",
  [OrderStatus.PENDING]: "pending",
  [OrderStatus.PREPARING]: "info",
  [OrderStatus.READY]: "ready",
} as const;

export const statusLabels = {
  [OrderStatus.CANCELLED]: "Cancelado",
  [OrderStatus.CONFIRMED]: "Confirmado",
  [OrderStatus.DELIVERED]: "Entregado",
  [OrderStatus.PENDING]: "Pendiente",
  [OrderStatus.PREPARING]: "Preparando",
  [OrderStatus.READY]: "Listo",
};

export const generateOrderFilterTabs = (orders: Order[]) => [
  { count: orders.length, label: "Todos", value: "all" },
  {
    count: orders.filter((order) => order.status === OrderStatus.PENDING)
      .length,
    label: statusLabels[OrderStatus.PENDING],
    value: OrderStatus.PENDING,
  },
  {
    count: orders.filter((order) => order.status === OrderStatus.CONFIRMED)
      .length,
    label: statusLabels[OrderStatus.CONFIRMED],
    value: OrderStatus.CONFIRMED,
  },
  {
    count: orders.filter((order) => order.status === OrderStatus.PREPARING)
      .length,
    label: statusLabels[OrderStatus.PREPARING],
    value: OrderStatus.PREPARING,
  },
  {
    count: orders.filter((order) => order.status === OrderStatus.READY).length,
    label: statusLabels[OrderStatus.READY],
    value: OrderStatus.READY,
  },
  {
    count: orders.filter((order) => order.status === OrderStatus.DELIVERED)
      .length,
    label: statusLabels[OrderStatus.DELIVERED],
    value: OrderStatus.DELIVERED,
  },
  {
    count: orders.filter((order) => order.status === OrderStatus.CANCELLED)
      .length,
    label: statusLabels[OrderStatus.CANCELLED],
    value: OrderStatus.CANCELLED,
  },
];
