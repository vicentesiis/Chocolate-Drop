"use client";

import type { Order } from "@/lib/types/order";

import { FilterTabs } from "@/components/shared/filter-tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrders } from "@/hooks/use-orders";
import {
  generateOrderFilterTabs,
  statusLabels,
  statusVariants,
} from "@/lib/constants/order-constants";
import { formatDate, formatPrice } from "@/lib/utils/format-utils";
import { RefreshCw, Search } from "lucide-react";
import { useEffect, useState } from "react";

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
            {/* Search Bar */}
            <div className="relative">
              <Search
                className={`
                  absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform
                  text-muted-foreground
                `}
              />
              <Input
                className="pl-10"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por número de pedido o nombre del cliente..."
                value={searchTerm}
              />
            </div>

            {/* Filter Tabs */}
            <FilterTabs
              onValueChange={setSelectedStatus}
              tabs={filterTabs}
              value={selectedStatus}
            />

            {/* Orders Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        className="py-8 text-center text-muted-foreground"
                        colSpan={6}
                      >
                        {searchTerm || selectedStatus !== "all"
                          ? "No se encontraron pedidos con los filtros aplicados"
                          : "No hay pedidos disponibles"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          #{order.orderNumber || order.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {order.customer.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {order.customer.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {order.items.map((item, index) => (
                              <div className="text-sm" key={index}>
                                {item.boxType.name} - {item.brigadeiros.length}{" "}
                                brigadeiros
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatPrice(order.total)}
                        </TableCell>
                        <TableCell>
                          <Select
                            disabled={
                              updatingOrder === (order.orderNumber || order.id)
                            }
                            onValueChange={(value) =>
                              updateStatus(
                                order.orderNumber || order.id!,
                                value as Order["status"],
                              )
                            }
                            value={order.status}
                          >
                            <SelectTrigger className="w-32">
                              <Badge variant={statusVariants[order.status]}>
                                {statusLabels[order.status]}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(statusLabels).map(
                                ([status, label]) => (
                                  <SelectItem key={status} value={status}>
                                    <Badge
                                      variant={
                                        statusVariants[
                                          status as keyof typeof statusVariants
                                        ]
                                      }
                                    >
                                      {label}
                                    </Badge>
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(order.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
