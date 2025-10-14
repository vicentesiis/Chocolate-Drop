"use client";

import type { BOXES } from "@/lib/data/products";
import { BRIGADEIROS } from "@/lib/data/products";
import type { Brigadeiro } from "@/lib/types/brigadeiro";
import { BrigadeiroCard } from "./brigadeiro-card";

interface BrigadeiroGridProps {
  selectedBox: (typeof BOXES)[0];
  brigadeiros: Brigadeiro[];
  totalSelected: number;
  onUpdateQuantity: (dessertId: string, change: number) => void;
  searchTerm: string;
  activeTab: string;
}

export function BrigadeiroGrid({
  selectedBox,
  brigadeiros,
  totalSelected,
  onUpdateQuantity,
  searchTerm,
  activeTab,
}: BrigadeiroGridProps) {
  // Filter brigadeiros by season and search
  const filteredBrigadeiros = BRIGADEIROS.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "regular" ? !b.isSeasonal : b.isSeasonal;
    return matchesSearch && matchesTab;
  });

  if (filteredBrigadeiros.length === 0) {
    return (
      <div className="py-12 sm:py-16 text-center">
        <div className="max-w-md mx-auto">
          <p className="text-gray-500 text-base sm:text-lg mb-2">
            No se encontraron brigadeiros
          </p>
          {searchTerm && (
            <p className="text-gray-400 text-sm">
              Intenta con otro término de búsqueda o cambia de categoría
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {filteredBrigadeiros.map((dessert) => {
        const selected = brigadeiros.find((d) => d.id === dessert.id);
        const quantity = selected?.quantity || 0;
        const isAddDisabled = totalSelected >= selectedBox.capacity;

        return (
          <BrigadeiroCard
            key={dessert.id}
            dessert={dessert}
            quantity={quantity}
            onUpdateQuantity={onUpdateQuantity}
            isAddDisabled={isAddDisabled}
          />
        );
      })}
    </div>
  );
}
