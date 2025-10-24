import { Button } from "@/components/ui/button";
import Link from "next/link";

import { DessertCartHeader } from "./dessert-cart-header";
import { DessertCartHighlights } from "./dessert-cart-highlights";

export function DessertCartContent() {
  return (
    <div
      className={`
        p-4 pt-0
        sm:space-y-5 sm:p-6
        md:space-y-6 md:p-8
        lg:p-12
      `}
    >
      <div
        className={`
          space-y-3
          sm:space-y-4
        `}
      >
        <DessertCartHeader />
        <DessertCartHighlights />

        {/* CTA Button */}
        <div
          className={`
            pt-2
            sm:pt-3
            md:pt-4
          `}
        >
          <Link href="/quote-event">
            <Button
              className={`
                h-10 w-full text-base font-semibold
                sm:w-auto sm:px-8 sm:text-lg
              `}
              size="lg"
            >
              Cotizar Ahora!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
