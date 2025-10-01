"use client";

import { useState } from "react";
import { BoxCard } from "./box-card";
import { CartSummary } from "./cart-summary";
import { BOXES } from "./data";
import { PickerContent } from "./picker-content";
import type { CartItem, SelectedDessert } from "./types";

export default function BuildABox() {
  const [selectedBox, setSelectedBox] = useState<(typeof BOXES)[0] | null>(null);
  const [selectedDesserts, setSelectedDesserts] = useState<SelectedDessert[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

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

  const addToCart = () => {
    if (!selectedBox || !isBoxFull) return;

    const cartItem: CartItem = {
      boxType: selectedBox,
      selectedDesserts: [...selectedDesserts],
      totalPrice: selectedBox.price,
    };

    setCart((prev) => [...prev, cartItem]);
    setSelectedBox(null);
    setSelectedDesserts([]);
    setIsPickerOpen(false);
  };

  const openPicker = (box: (typeof BOXES)[0]) => {
    setSelectedBox(box);
    setSelectedDesserts([]);
    setIsPickerOpen(true);
  };

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Nuestros Empaques</h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Elige el tamaño de la caja y añade los brigadeiros que más te gusten. Hechos con
            ingredientes premium para deleitarte en cada bocado.
          </p>
        </div>

        <div
          className={`
            grid grid-cols-1 gap-6
            md:grid-cols-3
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
                onAddToCart={addToCart}
              />
            </BoxCard>
          ))}
        </div>

        <CartSummary cart={cart} />
      </div>
    </section>
  );
}
