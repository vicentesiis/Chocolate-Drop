import type { Event } from "@/lib/types/event";

import { NextSteps } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWhatsAppEventConfirmation } from "@/hooks/use-whatsapp";
import { BUSINESS_WHATSAPP_NUMBER } from "@/lib/constants/contact-constants";
import { getEventTypeLabel } from "@/lib/utils/event-utils";
import { Copy, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface QuoteConfirmationDialogProps {
  event: Event;
  eventNumber: string;
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

export function QuoteConfirmationDialog({
  event,
  eventNumber,
  isOpen,
  onClose,
  total,
}: QuoteConfirmationDialogProps) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const whatsAppMessage = useWhatsAppEventConfirmation(
    event,
    total,
    eventNumber,
  );

  const handleCopyEventNumber = async () => {
    try {
      await navigator.clipboard.writeText(eventNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${whatsAppMessage}`;
    window.open(url, "_blank");
    router.push("/");
  };

  const handleClose = () => {
    onClose();
    router.push("/");
  };

  return (
    <Dialog onOpenChange={handleClose} open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">¡Cotización Enviada!</DialogTitle>
          <DialogDescription className="text-base">
            Tu solicitud de cotización ha sido procesada exitosamente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Event Number */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  ID del Evento
                </p>
                <p className="font-mono text-lg font-semibold">{eventNumber}</p>
              </div>
              <Button
                className="shrink-0"
                onClick={handleCopyEventNumber}
                size="sm"
                variant="outline"
              >
                <Copy className="mr-2 h-4 w-4" />
                {copied ? "¡Copiado!" : "Copiar"}
              </Button>
            </div>
          </div>

          {/* Event Details Summary */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ciudad:</span>
              <span className="font-medium">{event.details.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cliente:</span>
              <span className="font-medium">{event.customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tipo de evento:</span>
              <span className="font-medium">
                {getEventTypeLabel(event.details.type)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-semibold">
                ${total.toLocaleString("es-MX")}
              </span>
            </div>
          </div>

          {/* Next Steps */}
          <NextSteps variant="event" />
        </div>

        <DialogFooter
          className={`
            flex-col gap-2
            sm:flex-col
          `}
        >
          <Button className="w-full" onClick={handleWhatsAppClick} size="lg">
            <MessageCircle className="mr-2 h-4 w-4" />
            Contactar por WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
