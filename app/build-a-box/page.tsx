"use client";

import { useState, useRef, useEffect } from "react";
import { BoxSelector } from "@/components/build-a-box/box-selector";
import { BrigadeiroGrid } from "@/components/build-a-box/brigadeiro-grid";
import { ProgressHeader } from "@/components/build-a-box/progress-header";
import { BrigadeiroTabs, CategoryFilter } from "@/components/build-a-box/brigadeiro-filters";
import { useCart } from "@/lib/contexts/cart-context";
import { BOXES, BRIGADEIROS } from "@/lib/data/products";
import type { Brigadeiro } from "@/lib/types/brigadeiro";

export default function BuildABoxPage() {
  const [selectedBox, setSelectedBox] = useState<(typeof BOXES)[0] | null>(null);
  const [brigadeiros, setBrigadeiros] = useState<Brigadeiro[]>([]);
  const [activeTab, setActiveTab] = useState("regular");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToCart } = useCart();
  const brigadeirosRef = useRef<HTMLDivElement>(null);

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

  // Scroll to brigadeiros section when a box is selected
  useEffect(() => {
    if (selectedBox && brigadeirosRef.current) {
      // Use a longer timeout to ensure DOM has fully rendered
      setTimeout(() => {
        brigadeirosRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 200);
    }
  }, [selectedBox]);

  // Reset category filter when switching tabs
  useEffect(() => {
    setSelectedCategory("all");
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Main Content Container */}
      <div className={`
        mx-auto max-w-7xl px-4
        sm:px-6
        lg:px-8
      `}>
        {/* Header Section */}
        <div className={`
          py-6
          sm:py-8
          lg:py-12
        `}>
          <div className="text-center">
            <h1 className={`
              mb-3 text-2xl font-bold text-gray-900
              sm:mb-4 sm:text-3xl
              lg:text-4xl
            `}>
              {selectedBox ? "Selecciona tus Brigadeiros" : "Elige tu Empaque"}
            </h1>
            <p className={`
              mx-auto max-w-2xl px-4 text-base text-gray-600
              sm:text-lg
            `}>
              {selectedBox
                ? `Completa tu ${selectedBox.name} con los sabores que más te gusten`
                : "Primero selecciona el tamaño de caja que prefieras"}
            </p>
          </div>
        </div>

        {/* Box Selector Grid */}
        <div className={`
          mb-8
          sm:mb-12
        `}>
          <BoxSelector boxes={BOXES} selectedBox={selectedBox} onSelectBox={setSelectedBox} />
        </div>
      </div>

      {/* Sticky Progress Header - Only shown when box is selected */}
      {selectedBox && (
        <div className={`
          sticky top-16 z-40 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm
          sm:top-20
        `}>
          <div className={`
            mx-auto max-w-7xl px-4
            sm:px-6
            lg:px-8
          `}>
            <ProgressHeader
              selectedBox={selectedBox}
              totalSelected={totalSelected}
              progressPercentage={progressPercentage}
              isBoxFull={isBoxFull}
              onClearSelection={clearSelection}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      )}

      {/* Filters and Brigadeiro Grid - Only shown when box is selected */}
      {selectedBox && (
        <div className={`
          mx-auto max-w-7xl px-4
          sm:px-6
          lg:px-8
        `}>
          {/* Filters Section */}
          <div ref={brigadeirosRef} className={`
            py-6
            sm:py-8
          `}>
            <div className={`
              flex flex-col gap-4
              sm:flex-row sm:items-end sm:justify-between
            `}>
              {/* Tabs on the left */}
              <div className="flex-shrink-0">
                <BrigadeiroTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </div>
              
              {/* Category filter on the right - Only show for regular brigadeiros */}
              {activeTab === "regular" && (
                <div className="flex-shrink-0">
                  <CategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Brigadeiro Grid */}
          <div className={`
            pb-8
            sm:pb-12
            lg:pb-16
          `}>
            <BrigadeiroGrid
              selectedBox={selectedBox}
              brigadeiros={brigadeiros}
              totalSelected={totalSelected}
              onUpdateQuantity={updateDessertQuantity}
              activeTab={activeTab}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
}
