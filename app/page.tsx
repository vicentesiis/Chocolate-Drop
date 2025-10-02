import { About } from "@/components/about";
import BuildABox from "@/components/build-a-box";
import { DessertCartRental } from "@/components/dessert-cart-rental/dessert-cart-rental";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BuildABox />
      <DessertCartRental />
      <About />
      <Footer />
    </>
  );
}
