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
      <div className={`
        py-12 text-center
        sm:py-16
      `}>
        <div className="mx-auto max-w-md">
          <p className={`
            mb-2 text-base text-gray-500
            sm:text-lg
          `}>
            No se encontraron brigadeiros
          </p>
          {searchTerm && (
            <p className="text-sm text-gray-400">
              Intenta con otro término de búsqueda o cambia de categoría
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`
      grid grid-cols-2 gap-4
      sm:grid-cols-3 sm:gap-6
      md:grid-cols-4
      lg:grid-cols-5
      xl:grid-cols-6
    `}>
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
