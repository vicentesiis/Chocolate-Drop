"use client";

import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BOXES } from "@/lib/data/products";
import { BRIGADEIROS } from "@/lib/data/products";
import type { Brigadeiro } from "@/lib/types/brigadeiro";
import { BrigadeiroCard } from "./brigadeiro-card";

interface BrigadeiroGridProps {
  selectedBox: (typeof BOXES)[0];
  brigadeiros: Brigadeiro[];
  totalSelected: number;
  onUpdateQuantity: (dessertId: string, change: number) => void;
}

export function BrigadeiroGrid({
  selectedBox,
  brigadeiros,
  totalSelected,
  onUpdateQuantity,
}: BrigadeiroGridProps) {
  const [activeTab, setActiveTab] = useState("regular");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filter brigadeiros by season and search
  const regularBrigadeiros = BRIGADEIROS.filter(
    (b) => !b.isSeasonal && b.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const seasonalBrigadeiros = BRIGADEIROS.filter(
    (b) => b.isSeasonal && b.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const renderGrid = (products: typeof BRIGADEIROS) => (
    <div
      className={`
        grid gap-4
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
      `}
    >
      {products.map((dessert) => {
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

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div
        className={`
          flex flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between
        `}
      >
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar brigadeiros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>

          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Buscando: &ldquo;{searchTerm}&rdquo;
              <button
                onClick={() => setSearchTerm("")}
                className={`
                  ml-1
                  hover:text-destructive
                `}
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      </div>
      {`
                  
                 
                `}

      {/* Tabs for Categories */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="regular" className="gap-2">
            Clásicos
            <Badge variant="secondary" className="text-xs">
              {regularBrigadeiros.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="seasonal" className="gap-2">
            Temporada
            <Badge variant="secondary" className="text-xs">
              {seasonalBrigadeiros.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="regular" className="mt-6">
          {regularBrigadeiros.length > 0 ? (
            renderGrid(regularBrigadeiros)
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No se encontraron brigadeiros clásicos con &ldquo;{searchTerm}&rdquo;
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="seasonal" className="mt-6">
          {seasonalBrigadeiros.length > 0 ? (
            renderGrid(seasonalBrigadeiros)
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No se encontraron brigadeiros de temporada con &ldquo;{searchTerm}&rdquo;
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
