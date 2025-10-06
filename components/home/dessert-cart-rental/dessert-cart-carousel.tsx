import { Carousel } from "@/components/carousel";
import type { DessertCartImage } from "./types";

const dessertCartImages: DessertCartImage[] = [
  {
    alt: "Carrito de postres elegante en recepción de boda",
    src: "/carousel/1.jpg",
  },
  {
    alt: "Carrito de postres colorido para fiesta de cumpleaños",
    src: "/carousel/2.jpg",
  },
  {
    alt: "Configuración profesional de carrito de postres en evento corporativo",
    src: "/carousel/3.jpg",
  },
  {
    alt: "Carrito de postres rústico para boda al aire libre",
    src: "/carousel/4.jpg",
  },
  {
    alt: "Carrito de postres moderno con variedad de dulces",
    src: "/carousel/5.jpg",
  },
];

export function DessertCartCarousel() {
  return (
    <div
      className={`
        p-4
        sm:p-6
        md:p-8
        lg:p-12
      `}
    >
      <Carousel
        autoPlay={true}
        autoPlayInterval={4000}
        className={`
          w-full overflow-hidden rounded-lg shadow-sm
          sm:shadow-md
        `}
        images={dessertCartImages}
      />
    </div>
  );
}
