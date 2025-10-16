import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/contexts/cart-context";
import type { CustomerData } from "@/lib/checkout-utils";

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

    // Show loading toast
    const loadingToast = toast.loading("Procesando tu pedido...", {
      description: "Esto puede tomar unos segundos",
    });

    try {
      // Simulate API call with order data
      const orderData = {
        customer: customerData,
        items: cart,
        total: getTotalPrice(),
        timestamp: new Date().toISOString(),
      };

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success message
      toast.success("¡Pedido confirmado exitosamente!", {
        description: `Hola ${customerData.name}, te contactaremos pronto para coordinar la entrega.`,
        duration: 4000,
      });

      // Clear cart after successful purchase
      clearCart();

      // Redirect to confirmation page after a short delay
      setTimeout(() => {
        window.location.href = "/checkout/confirmation";
      }, 2000);
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      toast.error("Error al procesar tu pedido", {
        description: "Por favor verifica tu información e inténtalo de nuevo.",
        action: {
          label: "Reintentar",
          onClick: () => handleConfirmPurchase(customerData, isValid),
        },
      });
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleConfirmPurchase,
  };
};
