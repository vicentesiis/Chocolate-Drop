"use client";

import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/lib/contexts/cart-context";
import { BoxCard } from "./box-card";
import { CartSummary } from "./cart-summary";
import { BOXES } from "./data";
import { MobileBoxCard } from "./mobile-box-card";
import { PickerContent } from "./picker-content";
import type { SelectedDessert } from "./types";

export default function BuildABox() {
  const [selectedBox, setSelectedBox] = useState<(typeof BOXES)[0] | null>(null);
  const [selectedDesserts, setSelectedDesserts] = useState<SelectedDessert[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const { cart, addToCart } = useCart();
  const isMobile = useIsMobile();

  const totalSelected = selectedDesserts.reduce((sum, dessert) => sum + dessert.quantity, 0);
  const progressPercentage = selectedBox ? (totalSelected / selectedBox.capacity) * 100 : 0;
  const isBoxFull = selectedBox ? totalSelected === selectedBox.capacity : false;

  const updateDessertQuantity = (dessertId: string, change: number) => {
    if (!selectedBox) return;

    setSelectedDesserts((prev) => {
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
        return [...prev, { id: dessertId, quantity: 1 }];
      }

      return prev;
    });
  };

  const handleAddToCart = () => {
    if (!selectedBox || !isBoxFull) return;

    const cartItem = {
      boxType: selectedBox,
      selectedDesserts: [...selectedDesserts],
      totalPrice: selectedBox.price,
    };

    addToCart(cartItem);
    setSelectedBox(null);
    setSelectedDesserts([]);
    setIsPickerOpen(false);
  };

  const openPicker = (box: (typeof BOXES)[0]) => {
    setSelectedBox(box);
    setSelectedDesserts([]);
    setIsPickerOpen(true);
  };

  const clearSelection = () => {
    setSelectedDesserts([]);
  };

  return (
    <section
      className={`
        flex items-center px-4 py-8
        sm:py-16
      `}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className={`
            mb-8 text-center
            sm:mb-12
          `}
        >
          <h2
            className={`
              mb-3 text-2xl font-bold
              sm:mb-4 sm:text-3xl
            `}
          >
            Nuestros Empaques
          </h2>
          <p
            className={`
              mx-auto max-w-2xl text-lg text-muted-foreground
              sm:text-xl
            `}
          >
            Elige el tamaño de la caja y añade los brigadeiros que más te gusten. Hechos con
            ingredientes premium para deleitarte en cada bocado.
          </p>
        </div>

        {isMobile ? (
          <div className="space-y-3">
            {BOXES.map((box) => (
              <MobileBoxCard
                key={box.id}
                box={box}
                isPickerOpen={isPickerOpen}
                selectedBoxId={selectedBox?.id || null}
                onOpenPicker={openPicker}
                onPickerOpenChange={setIsPickerOpen}
              >
                <PickerContent
                  selectedBox={selectedBox}
                  selectedDesserts={selectedDesserts}
                  totalSelected={totalSelected}
                  progressPercentage={progressPercentage}
                  isBoxFull={isBoxFull}
                  onUpdateQuantity={updateDessertQuantity}
                  onAddToCart={handleAddToCart}
                  onClearSelection={clearSelection}
                />
              </MobileBoxCard>
            ))}
          </div>
        ) : (
          <div
            className={`
              grid grid-cols-2 gap-4
              sm:grid-cols-2 sm:gap-6
              lg:grid-cols-3 lg:gap-6
              xl:grid-cols-3 xl:gap-12
            `}
          >
            {BOXES.map((box) => (
              <BoxCard
                key={box.id}
                box={box}
                isPickerOpen={isPickerOpen}
                selectedBoxId={selectedBox?.id || null}
                onOpenPicker={openPicker}
                onPickerOpenChange={setIsPickerOpen}
              >
                <PickerContent
                  selectedBox={selectedBox}
                  selectedDesserts={selectedDesserts}
                  totalSelected={totalSelected}
                  progressPercentage={progressPercentage}
                  isBoxFull={isBoxFull}
                  onUpdateQuantity={updateDessertQuantity}
                  onAddToCart={handleAddToCart}
                  onClearSelection={clearSelection}
                />
              </BoxCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
