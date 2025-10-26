"use client";

import type { Order } from "@/lib/types/order";

import { DataTable } from "@/components/shared";
import { FilterTabs } from "@/components/shared/filter-tabs";
import { ExpandedProducts } from "@/components/shared/table/cells/expanded-products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrderColumns } from "@/hooks/order/use-order-columns";
import { useOrders } from "@/hooks/order/use-orders";
import { useIsMobile } from "@/hooks/use-mobile";
import { generateOrderFilterTabs } from "@/lib/constants/order-constants";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

export function OrderSection() {
  const isMobile = useIsMobile();
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

  // Get reusable table columns
  const columns = useOrderColumns({
    onStatusChange: updateStatus,
    updatingOrder,
  });

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
    <div
      className={`
        container mx-auto px-2 py-4
        sm:px-4 sm:py-8
      `}
    >
      <Card>
        <CardHeader
          className={`
            px-4 py-4
            sm:px-6 sm:py-6
          `}
        >
          <div
            className={`
              flex flex-col gap-3
              sm:flex-row sm:items-center sm:justify-between sm:gap-0
            `}
          >
            <CardTitle
              className={`
                text-xl font-bold
                sm:text-2xl
              `}
            >
              Gestión de Pedidos
            </CardTitle>
            <Button
              className={`
                self-start
                sm:self-auto
              `}
              onClick={loadOrders}
              size="sm"
              variant="outline"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              <span
                className={`
                  hidden
                  sm:inline
                `}
              >
                Actualizar
              </span>
              <span className="sm:hidden">Refresh</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent
          className={`
            space-y-2 p-4 pt-0
            sm:space-y-6 sm:p-6 sm:pt-0
          `}
        >
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
            expandedContent={(order: Order) => (
              <ExpandedProducts items={order.items} />
            )}
            getRowKey={(order: Order) => order.id || order.orderNumber || ""}
            onSearchChange={setSearchTerm}
            searchPlaceholder={
              isMobile
                ? "Buscar pedido..."
                : " Buscar por # de pedido o nombre del cliente..."
            }
            searchTerm={searchTerm}
          />
        </CardContent>
      </Card>
    </div>
  );
}
