"use client";

import { useCart } from "@/lib/contexts/cart-context";
import { useCheckoutForm } from "@/hooks/use-checkout-form";
import { useCheckoutSubmit } from "@/hooks/use-checkout-submit";
import {
  CheckoutForm,
  CheckoutHeader,
  EmptyCartState,
  OrderSummary,
} from "@/components/checkout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, CreditCard, Truck, Clock } from "lucide-react";

export default function CheckoutPage() {
  const { cart, getTotalPrice } = useCart();
  const { customerData, errors, handleInputChange, validateFields } =
    useCheckoutForm();
  const { isSubmitting, handleConfirmPurchase } = useCheckoutSubmit();

  const onConfirmPurchase = () => {
    const isValid = validateFields();
    handleConfirmPurchase(customerData, isValid);
  };

  const isFormValid = customerData.name.trim() && customerData.phone.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto max-w-4xl px-3 sm:px-4 pb-20 sm:pb-8">
        <CheckoutHeader />

        <div className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Finalizar Pedido
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Completa tu información para recibir tus deliciosos brigadeiros
          </p>
        </div>

        {cart.length === 0 ? (
          <EmptyCartState />
        ) : (
          <>
            {/* Mobile Layout: Stack everything vertically */}
            <div className="lg:hidden space-y-4">
              <OrderSummary />
              <CheckoutForm
                customerData={customerData}
                errors={errors}
                onInputChange={handleInputChange}
              />
            </div>

            {/* Desktop Layout: Grid */}
            <div className="hidden lg:grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <OrderSummary />
                <CheckoutForm
                  customerData={customerData}
                  errors={errors}
                  onInputChange={handleInputChange}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Trust Indicators */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
                      Compra Segura
                    </h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span>Pago seguro y protegido</span>
                      </div>
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        <span>Entrega rápida y confiable</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Preparado el mismo día</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">
                      Información de Entrega
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Método:</span>
                        <Badge variant="secondary">Entrega a domicilio</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tiempo:</span>
                        <span className="font-medium">2-4 horas</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Costo:</span>
                        <span className="font-medium text-green-600">
                          Gratis
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Button */}
                <div className="sticky top-4">
                  <Button
                    onClick={onConfirmPurchase}
                    disabled={isSubmitting || !isFormValid}
                    className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Procesando...
                      </div>
                    ) : (
                      <>
                        <ShieldCheck className="!size-6" />
                        Confirmar Compra
                      </>
                    )}
                  </Button>

                  {!isFormValid && (
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Completa todos los campos para continuar
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile Fixed Bottom Action Button */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 safe-area-pb">
          <Button
            onClick={onConfirmPurchase}
            disabled={isSubmitting || !isFormValid}
            className="w-full h-14 text-base font-semibold shadow-lg active:scale-95 transition-all duration-200"
            size="lg"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                Procesando...
              </div>
            ) : (
              <>
                <ShieldCheck className="!size-6" />
                Confirmar Compra
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
