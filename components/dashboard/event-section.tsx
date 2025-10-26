"use client";

import type { Event } from "@/lib/types/event";

import { DataTable } from "@/components/shared";
import { FilterTabs } from "@/components/shared/filter-tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEventColumns } from "@/hooks/event/use-event-columns";
import { useEvents } from "@/hooks/event/use-events";
import { useIsMobile } from "@/hooks/use-mobile";
import { generateEventFilterTabs } from "@/lib/constants/event-constants";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

export function EventSection() {
  const isMobile = useIsMobile();
  const { loading, loadEvents, events, updateStatus, updatingEvent } =
    useEvents();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter events when search term or status filter changes
  useEffect(() => {
    let filtered = events;

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((event) => event.status === selectedStatus);
    }

    // Filter by search term (event number or customer name)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.id?.toLowerCase().includes(term) ||
          event.customer.name.toLowerCase().includes(term),
      );
    }

    setFilteredEvents(filtered);
  }, [events, selectedStatus, searchTerm]);

  const filterTabs = generateEventFilterTabs(events);

  // Get reusable table columns
  const columns = useEventColumns({
    onStatusChange: updateStatus,
    updatingEvent,
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-6xl">
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Cargando eventos...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={`
        container mx-auto py-4
        sm:px-4 sm:py-8
      `}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle
              className={`
                text-xl font-bold
                sm:text-2xl
              `}
            >
              Gestión de Eventos
            </CardTitle>
            <Button onClick={loadEvents} size="sm" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualizar
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

          {/* Events Table */}
          <DataTable
            columns={columns}
            data={filteredEvents}
            emptyMessage={
              searchTerm || selectedStatus !== "all"
                ? "No se encontraron eventos con los filtros aplicados"
                : "No hay eventos disponibles"
            }
            getRowKey={(event: Event) => event.id || ""}
            onSearchChange={setSearchTerm}
            searchPlaceholder={
              isMobile
                ? "Buscar evento..."
                : "Buscar por # de evento o nombre del cliente..."
            }
            searchTerm={searchTerm}
          />
        </CardContent>
      </Card>
    </div>
  );
}
