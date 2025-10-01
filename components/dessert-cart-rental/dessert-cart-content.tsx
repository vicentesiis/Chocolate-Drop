import { Button } from "@/components/ui/button";
import { DessertCartContact } from "./dessert-cart-contact";
import { DessertCartHeader } from "./dessert-cart-header";
import { DessertCartHighlights } from "./dessert-cart-highlights";

export function DessertCartContent() {
  return (
    <div
      className={`
        space-y-6 p-8
        lg:p-12
      `}
    >
      <div className="space-y-4">
        <DessertCartHeader />
        <DessertCartHighlights />

        {/* CTA Button */}
        <div className="pt-4">
          <Button className="h-12 px-8 text-lg font-semibold" size="lg">
            Reservar Ahora
          </Button>
        </div>

        <DessertCartContact />
      </div>
    </div>
  );
}
