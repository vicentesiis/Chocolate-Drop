import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/contexts/cart-context";
import type { CustomerData } from "@/lib/checkout-utils";

export const useCheckoutSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cart, clearCart } = useCart();

  const handleConfirmPurchase = async (
    customerData: CustomerData,
    isValid: boolean,
  ) => {
    if (!isValid) {
      return;
    }

    if (cart.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message
      toast.success("¡Compra confirmada! Redirigiendo...");

      // Clear cart after successful purchase
      clearCart();

      // Redirect to confirmation page after a short delay
      setTimeout(() => {
        window.location.href = "/checkout/confirmation";
      }, 1500);
    } catch (error) {
      toast.error("Error al procesar la compra. Inténtalo de nuevo.");
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleConfirmPurchase,
  };
};
