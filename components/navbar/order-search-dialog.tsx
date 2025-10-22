"use client";

import { FormInput } from "@/components/shared/forms/form-input";
import { CollapsibleProductList } from "@/components/shared/ui/collapsible-product-list";
import { InfoCard } from "@/components/shared/ui/info-card";
import { SectionHeader } from "@/components/shared/ui/section-header";
import { SubmitButton } from "@/components/shared/ui/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useOrderSearch } from "@/hooks/use-order-search";
import { statusLabels, statusVariants } from "@/lib/constants/order-constants";
import { Calendar, Gift, Hash, ReceiptText, Search, User } from "lucide-react";
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      month: "long",
      year: "numeric",
    });
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
      <DialogContent
        className={`
          flex max-h-[90dvh] max-w-[calc(100vw-2rem)] flex-col overflow-y-auto
          p-4
          sm:w-full sm:max-w-xl sm:p-6
        `}
      >
        <DialogHeader>
          <DialogTitle
            className={`
              flex flex-wrap items-center justify-between gap-2 pt-2 text-lg
              sm:pt-4 sm:text-xl
            `}
          >
            {searchResult
              ? `Pedido #${searchResult.orderNumber}`
              : "Buscar Pedido"}
            {searchResult && (
              <Badge
                className={`
                  text-xs font-medium
                  sm:text-sm
                `}
                variant={statusVariants[searchResult.status]}
              >
                {statusLabels[searchResult.status]}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div
          className={`
            flex min-h-0 flex-1 flex-col space-y-4 overflow-hidden py-2
          `}
        >
          {!searchResult && (
            <div
              className={`
                flex flex-col gap-3 px-2
                sm:flex-row sm:gap-2
              `}
            >
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
              <div
                className={`
                  flex
                  sm:items-end
                `}
              >
                <SubmitButton
                  className={`
                    w-full
                    sm:w-auto
                  `}
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
                flex min-h-0 flex-1 flex-col space-y-3 rounded-lg border
                bg-gradient-to-br from-card/80 to-card/40 p-3 backdrop-blur-sm
                sm:p-4
              `}
            >
              {/* Customer Information */}
              <div className="sm:space-y-3">
                <SectionHeader
                  icon={ReceiptText}
                  title="Información del Pedido"
                />
                <InfoCard
                  items={[
                    {
                      icon: User,
                      label: "Nombre",
                      value: searchResult.customer.name,
                    },
                    {
                      icon: Calendar,
                      label: "Fecha de Pedido",
                      value: formatDate(searchResult.createdAt),
                    },
                  ]}
                />
              </div>

              {/* Products */}
              <div
                className={`
                  flex min-h-0 flex-1 flex-col overflow-hidden
                  sm:space-y-3
                `}
              >
                <SectionHeader
                  icon={Gift}
                  title={`Empaques (${searchResult.items.length})`}
                />
                <div className="min-h-0 flex-1 overflow-hidden">
                  <CollapsibleProductList
                    className="h-full overflow-auto"
                    items={searchResult.items}
                    total={searchResult.total}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
