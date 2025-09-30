"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

const BOXES = [
  { id: "box-4", name: "Box of 4", capacity: 4, price: 280, image: "/boxes/box.png" },
  { id: "box-6", name: "Box of 6", capacity: 6, price: 340, image: "/boxes/box.png" },
  { id: "box-10", name: "Box of 10", capacity: 10, price: 450, image: "/boxes/box.png" },
];

const DESSERTS = [
  {
    id: "cheesecake-guayaba",
    name: "Brigadeiro Cheesecake de Guayaba",
    description:
      "Chocolate White Callebaut con cheesecake de guayaba, cobertura de chocolate belga blanco y hoja de oro comestible.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "kinder",
    name: "Brigadeiro Kinder",
    description:
      "Chocolate 52% cacao belga relleno de Kinder Bueno, envuelto en mezcla de Nido y Kinder White.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "ferrero",
    name: "Brigadeiro de Ferrero",
    description:
      "Chocolate 52% cacao belga relleno de avellana, cubierto con Nutella para un acabado crujiente y cremoso.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "triple-chocolate",
    name: "Brigadeiro Triple Chocolate",
    description:
      "Combinación de chocolate Milk Callebaut, 52% cacao y 70% cacao, adornado con hoja de oro comestible.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "oreo",
    name: "Brigadeiro de Oreo",
    description:
      "Chocolate White Callebaut combinado con trocitos de Oreo para una experiencia cremosa y crujiente.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "belga",
    name: "Brigadeiro Belga",
    description: "Delicado chocolate Milk Callebaut, envuelto en sprinkles de chocolate con leche.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "dos-amores-nutella",
    name: "Brigadeiro Dos Amores con Nutella",
    description: "Brigadeiro combinado de fresa y chocolate 54% cacao relleno de Nutella.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "elote",
    name: "Brigadeiro de Elote",
    description: "Cheesecake de elote relleno de dulce de leche, envuelto en coco tostado.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "cacao70",
    name: "Brigadeiro 70% Cacao",
    description: "Chocolate belga 70% cacao, cubierto con sprinkles de chocolate semi amargo.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "sorpresa-uva",
    name: "Brigadeiro Sorpresa de Uva",
    description: "Chocolate White Callebaut con relleno de uva.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "pistache",
    name: "Brigadeiro de Pistache",
    description: "Chocolate White Callebaut relleno de pistache con un toque de sal.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "mazapan",
    name: "Brigadeiro de Mazapán",
    description: "Relleno de chocolate semi amargo 54% cacao Callebaut.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "frambuesa-macadamia",
    name: "Brigadeiro de Frambuesa y Macadamia",
    description: "Chocolate Ruby Callebaut con relleno de frambuesa fresca, cubierto de macadamia.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "platano-dulce-leche",
    name: "Brigadeiro de Plátano con Dulce de Leche",
    description: "Chocolate White Callebaut, plátano caramelizado y corazón de dulce de leche.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "fresa",
    name: "Brigadeiro de Fresa",
    description: "Chocolate White Callebaut con fresa, envuelto en Nido.",
    image: "/brigadeiros/brigadeiro.png",
  },
  {
    id: "lotus",
    name: "Brigadeiro de Lotus",
    description: "Chocolate White Callebaut con Lotus Biscoff creamy, envuelto en galleta.",
    image: "/brigadeiros/brigadeiro.png",
  },
];

interface SelectedDessert {
  id: string;
  quantity: number;
}

interface CartItem {
  boxType: (typeof BOXES)[0];
  selectedDesserts: SelectedDessert[];
  totalPrice: number;
}

export default function BuildABox() {
  const [selectedBox, setSelectedBox] = useState<(typeof BOXES)[0] | null>(null);
  const [selectedDesserts, setSelectedDesserts] = useState<SelectedDessert[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
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

  const renderPickerContent = () => (
    <div className="space-y-4">
      {selectedBox && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{selectedBox.name}</h3>
            <Badge variant="secondary">
              {totalSelected}/{selectedBox.capacity}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      )}

      <ScrollArea
        className={`
          h-[70vh]
          md:h-[600px]
        `}
      >
        <div
          className={`
            grid grid-cols-2 gap-4 p-1
            sm:grid-cols-4
          `}
        >
          {DESSERTS.map((dessert) => {
            const selected = selectedDesserts.find((d) => d.id === dessert.id);
            const quantity = selected?.quantity || 0;

            return (
              <Card key={dessert.id} className="overflow-hidden">
                <div className="relative aspect-square">
                  <img
                    src={dessert.image}
                    alt={dessert.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="mb-1 text-sm font-medium">{dessert.name}</h4>
                  <p className="mb-3 text-xs text-muted-foreground">{dessert.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateDessertQuantity(dessert.id, -1)}
                        disabled={quantity === 0}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center text-sm font-medium">{quantity}</span>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateDessertQuantity(dessert.id, 1)}
                        disabled={selectedBox ? totalSelected >= selectedBox.capacity : true}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      <div className="flex justify-end border-t pt-4">
        <Button
          onClick={addToCart}
          disabled={!isBoxFull}
          className={`
            w-full
            sm:w-auto
          `}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart - ${selectedBox?.price}
        </Button>
      </div>
    </div>
  );

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Build Your Perfect Box</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Choose your box size and fill it with your favorite brigadeiros. Each box is carefully
            crafted with premium ingredients.
          </p>
        </div>

        <div
          className={`
            mb-8 grid grid-cols-1 gap-6
            md:grid-cols-3
          `}
        >
          {BOXES.map((box) => (
            <Card
              key={box.id}
              className={`
                overflow-hidden transition-shadow
                hover:shadow-lg
              `}
            >
              <div className="relative aspect-square">
                <img src={box.image} alt={box.name} className="h-full w-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{box.name}</CardTitle>
                <CardDescription>Capacity: {box.capacity} brigadeiros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${box.price}</span>

                  {isMobile ? (
                    <Drawer
                      open={isPickerOpen && selectedBox?.id === box.id}
                      onOpenChange={setIsPickerOpen}
                    >
                      <DrawerTrigger asChild>
                        <Button onClick={() => openPicker(box)}>Build Box</Button>
                      </DrawerTrigger>
                      <DrawerContent className="max-h-[95vh]">
                        <DrawerHeader>
                          <DrawerTitle>Build Your {box.name}</DrawerTitle>
                        </DrawerHeader>
                        <div className="px-4 pb-4">{renderPickerContent()}</div>
                      </DrawerContent>
                    </Drawer>
                  ) : (
                    <Dialog
                      open={isPickerOpen && selectedBox?.id === box.id}
                      onOpenChange={setIsPickerOpen}
                    >
                      <DialogTrigger asChild>
                        <Button onClick={() => openPicker(box)}>Build Box</Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[95vh] max-w-7xl overflow-hidden">
                        <DialogHeader>
                          <DialogTitle>Build Your {box.name}</DialogTitle>
                        </DialogHeader>
                        {renderPickerContent()}
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {cart.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Cart ({cart.length} items)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={`cart-${index}`}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.boxType.image}
                        alt={item.boxType.name}
                        className="h-16 w-16 rounded object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{item.boxType.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.selectedDesserts.length} varieties
                        </p>
                      </div>
                    </div>
                    <span className="font-bold">${item.totalPrice}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-lg font-semibold">
                    Total: ${cart.reduce((sum, item) => sum + item.totalPrice, 0)}
                  </span>
                  <Button size="lg">Proceed to Checkout</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
