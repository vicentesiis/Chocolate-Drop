"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BRIGADEIROS } from "@/lib/data/products";

interface BrigadeiroTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export function BrigadeiroTabs({ activeTab, onTabChange }: BrigadeiroTabsProps) {
  // Count brigadeiros by category
  const regularCount = BRIGADEIROS.filter((b) => !b.isSeasonal).length;
  const seasonalCount = BRIGADEIROS.filter((b) => b.isSeasonal).length;

  return (
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
  );
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  // Get unique categories from regular brigadeiros
  const categories = Array.from(
    new Set(
      BRIGADEIROS.filter((b) => !b.isSeasonal && b.category)
        .map((b) => b.category!)
    )
  ).sort();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Filtrar por categoría
      </label>
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full max-w-xs">
          <SelectValue placeholder="Todas las categorías" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// Keep the original component for backward compatibility
interface BrigadeiroFiltersProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export function BrigadeiroFilters({
  activeTab,
  onTabChange,
  selectedCategory,
  onCategoryChange,
}: BrigadeiroFiltersProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <BrigadeiroTabs activeTab={activeTab} onTabChange={onTabChange} />
      {activeTab === "regular" && (
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
      )}
    </div>
  );
}