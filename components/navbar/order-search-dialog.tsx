"use client";

import { FormInput } from "@/components/shared/forms/form-input";
import { SubmitButton } from "@/components/shared/ui/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useOrderSearch } from "@/hooks/use-order-search";
import {
  Calendar,
  CreditCard,
  Hash,
  Package,
  Phone,
  Search,
  User,
} from "lucide-react";
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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "cancelled":
        return "destructive";
      case "confirmed":
        return "info";
      case "delivered":
        return "success";
      case "pending":
        return "warning";
      default:
        return "secondary";
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
            {searchResult
              ? `Pedido #${searchResult.orderNumber}`
              : "Buscar Pedido"}
            {searchResult && (
              <Badge
                className="text-sm font-medium"
                variant={getStatusVariant(searchResult.status)}
              >
                {getStatusText(searchResult.status)}
              </Badge>
            )}
          </DialogTitle>
          {!searchResult && (
            <DialogDescription>
              Ingresa tu número de pedido para ver los detalles
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!searchResult && (
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
          )}

          {searchResult && (
            <div
              className={`
                space-y-2 rounded-xl border bg-gradient-to-br from-card/80
                to-card/40 p-6 shadow-lg backdrop-blur-sm
              `}
            >
              {/* Customer Information */}
              <div className="space-y-2">
                <h4
                  className={`
                    flex items-center gap-2 text-lg font-semibold
                    text-foreground
                  `}
                >
                  <User className="h-5 w-5 text-primary" />
                  Información del Cliente
                </h4>
                <div
                  className={`
                    grid gap-3 rounded-lg bg-muted/30 p-4
                    md:grid-cols-2
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        flex h-8 w-8 items-center justify-center rounded-full
                        bg-primary/10
                      `}
                    >
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Nombre
                      </p>
                      <p className="font-semibold">
                        {searchResult.customer.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        flex h-8 w-8 items-center justify-center rounded-full
                        bg-primary/10
                      `}
                    >
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Teléfono
                      </p>
                      <p className="font-semibold">
                        {searchResult.customer.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-4">
                <h4
                  className={`
                    flex items-center gap-2 text-lg font-semibold
                    text-foreground
                  `}
                >
                  <Calendar className="h-5 w-5 text-primary" />
                  Detalles del Pedido
                </h4>
                <div className="rounded-lg bg-muted/30 p-4">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`
                        flex h-8 w-8 items-center justify-center rounded-full
                        bg-primary/10
                      `}
                    >
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Fecha de Pedido
                      </p>
                      <p className="font-semibold">
                        {formatDate(searchResult.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="space-y-4">
                <h4
                  className={`
                    flex items-center gap-2 text-lg font-semibold
                    text-foreground
                  `}
                >
                  <Package className="h-5 w-5 text-primary" />
                  Productos ({searchResult.items.length})
                </h4>
                <div className="space-y-3 rounded-lg bg-muted/30 p-4">
                  <div className="max-h-40 space-y-3 overflow-y-auto">
                    {searchResult.items.map((item, index) => (
                      <div
                        className={`
                          flex items-center justify-between rounded-lg
                          bg-background/60 p-3 shadow-sm
                        `}
                        key={index}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`
                              flex h-10 w-10 items-center justify-center
                              rounded-full bg-primary/10
                            `}
                          >
                            <Package className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {item.boxType?.name || item.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Cantidad: {item.quantity || 1}
                              {item.brigadeiros && (
                                <span className="ml-2">
                                  • {item.brigadeiros.length} brigadeiros
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            $
                            {(
                              item.totalPrice ||
                              item.price * (item.quantity || 1)
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div
                    className={`
                      flex items-center justify-between rounded-lg bg-primary/5
                      p-3
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="text-lg font-semibold">
                        Total del Pedido
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-primary">
                      ${searchResult.total.toFixed(2)}
                    </span>
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
