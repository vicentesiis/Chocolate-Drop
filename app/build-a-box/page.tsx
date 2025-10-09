"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BoxSelector } from "@/components/build-a-box/box-selector";
import { BrigadeiroGrid } from "@/components/build-a-box/brigadeiro-grid";
import { ProgressHeader } from "@/components/build-a-box/progress-header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/contexts/cart-context";
import { BOXES, BRIGADEIROS } from "@/lib/data/products";
import type { Brigadeiro } from "@/lib/types/brigadeiro";

export default function BuildABoxPage() {
  const [selectedBox, setSelectedBox] = useState<(typeof BOXES)[0] | null>(null);
  const [brigadeiros, setBrigadeiros] = useState<Brigadeiro[]>([]);
  const { addToCart } = useCart();

  const totalSelected = brigadeiros.reduce((sum, dessert) => sum + dessert.quantity, 0);
  const progressPercentage = selectedBox ? (totalSelected / selectedBox.capacity) * 100 : 0;
  const isBoxFull = selectedBox ? totalSelected === selectedBox.capacity : false;

  const updateDessertQuantity = (dessertId: string, change: number) => {
    if (!selectedBox) return;

    setBrigadeiros((prev) => {
      const existing = prev.find((d) => d.id === dessertId);
      const currentTotal = prev.reduce((sum, d) => sum + d.quantity, 0);

      if (existing) {
        const newQuantity = Math.max(0, existing.quantity + change);
        const newTotal = currentTotal - existing.quantity + newQuantity;

        if (newTotal > selectedBox.capacity) return prev;

        if (newQuantity === 0) {
          return prev.filter((d) => d.id !== dessertId);
        }

        return prev.map((d) => (d.id === dessertId ? { ...d, quantity: newQuantity } : d));
      } else if (change > 0 && currentTotal < selectedBox.capacity) {
        const dessert = BRIGADEIROS.find((d) => d.id === dessertId);
        if (dessert) {
          return [...prev, { id: dessertId, name: dessert.name, quantity: 1 }];
        }
      }

      return prev;
    });
  };

  const handleAddToCart = () => {
    if (!selectedBox || !isBoxFull) return;

    const cartItem = {
      boxType: selectedBox,
      brigadeiros: [...brigadeiros],
      totalPrice: selectedBox.price,
    };

    addToCart(cartItem);
    setSelectedBox(null);
    setBrigadeiros([]);
  };

  const clearSelection = () => {
    setBrigadeiros([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Arma tu Caja</h1>
                <p className="text-sm text-muted-foreground">
                  Personaliza tu selección de brigadeiros
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Progress Header */}
        {selectedBox && (
          <ProgressHeader
            selectedBox={selectedBox}
            totalSelected={totalSelected}
            progressPercentage={progressPercentage}
            isBoxFull={isBoxFull}
            onClearSelection={clearSelection}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Sub Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">
            {selectedBox ? "Selecciona tus Brigadeiros" : "Elige tu Empaque"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {selectedBox
              ? `Completa tu ${selectedBox.name} con los sabores que más te gusten`
              : "Primero selecciona el tamaño de caja que prefieras"}
          </p>
        </div>

        {/* Box Selector */}
        <BoxSelector boxes={BOXES} selectedBox={selectedBox} onSelectBox={setSelectedBox} />

        {/* Brigadeiro Grid */}
        {selectedBox && (
          <BrigadeiroGrid
            selectedBox={selectedBox}
            brigadeiros={brigadeiros}
            totalSelected={totalSelected}
            onUpdateQuantity={updateDessertQuantity}
          />
        )}
      </div>
    </div>
  );
}
