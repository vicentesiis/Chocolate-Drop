import { BRIGADEIROS } from "@/lib/data/products";
import { BrigadeirosCta } from "./brigadeiros-carousel/brigadeiros-cta";
import { BrigadeirosGrid } from "./brigadeiros-carousel/brigadeiros-grid";
import { BrigadeirosHeader } from "./brigadeiros-carousel/brigadeiros-header";

export function BrigadeirosCarousel() {
  // Filter non-seasonal brigadeiros and limit to show just a preview
  const regularBrigadeiros = BRIGADEIROS.filter(
    (brigadeiro) => !brigadeiro.isSeasonal && brigadeiro.isActive,
  ).slice(0, 8); // Show only first 8 items

  return (
    <section
      className={`
        py-6
        sm:py-8
      `}
    >
      <div
        className={`
          mx-auto max-w-7xl px-2
          sm:px-6
          lg:px-8
        `}
      >
        <BrigadeirosHeader />
        <BrigadeirosGrid brigadeiros={regularBrigadeiros} />
        <BrigadeirosCta />
      </div>
    </section>
  );
}
