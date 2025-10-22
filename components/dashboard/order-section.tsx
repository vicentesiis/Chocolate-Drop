"use client";

import type { Order } from "@/lib/types/order";

import { useOrders } from "@/hooks/use-orders";
import { useEffect, useState } from "react";

const statusColors = {
  cancelled: "bg-red-100 text-red-800",
  confirmed: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  preparing: "bg-purple-100 text-purple-800",
  ready: "bg-orange-100 text-orange-800",
};

const statusLabels = {
  cancelled: "Cancelado",
  confirmed: "Confirmado",
  delivered: "Entregado",
  pending: "Pendiente",
  preparing: "Preparando",
  ready: "Listo",
};

export function OrderSection() {
  const { loading, loadOrders, orders, updateStatus, updatingOrder } =
    useOrders();
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders when search term or status filter changes
  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    // Filter by search term (order number or customer name)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id?.toLowerCase().includes(term) ||
          order.orderNumber?.toLowerCase().includes(term) ||
          order.customer.name.toLowerCase().includes(term),
      );
    }

    setFilteredOrders(filtered);
  }, [orders, selectedStatus, searchTerm]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      currency: "EUR",
      style: "currency",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-center py-12">
            <div className="text-lg text-gray-600">Cargando pedidos...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            Gestión de Pedidos
          </h2>
          <button
            className={`
              rounded-lg bg-orange-600 px-6 py-2 font-medium text-white
              transition-colors
              hover:bg-orange-700
            `}
            onClick={loadOrders}
            type="button"
          >
            Actualizar
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            className={`
              w-full rounded-lg border border-gray-300 px-4 py-2
              focus:border-orange-500 focus:ring-2 focus:ring-orange-200
              focus:outline-none
            `}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por número de pedido o nombre del cliente..."
            type="text"
            value={searchTerm}
          />
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            className={`
              rounded-lg px-4 py-2 font-medium transition-colors
              ${
                selectedStatus === "all"
                  ? "bg-orange-100 text-orange-800"
                  : `
                  text-gray-600
                  hover:text-gray-900
                `
              }
            `}
            onClick={() => setSelectedStatus("all")}
            type="button"
          >
            Todos ({orders.length})
          </button>
          {Object.entries(statusLabels).map(([status, label]) => {
            const count = orders.filter(
              (order) => order.status === status,
            ).length;
            return (
              <button
                className={`
                  rounded-lg px-4 py-2 font-medium transition-colors
                  ${
                    selectedStatus === status
                      ? "bg-orange-100 text-orange-800"
                      : `
                      text-gray-600
                      hover:text-gray-900
                    `
                  }
                `}
                key={status}
                onClick={() => setSelectedStatus(status)}
                type="button"
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className={`
                    px-6 py-3 text-left text-xs font-medium tracking-wider
                    text-gray-500 uppercase
                  `}
                  >
                    Pedido
                  </th>
                  <th
                    className={`
                    px-6 py-3 text-left text-xs font-medium tracking-wider
                    text-gray-500 uppercase
                  `}
                  >
                    Cliente
                  </th>
                  <th
                    className={`
                    px-6 py-3 text-left text-xs font-medium tracking-wider
                    text-gray-500 uppercase
                  `}
                  >
                    Productos
                  </th>
                  <th
                    className={`
                    px-6 py-3 text-left text-xs font-medium tracking-wider
                    text-gray-500 uppercase
                  `}
                  >
                    Total
                  </th>
                  <th
                    className={`
                    px-6 py-3 text-left text-xs font-medium tracking-wider
                    text-gray-500 uppercase
                  `}
                  >
                    Estado
                  </th>
                  <th
                    className={`
                    px-6 py-3 text-left text-xs font-medium tracking-wider
                    text-gray-500 uppercase
                  `}
                  >
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      className="px-6 py-8 text-center text-gray-500"
                      colSpan={6}
                    >
                      {searchTerm || selectedStatus !== "all"
                        ? "No se encontraron pedidos con los filtros aplicados"
                        : "No hay pedidos disponibles"}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr className="hover:bg-gray-50" key={order.id}>
                      <td
                        className={`
                        px-6 py-4 text-sm font-medium whitespace-nowrap
                        text-gray-900
                      `}
                      >
                        #{order.orderNumber || order.id}
                      </td>
                      <td
                        className={`
                        px-6 py-4 text-sm whitespace-nowrap text-gray-900
                      `}
                      >
                        <div>
                          <div className="font-medium">
                            {order.customer.name}
                          </div>
                          <div className="text-gray-500">
                            {order.customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-xs">
                          {order.items.map((item, index) => (
                            <div className="text-sm" key={index}>
                              {item.boxType.name} - {item.brigadeiros.length}{" "}
                              brigadeiros
                            </div>
                          ))}
                        </div>
                      </td>
                      <td
                        className={`
                        px-6 py-4 text-sm font-medium whitespace-nowrap
                        text-gray-900
                      `}
                      >
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className={`
                            inline-flex rounded-full border-0 px-2 py-1 text-xs
                            font-semibold
                            focus:ring-2 focus:ring-orange-200
                            focus:outline-none
                            ${statusColors[order.status]}
                            ${
                              updatingOrder === (order.orderNumber || order.id)
                                ? `
                              cursor-not-allowed opacity-50
                            `
                                : `cursor-pointer`
                            }
                          `}
                          disabled={
                            updatingOrder === (order.orderNumber || order.id)
                          }
                          onChange={(e) =>
                            updateStatus(
                              order.orderNumber || order.id!,
                              e.target.value as Order["status"],
                            )
                          }
                          value={order.status}
                        >
                          {Object.entries(statusLabels).map(
                            ([status, label]) => (
                              <option key={status} value={status}>
                                {label}
                              </option>
                            ),
                          )}
                        </select>
                      </td>
                      <td
                        className={`
                        px-6 py-4 text-sm whitespace-nowrap text-gray-900
                      `}
                      >
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
