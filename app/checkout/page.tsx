"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutPage() {
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock cart data - in a real app, this would come from context/state
  const mockCartItems = [
    { id: 1, name: "Brigadeiro Tradicional", quantity: 12, price: 180 },
    { id: 2, name: "Brigadeiro de Oreo", quantity: 6, price: 120 },
  ];

  const totalPrice = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmPurchase = async () => {
    if (!customerData.name.trim() || !customerData.phone.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Redirect to confirmation page
    window.location.href = "/checkout/confirmation";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al carrito
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>

      {/* Order Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resumen del Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockCartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                </div>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t pt-3 flex justify-between items-center font-semibold text-lg">
              <span>Total:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Información de Contacto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre Completo *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={customerData.name}
              onChange={handleInputChange}
              placeholder="Ingresa tu nombre completo"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={customerData.phone}
              onChange={handleInputChange}
              placeholder="Ingresa tu número de teléfono"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Confirm Button */}
      <Button onClick={handleConfirmPurchase} disabled={isSubmitting} className="w-full" size="lg">
        {isSubmitting ? "Procesando..." : "Confirmar Compra"}
      </Button>
    </div>
  );
}
