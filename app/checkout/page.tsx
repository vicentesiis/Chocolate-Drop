"use client";

import { useCart } from "@/lib/contexts/cart-context";
import { useCheckoutForm } from "@/hooks/use-checkout-form";
import { useCheckoutSubmit } from "@/hooks/use-checkout-submit";
import { CheckoutForm, CheckoutHeader, EmptyCartState, OrderSummary } from "@/components/checkout";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { customerData, errors, handleInputChange, validateFields } = useCheckoutForm();
  const { isSubmitting, handleConfirmPurchase } = useCheckoutSubmit();

  const onConfirmPurchase = () => {
    const isValid = validateFields();
    handleConfirmPurchase(customerData, isValid);
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 pt-2 pb-8">
      <CheckoutHeader />

      <h1 className="mb-4 text-2xl font-bold">Finalizar Pedido</h1>

      {cart.length === 0 ? (
        <EmptyCartState />
      ) : (
        <>
          <OrderSummary />
          <CheckoutForm
            customerData={customerData}
            errors={errors}
            onInputChange={handleInputChange}
          />
          <Button onClick={onConfirmPurchase} disabled={isSubmitting} className="w-full" size="lg">
            {isSubmitting ? "Procesando..." : "Confirmar Compra"}
          </Button>
        </>
      )}
    </div>
  );
}
