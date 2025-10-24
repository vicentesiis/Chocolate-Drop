import type { Order } from "@/lib/types/order";

export const statusVariants = {
  cancelled: "destructive",
  confirmed: "processing",
  delivered: "completed",
  pending: "pending",
  preparing: "info",
  ready: "ready",
} as const;

export const statusLabels = {
  cancelled: "Cancelado",
  confirmed: "Confirmado",
  delivered: "Entregado",
  pending: "Pendiente",
  preparing: "Preparando",
  ready: "Listo",
};

export const generateOrderFilterTabs = (orders: Order[]) => [
  { count: orders.length, label: "Todos", value: "all" },
  {
    count: orders.filter((order) => order.status === "pending").length,
    label: statusLabels.pending,
    value: "pending",
  },
  {
    count: orders.filter((order) => order.status === "confirmed").length,
    label: statusLabels.confirmed,
    value: "confirmed",
  },
  {
    count: orders.filter((order) => order.status === "preparing").length,
    label: statusLabels.preparing,
    value: "preparing",
  },
  {
    count: orders.filter((order) => order.status === "ready").length,
    label: statusLabels.ready,
    value: "ready",
  },
  {
    count: orders.filter((order) => order.status === "delivered").length,
    label: statusLabels.delivered,
    value: "delivered",
  },
  {
    count: orders.filter((order) => order.status === "cancelled").length,
    label: statusLabels.cancelled,
    value: "cancelled",
  },
];
