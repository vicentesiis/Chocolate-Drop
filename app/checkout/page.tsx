"use client";

import type { CustomerData } from "@/lib/schemas/customer";

import {
  CheckoutForm,
  CheckoutHeader,
  DeliveryInfo,
  EmptyCartState,
  OrderSummary,
} from "@/components/checkout";
import { SubmitButton } from "@/components/shared/ui/submit-button";
import { useCheckoutSubmit } from "@/hooks/use-checkout-submit";
import { useCart } from "@/lib/contexts/cart-context";
import { useCallback, useState } from "react";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    phone: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const { handleConfirmPurchase, isSubmitting } = useCheckoutSubmit();

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
    <div
      className={`
        mx-auto min-h-screen max-w-4xl bg-gradient-to-br from-background
        via-background to-muted/20
      `}
    >
      <CheckoutHeader />

      {/* Header Section */}
      <section className="px-4">
        <div
          className={`
            mb-6 px-2 text-center
            sm:mb-8
          `}
        >
          <h1
            className={`
              mb-2 text-2xl font-bold tracking-tight
              sm:text-3xl
            `}
          >
            Finalizar Pedido
          </h1>
          <p className="text-muted-foreground">
            Completa tu información para recibir tus deliciosos brigadeiros
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section
        className={`
          px-4 pb-20
          sm:pb-8
        `}
      >
        {cart.length === 0 ? (
          <EmptyCartState />
        ) : (
          <>
            {/* Order Summary - Full Width Horizontal */}
            <div className="mb-4 ">
              <OrderSummary />
            </div>

            {/* Mobile Layout */}
            <div
              className={`
                space-y-4
                lg:hidden
              `}
            >
              <DeliveryInfo />
              <CheckoutForm
                defaultValues={customerData}
                onFormChange={handleFormChange}
              />
            </div>

            {/* Desktop Layout */}
            <div
              className={`
                hidden gap-8
                lg:grid lg:grid-cols-3
              `}
            >
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
                    className={`
                      h-12
                      hover:shadow-xl
                    `}
                    disabled={isSubmitting || !isFormValid}
                    isSubmitting={isSubmitting}
                    onClick={handleConfirmOrder}
                    showValidationMessage={!isFormValid}
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
        <div
          className={`
            fixed right-0 bottom-0 left-0 border-t border-border
            bg-background/95 px-6 py-2 backdrop-blur-sm
            lg:hidden
          `}
        >
          <SubmitButton
            className={`
              h-12
              active:scale-95
            `}
            disabled={isSubmitting || !isFormValid}
            isSubmitting={isSubmitting}
            onClick={handleConfirmOrder}
            size="lg"
          />
        </div>
      )}
    </div>
  );
}
