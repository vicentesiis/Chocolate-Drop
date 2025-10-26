"use client";

import { FormFieldInput } from "@/components/shared/forms/form-input";
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
import { Form } from "@/components/ui/form";
import { useOrderSearch } from "@/hooks/order/use-order-search";
import { statusLabels, statusVariants } from "@/lib/constants/order-constants";
import { formatDateWithTime } from "@/lib/utils/format-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Gift, Hash, ReceiptText, Search, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const orderSearchSchema = z.object({
  orderNumber: z.string().min(1, "El número de pedido es requerido"),
});

type OrderSearchFormData = z.infer<typeof orderSearchSchema>;

export const OrderSearchDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { clearSearch, handleSearchOrder, isSearching, searchResult } =
    useOrderSearch();

  const form = useForm<OrderSearchFormData>({
    defaultValues: {
      orderNumber: "",
    },
    resolver: zodResolver(orderSearchSchema),
  });

  const onSearch = form.handleSubmit(async (data: OrderSearchFormData) => {
    await handleSearchOrder(data.orderNumber);
  });

  const handleClose = () => {
    setIsOpen(false);
    form.reset();
    clearSearch();
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
            <Form {...form}>
              <form
                className={`
                  flex flex-col gap-3 px-2
                  sm:flex-row sm:gap-2
                `}
                onSubmit={onSearch}
              >
                <div className="flex-1">
                  <FormFieldInput
                    control={form.control}
                    icon={Hash}
                    label="Identificador del Pedido"
                    name="orderNumber"
                    onFieldChange={(value) => {
                      // Convert to uppercase as user types
                      form.setValue("orderNumber", value.toUpperCase());
                    }}
                    placeholder="Ej: ABC123DEF"
                    required
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
                    disabled={!form.watch("orderNumber")?.trim()}
                    icon={<Search className="h-4 w-4" />}
                    isSubmitting={isSearching}
                    loadingText="Buscando..."
                    size="lg"
                    type="submit"
                  >
                    Buscar
                  </SubmitButton>
                </div>
              </form>
            </Form>
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
                      value: formatDateWithTime(searchResult.createdAt),
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
