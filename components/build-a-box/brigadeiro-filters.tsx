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
    <div className="space-y-4 sm:space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar brigadeiros..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 h-11 text-base"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Results Badge */}
        {searchTerm && (
          <Badge variant="secondary" className="text-sm px-3 py-1">
            Buscando: "{searchTerm}"
          </Badge>
        )}
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 h-11">
          <TabsTrigger value="regular" className="flex items-center gap-2 text-sm font-medium">
            Clásicos
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              {regularCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="seasonal" className="flex items-center gap-2 text-sm font-medium">
            Temporada
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              {seasonalCount}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}