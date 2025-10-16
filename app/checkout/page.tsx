"use client";

import { useCart } from "@/lib/contexts/cart-context";
import { useCheckoutForm } from "@/hooks/use-checkout-form";
import { useCheckoutSubmit } from "@/hooks/use-checkout-submit";
import {
  CheckoutForm,
  CheckoutHeader,
  EmptyCartState,
  OrderSummary,
  TrustIndicators,
  DeliveryInfo,
  ConfirmButton,
  MobileActionButton,
} from "@/components/checkout";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { customerData, errors, handleInputChange, validateFields } =
    useCheckoutForm();
  const { isSubmitting, handleConfirmPurchase } = useCheckoutSubmit();

  const handleConfirmOrder = () => {
    const isValid = validateFields();
    handleConfirmPurchase(customerData, isValid);
  };

  const isFormValid = Boolean(
    customerData.name.trim() && customerData.phone.trim(),
  );

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
            {/* Mobile Layout */}
            <div className="lg:hidden space-y-4">
              <OrderSummary />
              <DeliveryInfo />
              <CheckoutForm
                customerData={customerData}
                errors={errors}
                onInputChange={handleInputChange}
              />
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <OrderSummary />
                <CheckoutForm
                  customerData={customerData}
                  errors={errors}
                  onInputChange={handleInputChange}
                />
              </div>

              <aside className="space-y-6">
                <TrustIndicators />
                <DeliveryInfo />
                <ConfirmButton
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting || !isFormValid}
                  isSubmitting={isSubmitting}
                  isFormValid={isFormValid}
                />
              </aside>
            </div>
          </>
        )}
      </section>

      {/* Mobile Action Button */}
      {cart.length > 0 && (
        <MobileActionButton
          onClick={handleConfirmOrder}
          disabled={isSubmitting || !isFormValid}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
