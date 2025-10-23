"use client";

import type { ContactDetails, EventDetails } from "@/lib/types/quote-event-types";

import {
  ContactStep,
  EventDetailsStep,
  ExtrasStep,
  Faq,
  FlavorsStep,
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
import { pesos } from "@/lib/utils/quote-event-utils";
import { ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";

export default function QuoteEventPage() {
  // Wizard step (0–4), 5 = summary
  const [step, setStep] = useState<number>(0);

  // Step 1: Event details
  const [event, setEvent] = useState<EventDetails>({
    city: "Monterrey",
    date: "",
    guests: null,
    time: "",
    type: "social",
  });

  // Step 2: Quantities
  const [qtyPastelitos, setQtyPastelitos] = useState<number>(0);
  const [qtyBrigadeiros, setQtyBrigadeiros] = useState<number>(0);

  // Step 3: Flavors & presentation (simple flavor multi-select per product)
  const [selectedFlavorsPastelitos, setSelectedFlavorsPastelitos] = useState<
    string[]
  >([]);
  const [selectedFlavorsBrigadeiros, setSelectedFlavorsBrigadeiros] = useState<
    string[]
  >([]);
  const [presentation, setPresentation] = useState<"mesa" | "recuerdo">("mesa");

  // Step 4: Extras
  const [withCart, setWithCart] = useState<boolean>(false);

  // Step 5: Contact
  const [contact, setContact] = useState<ContactDetails>({
    email: "",
    name: "",
    notes: "",
    phone: "",
    promo: "",
  });

  // Derived/stateful helpers
  const piecesTotal = qtyPastelitos + qtyBrigadeiros;
  const subtotalProducts =
    qtyPastelitos * UNIT_PRICE_PASTELITOS +
    qtyBrigadeiros * UNIT_PRICE_BRIGADEIROS;
  const subtotalExtras = withCart ? CART_RENTAL_PRICE : 0;

  // Promo logic (very simple – accepts numeric percent 0-100)
  const promoPct = useMemo(() => {
    const raw = Number.parseInt(contact.promo, 10);
    if (Number.isFinite(raw) && raw > 0 && raw <= 100) return raw;
    return 0;
  }, [contact.promo]);

  const subtotal = subtotalProducts + subtotalExtras;
  const discount = Math.round((subtotal * promoPct) / 100);
  const total = subtotal - discount;
  const deposit = Math.round(total * 0.5);
  const balance = total - deposit;

  // Guards & validation helpers
  const step1Valid = Boolean(event.date && event.time && event.city);
  const step2Valid =
    (qtyPastelitos === 0 || qtyPastelitos >= MIN_PASTELITOS) &&
    (qtyBrigadeiros === 0 || qtyBrigadeiros >= MIN_BRIGADEIROS) &&
    piecesTotal > 0;
  const step3Valid = true; // optional: enforce at least 1 flavor selected per chosen product
  const step5Valid = Boolean(contact.name && contact.email && contact.phone);

  // Navigation handlers
  function handleNext() {
    if (step < 5) setStep((s) => s + 1);
  }
  function handlePrev() {
    if (step > 0) setStep((s) => s - 1);
  }

  // Build a WhatsApp deep link with summary (user can send you the quote quickly)
  const whatsAppMessage = useMemo(() => {
    const lines = [
      `Hola, me interesa una cotización para evento:`,
      `• Fecha: ${event.date || "-"} ${event.time || ""}`,
      `• Ciudad: ${event.city || "-"}`,
      `• Tipo: ${EVENT_TYPES.find((t) => t.id === event.type)?.label || "-"}`,
      event.guests ? `• Invitados: ${event.guests}` : undefined,
      qtyPastelitos
        ? `• Pastelitos: ${qtyPastelitos} x $${UNIT_PRICE_PASTELITOS}`
        : undefined,
      qtyBrigadeiros
        ? `• Brigadeiros: ${qtyBrigadeiros} x $${UNIT_PRICE_BRIGADEIROS}`
        : undefined,
      withCart
        ? `• Carrito/Barra: ${pesos(CART_RENTAL_PRICE)} (${SERVICE_HOURS}h)`
        : undefined,
      presentation ? `• Presentación: ${presentation}` : undefined,
      promoPct ? `• Descuento: ${promoPct}%` : undefined,
      `Subtotal: ${pesos(subtotal)}`,
      promoPct ? `Descuento: -${pesos(discount)}` : undefined,
      `Total: ${pesos(total)}`,
      `Anticipo 50%: ${pesos(deposit)}`,
      `Saldo: ${pesos(balance)}`,
    ].filter(Boolean);
    return encodeURIComponent(lines.join("\n"));
  }, [
    event,
    qtyPastelitos,
    qtyBrigadeiros,
    withCart,
    presentation,
    promoPct,
    subtotal,
    discount,
    total,
    deposit,
    balance,
  ]);

  // Simple submit handler (replace with API route integration)
  function handleSubmit() {
    // Here you could POST to /api/quotes
    alert(
      "Cotización enviada (demo). Puedes conectar este flujo a tu backend.",
    );
  }

  // Responsive summary: sheet on mobile
  const [openSummary, setOpenSummary] = useState(false);

  return (
    <div
      className={`
        mx-auto grid w-full max-w-7xl gap-6 px-4 py-8
        md:grid-cols-[1fr_380px] md:gap-8 md:px-6
        lg:px-8
      `}
    >
      {/* Main */}
      <div className="space-y-6">
        <HeaderSection />
        <Progress step={step} />

        {/* Step cards */}
        {step === 0 && (
          <EventDetailsStep
            event={event}
            isValid={step1Valid}
            onNext={handleNext}
            onPrev={handlePrev}
            piecesTotal={piecesTotal}
            setEvent={setEvent}
          />
        )}

        {step === 1 && (
          <ProductsStep
            guests={event.guests}
            isValid={step2Valid}
            onNext={handleNext}
            onPrev={handlePrev}
            piecesTotal={piecesTotal}
            qtyBrigadeiros={qtyBrigadeiros}
            qtyPastelitos={qtyPastelitos}
            setQtyBrigadeiros={setQtyBrigadeiros}
            setQtyPastelitos={setQtyPastelitos}
          />
        )}

        {step === 2 && (
          <FlavorsStep
            isValid={step3Valid}
            onNext={handleNext}
            onPrev={handlePrev}
            presentation={presentation}
            qtyBrigadeiros={qtyBrigadeiros}
            qtyPastelitos={qtyPastelitos}
            selectedFlavorsBrigadeiros={selectedFlavorsBrigadeiros}
            selectedFlavorsPastelitos={selectedFlavorsPastelitos}
            setPresentation={setPresentation}
            setSelectedFlavorsBrigadeiros={setSelectedFlavorsBrigadeiros}
            setSelectedFlavorsPastelitos={setSelectedFlavorsPastelitos}
          />
        )}

        {step === 3 && (
          <ExtrasStep
            onNext={handleNext}
            onPrev={handlePrev}
            setWithCart={setWithCart}
            withCart={withCart}
          />
        )}

        {step === 4 && (
          <ContactStep
            contact={contact}
            isValid={step5Valid}
            onNext={handleNext}
            onPrev={handlePrev}
            setContact={setContact}
          />
        )}

        {step === 5 && (
          <SummaryStep
            balance={balance}
            contact={contact}
            deposit={deposit}
            discount={discount}
            event={event}
            onPrev={handlePrev}
            onSubmit={handleSubmit}
            presentation={presentation}
            promoPct={promoPct}
            qtyBrigadeiros={qtyBrigadeiros}
            qtyPastelitos={qtyPastelitos}
            subtotal={subtotal}
            total={total}
            whatsAppMessage={whatsAppMessage}
            withCart={withCart}
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
        <StickySummary
          balance={balance}
          deposit={deposit}
          discount={discount}
          event={event}
          promoPct={promoPct}
          qtyBrigadeiros={qtyBrigadeiros}
          qtyPastelitos={qtyPastelitos}
          subtotal={subtotal}
          withCart={withCart}
        />
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
                  balance={balance}
                  deposit={deposit}
                  discount={discount}
                  event={event}
                  promoPct={promoPct}
                  qtyBrigadeiros={qtyBrigadeiros}
                  qtyPastelitos={qtyPastelitos}
                  subtotal={subtotal}
                  withCart={withCart}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
