"use client";

import {
  Faq,
  HeaderSection,
  Progress,
  QuoteStepRenderer,
  StickySummary,
} from "@/components/quote-event";
import { useQuoteEvent } from "@/hooks/event/use-quote-event";
import { useQuoteSubmit } from "@/hooks/event/use-quote-submit";
import { useQuoteWizard } from "@/hooks/event/use-quote-wizard";
import { useWhatsAppQuote } from "@/hooks/use-whatsapp";

export default function QuoteEventPage() {
  // Custom hooks for separation of concerns
  const { handleNext, handlePrev, progressRef, step } = useQuoteWizard();

  const { event, handleEventChange, isProductsStepValid, piecesTotal, total } =
    useQuoteEvent();

  const whatsAppMessage = useWhatsAppQuote(event, total);
  const { handleSubmit } = useQuoteSubmit();

  return (
    <div
      className={`
        mx-auto grid h-full gap-6 bg-[hsl(20_60%_96%)] p-3
        lg:grid-cols-[1fr_380px] lg:gap-8 lg:px-40 lg:py-8
      `}
    >
      {/* Main */}
      <div
        className={`
          space-y-3
          sm:space-y-4
        `}
      >
        <HeaderSection />
        <div className="scroll-mt-[85px]" ref={progressRef}>
          <Progress step={step} />
        </div>

        {/* Step cards */}
        <QuoteStepRenderer
          event={event}
          isProductsStepValid={isProductsStepValid}
          onEventChange={handleEventChange}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={() => handleSubmit(event)}
          piecesTotal={piecesTotal}
          step={step}
          total={total}
          whatsAppMessage={whatsAppMessage}
        />

        {/* FAQ */}
        <Faq />
      </div>

      {/* Sidebar summary (desktop) */}
      <aside
        className={`
          hidden
          lg:block
        `}
      >
        <StickySummary event={event} total={total} />
      </aside>
    </div>
  );
}
