import { About } from "@/components/about";
import BuildABox from "@/components/build-a-box";
import { DessertCartRental } from "@/components/dessert-cart-rental/dessert-cart-rental";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Navbar />
      <Hero />
      <div
        id="packages"
        className={`
          scroll-mt-20 bg-gradient-to-r from-amber-100/30 to-orange-100/30
          sm:scroll-mt-10
        `}
      >
        <BuildABox />
      </div>
      <div
        id="events"
        className=" bg-gradient-to-l from-rose-100/40 via-orange-50/20 to-amber-50/30"
      >
        <DessertCartRental />
      </div>
      <div
        id="about-us"
        className={`
          scroll-mt-10 bg-gradient-to-r from-orange-100/20 to-amber-100/30
          sm:scroll-mt-0
        `}
      >
        <About />
      </div>
      <Footer />
    </div>
  );
}
