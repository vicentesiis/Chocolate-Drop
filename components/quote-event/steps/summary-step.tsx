import type { Event } from "@/lib/types/quote-event-types";

import { SummaryDetails } from "@/components/quote-event/summary-details";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

interface SummaryStepProps {
  balance: number;
  deposit: number;
  event: Event;
  onPrev: () => void;
  onSubmit: () => void;
  subtotal: number;
  total: number;
  whatsAppMessage: string;
}

export function SummaryStep({
  balance,
  deposit,
  event,
  onPrev,
  onSubmit,
  subtotal,
  total,
  whatsAppMessage,
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
          deposit={deposit}
          event={event}
          subtotal={subtotal}
          total={total}
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
