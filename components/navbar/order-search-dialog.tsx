"use client";

import { FormInput } from "@/components/shared/forms/form-input";
import { SubmitButton } from "@/components/shared/ui/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useOrderSearch } from "@/hooks/use-order-search";
import { Calendar, Hash, Package, Phone, Search, User } from "lucide-react";
import { useState } from "react";

export const OrderSearchDialog = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { clearSearch, handleSearchOrder, isSearching, searchResult } =
    useOrderSearch();

  const onSearch = async () => {
    await handleSearchOrder(orderNumber);
  };

  const handleClose = () => {
    setIsOpen(false);
    setOrderNumber("");
    clearSearch();
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("es-ES", {
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cancelled":
        return "text-red-600 bg-red-50";
      case "confirmed":
        return "text-blue-600 bg-blue-50";
      case "delivered":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "cancelled":
        return "Cancelado";
      case "confirmed":
        return "Confirmado";
      case "delivered":
        return "Entregado";
      case "pending":
        return "Pendiente";
      default:
        return status;
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        } else {
          setIsOpen(true);
        }
      }}
      open={isOpen}
    >
      <DialogTrigger asChild>
        <Button
          className={`
            group relative rounded-full transition-all duration-200 ease-in-out
            hover:scale-105 hover:bg-accent/50
          `}
          onClick={() => setIsOpen(true)}
          size="icon"
          variant="ghost"
        >
          <Search
            className={`
              !size-7 transition-transform
              group-hover:scale-110
            `}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Buscar Pedido
          </DialogTitle>
          <DialogDescription>
            Ingresa tu número de pedido para ver los detalles
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <FormInput
                icon={Hash}
                label="Identificador del Pedido"
                onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                placeholder="Ej: ABC123DEF"
                required
                value={orderNumber}
              />
            </div>
            <div className="flex items-end">
              <SubmitButton
                disabled={!orderNumber.trim()}
                icon={<Search className="h-4 w-4" />}
                isSubmitting={isSearching}
                loadingText="Buscando..."
                onClick={onSearch}
                size="lg"
              >
                Buscar
              </SubmitButton>
            </div>
          </div>

          {searchResult && (
            <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Pedido #{searchResult.orderNumber}
                </h3>
                <span
                  className={`
                    rounded-full px-3 py-1 text-sm font-medium
                    ${getStatusColor(searchResult.status)}
                  `}
                >
                  {getStatusText(searchResult.status)}
                </span>
              </div>

              <div
                className={`
                  grid gap-4
                  md:grid-cols-2
                `}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Fecha:</span>
                    <span>{formatDate(searchResult.timestamp)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Cliente:</span>
                    <span>{searchResult.customer.name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Teléfono:</span>
                    <span>{searchResult.customer.phone}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Productos:</h4>
                  <div className="max-h-32 space-y-2 overflow-y-auto">
                    {searchResult.items.map((item, index) => (
                      <div
                        className={`
                          flex justify-between rounded bg-white p-2 text-sm
                        `}
                        key={index}
                      >
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span>${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>${searchResult.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
