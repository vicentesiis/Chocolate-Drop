"use client";

import type { Order } from "@/lib/types/order";

import {
  CustomerCell,
  DataTable,
  DateCell,
  OrderNumberCell,
  PriceCell,
  ProductsCell,
  StatusCell,
} from "@/components/shared";
import { FilterTabs } from "@/components/shared/filter-tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrders } from "@/hooks/use-orders";
import { generateOrderFilterTabs } from "@/lib/constants/order-constants";
import { RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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

  const filterTabs = generateOrderFilterTabs(orders);

  // Define table columns
  const columns = useMemo(
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
              updateStatus(order.orderNumber || order.id!, status)
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
    [updateStatus, updatingOrder],
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-6xl">
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Cargando pedidos...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                Gestión de Pedidos
              </CardTitle>
              <Button onClick={loadOrders} size="sm" variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Actualizar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filter Tabs */}
            <FilterTabs
              onValueChange={setSelectedStatus}
              tabs={filterTabs}
              value={selectedStatus}
            />

            {/* Orders Table */}
            <DataTable
              columns={columns}
              data={filteredOrders}
              emptyMessage={
                searchTerm || selectedStatus !== "all"
                  ? "No se encontraron pedidos con los filtros aplicados"
                  : "No hay pedidos disponibles"
              }
              getRowKey={(order: Order) => order.id || order.orderNumber || ""}
              loading={loading}
              onRefresh={loadOrders}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Buscar por número de pedido o nombre del cliente..."
              searchTerm={searchTerm}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
