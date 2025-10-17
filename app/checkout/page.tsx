"use client";

import { useState, useCallback } from "react";
import { useCart } from "@/lib/contexts/cart-context";
import { useCheckoutSubmit } from "@/hooks/use-checkout-submit";
import type { CustomerData } from "@/lib/schemas/customer";
import {
  CheckoutForm,
  CheckoutHeader,
  EmptyCartState,
  OrderSummary,
  DeliveryInfo,
} from "@/components/checkout";
import { SubmitButton } from "@/components/shared/ui/submit-button";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    phone: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const { isSubmitting, handleConfirmPurchase } = useCheckoutSubmit();

  const handleFormChange = useCallback(
    (data: CustomerData, isValid: boolean) => {
      setCustomerData(data);
      setIsFormValid(isValid);
    },
    [],
  );

  const handleConfirmOrder = () => {
    handleConfirmPurchase(customerData, isFormValid);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 mx-auto max-w-4xl">
      <CheckoutHeader />

      {/* Header Section */}
      <section className="px-4">
        <div className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Finalizar Pedido
          </h1>
          <p className="text-muted-foreground">
            Completa tu información para recibir tus deliciosos brigadeiros
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className=" px-4 pb-24 sm:pb-8">
        {cart.length === 0 ? (
          <EmptyCartState />
        ) : (
          <>
            {/* Order Summary - Full Width Horizontal */}
            <div className="mb-6 sm:mb-8">
              <OrderSummary />
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-4">
              <DeliveryInfo />
              <CheckoutForm
                defaultValues={customerData}
                onFormChange={handleFormChange}
              />
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <CheckoutForm
                  defaultValues={customerData}
                  onFormChange={handleFormChange}
                />
              </div>

              <aside className="space-y-6">
                <DeliveryInfo />
                <div className="sticky top-4">
                  <SubmitButton
                    onClick={handleConfirmOrder}
                    disabled={isSubmitting || !isFormValid}
                    isSubmitting={isSubmitting}
                    showValidationMessage={!isFormValid}
                    className="h-12 hover:shadow-xl"
                    size="lg"
                  />
                </div>
              </aside>
            </div>
          </>
        )}
      </section>

      {/* Mobile Action Button */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border py-2 px-6">
          <SubmitButton
            onClick={handleConfirmOrder}
            disabled={isSubmitting || !isFormValid}
            isSubmitting={isSubmitting}
            className="h-14 active:scale-95"
            size="lg"
          />
        </div>
      )}
    </div>
  );
}
