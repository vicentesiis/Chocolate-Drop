import BuildABox from "@/components/build-a-box";
import { DessertCartRental } from "@/components/dessert-cart-rental/dessert-cart-rental";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import Pricing from "@/components/pricing";
import Testimonial from "@/components/testimonial";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BuildABox />
      <DessertCartRental />
      <Features />
      <FAQ />
      <Testimonial />
      <Pricing />
      <Footer />
    </>
  );
}
