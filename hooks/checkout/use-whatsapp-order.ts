import type { Order } from "@/lib/types/order";

import { useWhatsAppOrder } from "@/hooks/use-whatsapp";
import { BUSINESS_WHATSAPP_NUMBER } from "@/lib/constants/contact-constants";
import { searchOrder } from "@/lib/services";
import { useEffect, useState } from "react";

export function useWhatsAppOrderMessage(orderNumber: string) {
  const [order, setOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const orderData = await searchOrder(orderNumber);
        setOrder(orderData);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("No se pudo cargar la información del pedido");
      } finally {
        setIsLoading(false);
      }
    };

    if (orderNumber) {
      fetchOrder();
    }
  }, [orderNumber]);

  const whatsAppMessage = useWhatsAppOrder(order);

  const openWhatsApp = () => {
    if (order) {
      const url = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${whatsAppMessage}`;
      window.open(url, "_blank");
    }
  };

  return {
    error,
    hasOrder: !!order,
    isLoading,
    openWhatsApp,
    order,
    whatsAppMessage,
  };
}
