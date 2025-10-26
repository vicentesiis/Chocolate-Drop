"use client";

import type { Event } from "@/lib/types/event";
import type { Order } from "@/lib/types/order";

import {
  DateFilter,
  type DateFilterOption,
  getDateRange,
  StatsCard,
  StatusPieChart,
  TopBrigadeiros,
  UpcomingEvents,
} from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { eventService } from "@/lib/services/event-service";
import { orderService } from "@/lib/services/order-service";
import {
  calculateEventStats,
  calculateOrderStats,
  filterDataByDate,
  getEventStatusData,
  getMostRequestedBrigadeiros,
  getOrderStatusData,
} from "@/lib/utils/dashboard-utils";
import {
  Calendar,
  CheckCircle,
  DollarSign,
  Package,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const formatDateRangeTitle = (filter: DateFilterOption): string => {
  if (filter === "all") {
    return " Todos los datos";
  }

  const { end, start } = getDateRange(filter);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  switch (filter) {
    case "month":
      return ` ${start.toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric",
      })}`;
    case "quarter":
      return ` Q${Math.floor(start.getMonth() / 3) + 1} ${start.getFullYear()}`;
    case "today":
      return ` ${formatDate(start)}`;
    case "week":
      return ` ${formatDate(start)} - ${formatDate(end)}`;
    case "year":
      return ` ${start.getFullYear()}`;
    default:
      return "???";
  }
};

export default function DashboardHome() {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [dateFilter, setDateFilter] = useState<DateFilterOption>("month");
  const [loading, setLoading] = useState(true);

  // Filtered data based on date selection
  const filteredOrders = filterDataByDate(allOrders, dateFilter);
  const filteredEvents = filterDataByDate(allEvents, dateFilter);

  // Calculate stats
  const orderStats = calculateOrderStats(filteredOrders);
  const eventStats = calculateEventStats(filteredEvents);

  // Chart data
  const orderStatusData = getOrderStatusData(filteredOrders);
  const eventStatusData = getEventStatusData(filteredEvents);

  // Most requested brigadeiros
  const mostRequestedBrigadeiros = getMostRequestedBrigadeiros(
    filteredOrders,
    5,
  );

  // Unique customers
  const uniqueCustomers = new Set([
    ...filteredEvents.map((e) => e.customer.phone),
    ...filteredOrders.map((o) => o.customer.phone),
  ]).size;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [orders, events] = await Promise.all([
          orderService.getAllOrdersSorted(),
          eventService.getAllEventsSorted(),
        ]);

        setAllOrders(orders);
        setAllEvents(events);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div
        className={`
          min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50
          p-6
        `}
      >
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 rounded bg-gray-200" />
            <div
              className={`
                grid grid-cols-1 gap-4
                md:grid-cols-3
              `}
            >
              {[...Array(4)].map((_, i) => (
                <div className="h-32 rounded bg-gray-200" key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50
        p-6
      `}
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header with Date Filter */}
        <div
          className={`
            flex flex-col items-start justify-between gap-4
            sm:flex-row sm:items-center
          `}
        >
          <h1 className="text-3xl font-bold text-gray-900">
            {formatDateRangeTitle(dateFilter)}
          </h1>
          <DateFilter onChange={setDateFilter} value={dateFilter} />
        </div>

        {/* General Stats */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Resumen General
          </h2>

          <div
            className={`
              grid grid-cols-1 gap-4
              md:grid-cols-3
            `}
          >
            <StatsCard
              icon={Users}
              subtitle="En el período seleccionado"
              title="Clientes Únicos"
              value={uniqueCustomers}
            />
            <StatsCard
              icon={DollarSign}
              subtitle="Órdenes + Eventos"
              title="Ingresos Totales"
              value={`$${(orderStats.totalRevenue + eventStats.totalRevenue).toLocaleString()}`}
            />
            <StatsCard
              icon={TrendingUp}
              subtitle="Órdenes y eventos"
              title="Actividad Total"
              value={orderStats.total + eventStats.total}
            />
          </div>
        </div>

        {/* Orders Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-800">Órdenes</h2>
          </div>

          {/* Order Stats Cards */}
          <div
            className={`
              grid grid-cols-1 gap-4
              md:grid-cols-3
            `}
          >
            <StatsCard
              icon={Package}
              subtitle={`${orderStats.pending} pendientes`}
              title="Total Órdenes"
              value={orderStats.total}
            />
            <StatsCard
              icon={DollarSign}
              subtitle="Órdenes entregadas"
              title="Ingresos Órdenes"
              value={`$${orderStats.totalRevenue.toLocaleString()}`}
            />
            <StatsCard
              icon={TrendingUp}
              subtitle="Valor promedio"
              title="Promedio por Orden"
              value={`$${orderStats.averageOrderValue.toFixed(0)}`}
            />
          </div>

          {/* Order Status Chart and Top Brigadeiros */}
          <div
            className={`
              grid grid-cols-1 gap-6
              lg:grid-cols-2
            `}
          >
            <Card>
              <CardHeader>
                <CardTitle>Estado de Órdenes</CardTitle>
              </CardHeader>
              <CardContent>
                <StatusPieChart
                  className="w-full"
                  data={orderStatusData}
                  legendPosition="bottom"
                  size="lg"
                />
              </CardContent>
            </Card>

            <TopBrigadeiros brigadeiros={mostRequestedBrigadeiros} />
          </div>
        </div>

        {/* Events Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-800">Eventos</h2>
          </div>

          {/* Event Stats Cards */}
          <div
            className={`
              grid grid-cols-1 gap-4
              md:grid-cols-3
            `}
          >
            <StatsCard
              icon={Calendar}
              subtitle={`${eventStats.leads} leads nuevos`}
              title="Total Eventos"
              value={eventStats.total}
            />
            <StatsCard
              icon={DollarSign}
              subtitle="Eventos finalizados"
              title="Ingresos Eventos"
              value={`$${eventStats.totalRevenue.toLocaleString()}`}
            />
            <StatsCard
              icon={TrendingUp}
              subtitle="Valor promedio"
              title="Promedio por Evento"
              value={`$${eventStats.averageEventValue.toFixed(0)}`}
            />
          </div>

          {/* Event Status Chart and Upcoming Events */}
          <div
            className={`
              grid grid-cols-1 gap-6
              lg:grid-cols-2
            `}
          >
            <Card>
              <CardHeader>
                <CardTitle>Estado de Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <StatusPieChart
                  className="w-full"
                  data={eventStatusData}
                  legendPosition="bottom"
                  size="lg"
                />
              </CardContent>
            </Card>

            <UpcomingEvents events={filteredEvents} />
          </div>
        </div>
      </div>
    </div>
  );
}
