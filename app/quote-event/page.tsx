"use client";

import type { Event } from "@/lib/types/quote-event-types";

import {
  EventDetailsStep,
  ExtrasStep,
  Faq,
  HeaderSection,
  ProductsStep,
  Progress,
  StickySummary,
  SummaryStep,
} from "@/components/quote-event";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CART_RENTAL_PRICE,
  EVENT_TYPES,
  MIN_BRIGADEIROS,
  MIN_PASTELITOS,
  SERVICE_HOURS,
  UNIT_PRICE_BRIGADEIROS,
  UNIT_PRICE_PASTELITOS,
} from "@/lib/constants/quote-event-constants";
import { createDefaultEvent } from "@/lib/schemas/event-details";
import { pesos } from "@/lib/utils/quote-event-utils";
import { ShoppingCart } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

export default function QuoteEventPage() {
  // Wizard step (0–2), 3 = summary
  const [step, setStep] = useState<number>(0);

  // Ref for the Progress component
  const progressRef = useRef<HTMLDivElement>(null);

  // Complete event state
  const [event, setEvent] = useState<Event>(createDefaultEvent);

  // Derived/stateful helpers
  const piecesTotal = event.qtyPastelitos + event.qtyBrigadeiros;
  const subtotalProducts =
    event.qtyPastelitos * UNIT_PRICE_PASTELITOS +
    event.qtyBrigadeiros * UNIT_PRICE_BRIGADEIROS;
  const subtotalExtras = event.withCart ? CART_RENTAL_PRICE : 0;

  const subtotal = subtotalProducts + subtotalExtras;
  const total = subtotal;
  const deposit = Math.round(total * 0.5);

  // Guards & validation helpers
  const step2Valid =
    (event.qtyPastelitos === 0 || event.qtyPastelitos >= MIN_PASTELITOS) &&
    (event.qtyBrigadeiros === 0 || event.qtyBrigadeiros >= MIN_BRIGADEIROS) &&
    piecesTotal > 0;

  // Navigation handlers
  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
      scrollToProgress();
    }
  }
  function handlePrev() {
    if (step > 0) {
      setStep((s) => s - 1);
      scrollToProgress();
    }
  }

  // Scroll to progress component
  function scrollToProgress() {
    const el = progressRef.current;
    if (!el) return;

    // Desired top gap (what your scroll-mt was doing)
    const OFFSET = 85;

    // Get current scroll + element position
    const rect = el.getBoundingClientRect();
    const currentY = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = Math.max(0, currentY + rect.top - OFFSET);

    // Use the root scroller (Safari-safe) and avoid scrollIntoView
    const scroller = document.scrollingElement || document.documentElement;

    // Smooth, no jank with fixed bars
    requestAnimationFrame(() => {
      scroller.scrollTo({ behavior: "smooth", top: targetY });
    });
  }

  // Memoized event change handler to prevent infinite loops
  const handleEventChange = useCallback((newEvent: Partial<Event>) => {
    setEvent((prev) => ({ ...prev, ...newEvent }));
  }, []);

  // Build a WhatsApp deep link with summary (user can send you the quote quickly)
  const whatsAppMessage = useMemo(() => {
    const lines = [
      `Hola, me interesa una cotización para evento:`,
      `• Ciudad: ${event.city || "-"}`,
      `• Tipo: ${EVENT_TYPES.find((t) => t.id === event.type)?.label || "-"}`,
      event.qtyPastelitos
        ? `• Pastelitos: ${event.qtyPastelitos} x $${UNIT_PRICE_PASTELITOS}`
        : undefined,
      event.qtyBrigadeiros
        ? `• Brigadeiros: ${event.qtyBrigadeiros} x $${UNIT_PRICE_BRIGADEIROS}`
        : undefined,
      event.withCart
        ? `• Carrito: ${pesos(CART_RENTAL_PRICE)} (${SERVICE_HOURS}h)`
        : undefined,
      `Subtotal: ${pesos(subtotal)}`,
      `Total: ${pesos(total)}`,
      `Anticipo 50%: ${pesos(deposit)}`,
    ].filter(Boolean);
    return encodeURIComponent(lines.join("\n"));
  }, [event, subtotal, total, deposit]);

  // Simple submit handler (replace with API route integration)
  function handleSubmit() {
    try {
      // Prepare the complete event data for Firestore
      const eventForFirestore = {
        ...event,
        // Add timestamp
        createdAt: new Date(),
        deposit,
        subtotal,
        subtotalExtras,
        // Add calculated fields
        subtotalProducts,
        total,
      };

      // Here you could POST to /api/quotes with eventForFirestore
      console.log("Event data ready for Firestore:", eventForFirestore);
      alert(
        "Cotización enviada (demo). Puedes conectar este flujo a tu backend.",
      );
    } catch (error) {
      console.error("Error preparing event data:", error);
      alert("Error al procesar la cotización. Intenta de nuevo.");
    }
  }

  // Responsive summary: sheet on mobile
  const [openSummary, setOpenSummary] = useState(false);

  return (
    <div
      className={`
        mx-auto grid h-full gap-6 bg-[hsl(20_60%_96%)] p-3
        md:grid-cols-[1fr_380px] md:gap-8 md:px-6
        lg:px-40 lg:py-8
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
        {step === 0 && (
          <EventDetailsStep
            event={event}
            onEventChange={handleEventChange}
            onNext={handleNext}
            onPrev={handlePrev}
            piecesTotal={piecesTotal}
          />
        )}

        {step === 1 && (
          <ProductsStep
            event={event}
            isValid={step2Valid}
            onEventChange={handleEventChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}

        {step === 2 && (
          <ExtrasStep
            event={event}
            onEventChange={handleEventChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}

        {step === 3 && (
          <SummaryStep
            deposit={deposit}
            event={event}
            onPrev={handlePrev}
            onSubmit={handleSubmit}
            subtotal={subtotal}
            total={total}
            whatsAppMessage={whatsAppMessage}
          />
        )}

        {/* FAQ */}
        <Faq />
      </div>

      {/* Sidebar summary (desktop) */}
      <aside
        className={`
          hidden
          md:block
        `}
      >
        <StickySummary deposit={deposit} event={event} subtotal={subtotal} />
      </aside>

      {/* Mobile summary trigger */}
      <div
        className={`
          fixed inset-x-0 bottom-0 z-30 bg-background/80 backdrop-blur
          supports-[backdrop-filter]:bg-background/60
          md:hidden
        `}
      >
        <div
          className={`
            mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3
          `}
        >
          <div className="text-sm">
            <div className="font-medium">Total actual</div>
            <div className="text-lg font-bold">{pesos(total)}</div>
          </div>
          <Sheet onOpenChange={setOpenSummary} open={openSummary}>
            <SheetTrigger asChild>
              <Button className="gap-2">
                <ShoppingCart className="h-4 w-4" /> Ver resumen
              </Button>
            </SheetTrigger>
            <SheetContent
              className="max-h-[85vh] overflow-y-auto"
              side="bottom"
            >
              <SheetHeader>
                <SheetTitle>Resumen de tu cotización</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <StickySummary
                  deposit={deposit}
                  event={event}
                  subtotal={subtotal}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
