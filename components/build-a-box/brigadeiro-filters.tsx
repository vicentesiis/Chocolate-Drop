"use client";

import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BRIGADEIROS } from "@/lib/data/products";

interface BrigadeiroFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function BrigadeiroFilters({
  searchTerm,
  onSearchChange,
  activeTab,
  onTabChange,
}: BrigadeiroFiltersProps) {
  // Count brigadeiros by category
  const regularCount = BRIGADEIROS.filter((b) => !b.isSeasonal).length;
  const seasonalCount = BRIGADEIROS.filter((b) => b.isSeasonal).length;

  return (
    <div className={`
      space-y-4
      sm:space-y-6
    `}>
      {/* Search Bar */}
      <div className={`
        flex flex-col gap-3
        sm:flex-row sm:items-center sm:justify-between
      `}>
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar brigadeiros..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 pr-10 pl-10 text-base"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className={`
                absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors
                hover:text-gray-600
              `}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Results Badge */}
        {searchTerm && (
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            Buscando: "{searchTerm}"
          </Badge>
        )}
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid h-11 w-full max-w-md grid-cols-2">
          <TabsTrigger value="regular" className="flex items-center gap-2 text-sm font-medium">
            Clásicos
            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
              {regularCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="seasonal" className="flex items-center gap-2 text-sm font-medium">
            Temporada
            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
              {seasonalCount}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}