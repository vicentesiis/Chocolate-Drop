import { HalloweenBanner } from "@/components/halloween-banner";
import { About, DessertCartRental, Footer, Hero } from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Hero />
      <div
        id="events"
        className={`scroll-mt-0 bg-gradient-to-l from-rose-100/40 via-orange-50/20 to-amber-50/30`}
      >
        <DessertCartRental />
      </div>
      <div
        id="about-us"
        className={`
          scroll-mt-10 bg-gradient-to-r from-orange-100/20 to-amber-100/30
          sm:scroll-mt-20
        `}
      >
        <About />
      </div>
      <Footer />
      <HalloweenBanner />
    </div>
  );
}
