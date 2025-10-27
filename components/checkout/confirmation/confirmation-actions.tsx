import { Button } from "@/components/ui/button";
import { useWhatsAppOrderMessage } from "@/hooks/checkout/use-whatsapp-order";
import { BUSINESS_WHATSAPP_NUMBER } from "@/lib/constants/contact-constants";
import Link from "next/link";

interface ConfirmationActionsProps {
  orderNumber: string;
}

export function ConfirmationActions({ orderNumber }: ConfirmationActionsProps) {
  const { error, hasOrder, isLoading, openWhatsApp } =
    useWhatsAppOrderMessage(orderNumber);

  const handleWhatsAppClick = () => {
    if (hasOrder) {
      openWhatsApp();
    } else {
      // Fallback message when order data is not available
      const fallbackMessage = encodeURIComponent(
        `¡Hola! Acabo de realizar un pedido en ChocolateDrop \n\nNúmero de pedido: ${orderNumber}\n\n¿Podrían confirmar la disponibilidad y coordinar la entrega?\n\n¡Gracias! `,
      );
      const url = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${fallbackMessage}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div
      className={`
        flex flex-col gap-4
        sm:flex-row
      `}
    >
      <Link className="flex-1" href="/">
        <Button className="w-full" variant="outline">
          Seguir Comprando
        </Button>
      </Link>
      <Button
        className="flex-1"
        disabled={isLoading}
        onClick={handleWhatsAppClick}
      >
        {isLoading ? "Cargando..." : "Contactar por WhatsApp"}
      </Button>
      {error && (
        <p className="w-full text-center text-sm text-muted-foreground">
          {error}
        </p>
      )}
    </div>
  );
}
