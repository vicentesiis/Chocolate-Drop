import { getAllOrders, updateOrderStatus } from "@/lib/services";
import type { Order } from "@/lib/types/order";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      const ordersData = await getAllOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Error al cargar los pedidos");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = async (
    orderNumber: string,
    newStatus: Order["status"],
  ) => {
    try {
      setUpdatingOrder(orderNumber);
      await updateOrderStatus(orderNumber, newStatus);

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderNumber || order.orderNumber === orderNumber
            ? { ...order, status: newStatus, updatedAt: new Date() }
            : order,
        ),
      );

      toast.success("Estado del pedido actualizado");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error al actualizar el estado del pedido");
    } finally {
      setUpdatingOrder(null);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    orders,
    loading,
    updatingOrder,
    loadOrders,
    updateStatus,
  };
};
