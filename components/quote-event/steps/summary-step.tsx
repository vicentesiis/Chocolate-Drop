import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SummaryDetails } from "@/components/quote-event/summary-details";
import type { ContactDetails, EventDetails } from "@/lib/types/quote-event-types";
import { ChevronLeft } from "lucide-react";

interface SummaryStepProps {
  balance: number;
  contact: ContactDetails;
  deposit: number;
  discount: number;
  event: EventDetails;
  presentation: "mesa" | "recuerdo";
  promoPct: number;
  qtyBrigadeiros: number;
  qtyPastelitos: number;
  subtotal: number;
  total: number;
  withCart: boolean;
  whatsAppMessage: string;
  onPrev: () => void;
  onSubmit: () => void;
}

export function SummaryStep({
  balance,
  contact,
  deposit,
  discount,
  event,
  presentation,
  promoPct,
  qtyBrigadeiros,
  qtyPastelitos,
  subtotal,
  total,
  withCart,
  whatsAppMessage,
  onPrev,
  onSubmit,
}: SummaryStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen y envío</CardTitle>
        <CardDescription>
          Revisa los detalles antes de enviar tu cotización.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SummaryDetails
          balance={balance}
          contact={contact}
          deposit={deposit}
          discount={discount}
          event={event}
          presentation={presentation}
          promoPct={promoPct}
          qtyBrigadeiros={qtyBrigadeiros}
          qtyPastelitos={qtyPastelitos}
          subtotal={subtotal}
          total={total}
          withCart={withCart}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button onClick={onPrev} variant="ghost">
          <ChevronLeft className="mr-2 h-4 w-4" /> Atrás
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline">
            <a
              href={`https://wa.me/5210000000000?text=${whatsAppMessage}`}
              rel="noreferrer"
              target="_blank"
            >
              Enviar por WhatsApp
            </a>
          </Button>
          <Button onClick={onSubmit}>Enviar cotización</Button>
        </div>
      </CardFooter>
    </Card>
  );
}