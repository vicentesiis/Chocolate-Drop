"use client";

import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BoxCartItem } from "@/components/cart/box-cart-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/contexts/cart-context";

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart, removeFromCart } = useCart();

  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = getTotalPrice();

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

    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear cart after successful purchase
    clearCart();

    // Redirect to confirmation page
    window.location.href = "/checkout/confirmation";
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className={`
            inline-flex items-center text-sm text-muted-foreground
            hover:text-foreground
          `}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al carrito
        </Link>
      </div>

      <h1 className="mb-8 text-3xl font-bold">Finalizar Pedido</h1>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <Card className="mb-6">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <h2 className="my-2 text-xl font-semibold">Tu carrito está vacío</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Agrega algunos brigadeiros deliciosos para continuar con tu pedido
            </p>
            <Link href="/">
              <Button size="lg" className="px-8">
                Volver al inicio
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Order Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <BoxCartItem
                    key={`${item.boxType.id}-${item.totalPrice}-${index}`}
                    item={item}
                    index={index}
                    onRemove={removeFromCart}
                  />
                ))}
                <div
                  className={`flex items-center justify-between border-t pt-3 text-lg font-semibold`}
                >
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
          <Button
            onClick={handleConfirmPurchase}
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? "Procesando..." : "Confirmar Compra"}
          </Button>
        </>
      )}
    </div>
  );
}
