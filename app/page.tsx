import { HalloweenBanner } from "@/components/halloween-banner";
import { About, BrigadeirosCarousel, DessertCartRental, Footer, Hero } from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Hero />

      {/* Products */}
      <section
        id="products"
        className={`
          scroll-mt-0 bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-rose-50/60
          backdrop-blur-[2px]
        `}
      >
        <BrigadeirosCarousel />
      </section>

      {/* Events */}
      <section
        id="events"
        className={`
          scroll-mt-0 bg-gradient-to-r from-rose-100/50 via-orange-100/40 to-amber-50/50
          backdrop-blur-[2px]
        `}
      >
        <DessertCartRental />
      </section>

      {/* About */}
      <section
        id="about-us"
        className={`
          scroll-mt-10 bg-gradient-to-tl from-orange-100/40 via-amber-50/30 to-rose-100/30
          sm:scroll-mt-20
        `}
      >
        <About />
      </section>

      <Footer />
      <HalloweenBanner />
    </div>
  );
}
