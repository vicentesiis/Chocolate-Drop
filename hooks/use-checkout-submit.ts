import type { CustomerData } from "@/lib/checkout-utils";

import { useCart } from "@/lib/contexts/cart-context";
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
      // Simulate API call with order data
      const orderData = {
        customer: customerData,
        items: cart,
        timestamp: new Date().toISOString(),
        total: getTotalPrice(),
      };

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Show success message
      toast.success("¡Pedido confirmado exitosamente!", {
        description: `Hola ${customerData.name}, te contactaremos pronto para coordinar la entrega.`,
        duration: 4000,
      });

      // Clear cart after successful purchase
      clearCart();

      // Redirect to confirmation page after a short delay
      window.location.href = "/checkout/confirmation";
    } catch (error) {
      // Dismiss loading toast

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
