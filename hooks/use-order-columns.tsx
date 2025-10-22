import type { Order } from "@/lib/types/order";
import {
  CustomerCell,
  DateCell,
  OrderNumberCell,
  PriceCell,
  ProductsCell,
  StatusCell,
} from "@/components/shared";
import { useMemo } from "react";

interface UseOrderColumnsProps {
  onStatusChange: (orderId: string, status: Order["status"]) => void;
  updatingOrder?: string | null;
}

export function useOrderColumns({
  onStatusChange,
  updatingOrder,
}: UseOrderColumnsProps) {
  return useMemo(
    () => [
      {
        header: "Pedido",
        key: "orderNumber",
        render: (order: Order) => (
          <OrderNumberCell id={order.id} orderNumber={order.orderNumber} />
        ),
      },
      {
        header: "Cliente",
        key: "customer",
        render: (order: Order) => (
          <CustomerCell
            name={order.customer.name}
            phone={order.customer.phone}
          />
        ),
      },
      {
        header: "Productos",
        key: "products",
        render: (order: Order) => <ProductsCell items={order.items} />,
      },
      {
        header: "Total",
        key: "total",
        render: (order: Order) => <PriceCell amount={order.total} />,
      },
      {
        header: "Estado",
        key: "status",
        render: (order: Order) => (
          <StatusCell
            disabled={updatingOrder === (order.orderNumber || order.id)}
            onStatusChange={(status: Order["status"]) =>
              onStatusChange(order.orderNumber || order.id!, status)
            }
            status={order.status}
          />
        ),
      },
      {
        header: "Fecha",
        key: "date",
        render: (order: Order) => <DateCell date={order.createdAt} />,
      },
    ],
    [onStatusChange, updatingOrder],
  );
}
