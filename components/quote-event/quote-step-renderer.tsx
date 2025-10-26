import type { Event } from "@/lib/types/event";

import {
  EventDetailsStep,
  ExtrasStep,
  ProductsStep,
  SummaryStep,
} from "@/components/quote-event";

interface QuoteStepRendererProps {
  step: number;
  event: Event;
  isProductsStepValid: boolean;
  piecesTotal: number;
  total: number;
  whatsAppMessage: string;
  onEventChange: (newEvent: Partial<Event>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
}

export function QuoteStepRenderer({
  step,
  event,
  isProductsStepValid,
  piecesTotal,
  total,
  whatsAppMessage,
  onEventChange,
  onNext,
  onPrev,
  onSubmit,
}: QuoteStepRendererProps) {
  switch (step) {
    case 0:
      return (
        <EventDetailsStep
          event={event}
          onEventChange={onEventChange}
          onNext={onNext}
          onPrev={onPrev}
          piecesTotal={piecesTotal}
        />
      );

    case 1:
      return (
        <ProductsStep
          event={event}
          isValid={isProductsStepValid}
          onEventChange={onEventChange}
          onNext={onNext}
          onPrev={onPrev}
        />
      );

    case 2:
      return (
        <ExtrasStep
          event={event}
          onEventChange={onEventChange}
          onNext={onNext}
          onPrev={onPrev}
        />
      );

    case 3:
      return (
        <SummaryStep
          event={event}
          onPrev={onPrev}
          onSubmit={onSubmit}
          total={total}
          whatsAppMessage={whatsAppMessage}
        />
      );

    default:
      return null;
  }
}
