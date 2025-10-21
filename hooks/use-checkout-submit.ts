import type { CustomerData } from "@/lib/checkout-utils";

import { useCart } from "@/lib/contexts/cart-context";
import { createOrder } from "@/lib/services";
import { useState } from "react";
import { toast } from "sonner";

export const useCheckoutSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cart, clearCart, getTotalPrice } = useCart();

  const handleConfirmPurchase = async (
    customerData: CustomerData,
    isValid: boolean,
  ) => {
    if (!isValid) {
      toast.error("Por favor completa todos los campos correctamente");
      return;
    }

    if (cart.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order in Firestore
      const orderNumber = await createOrder(
        customerData,
        cart,
        getTotalPrice(),
      );

      // Clear cart after successful purchase
      clearCart();

      // Redirect to confirmation page after a short delay
      setTimeout(() => {
        window.location.href = `/checkout/confirmation?order=${orderNumber}`;
      }, 1000);
    } catch (error) {
      console.error("Order creation failed:", error);

      toast.error("Error al procesar tu pedido", {
        action: {
          label: "Reintentar",
          onClick: () => handleConfirmPurchase(customerData, isValid),
        },
        description: "Por favor verifica tu información e inténtalo de nuevo.",
      });
      setIsSubmitting(false);
    }
  };

  return {
    handleConfirmPurchase,
    isSubmitting,
  };
};
