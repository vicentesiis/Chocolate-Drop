import type { Order } from "@/lib/types/order";

import { searchOrder } from "@/lib/services";
import { useState } from "react";
import { toast } from "sonner";

export const useOrderSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | Order>(null);

  const handleSearchOrder = async (orderNumber: string) => {
    if (!orderNumber.trim()) {
      toast.error("Por favor ingresa un número de pedido");
      return;
    }

    setIsSearching(true);
    setSearchResult(null);

    try {
      const order = await searchOrder(orderNumber.trim());

      if (order) {
        setSearchResult(order);
      } else {
        toast.error("Pedido no encontrado", {
          description: "Verifica que el número de pedido sea correcto",
        });
      }
    } catch (error) {
      console.error("Order search failed:", error);
      toast.error("Error al buscar el pedido", {
        description: "Por favor inténtalo de nuevo",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchResult(null);
  };

  return {
    clearSearch,
    handleSearchOrder,
    isSearching,
    searchResult,
  };
};
