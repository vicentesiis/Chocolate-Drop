"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BRIGADEIROS } from "@/lib/data/products";

export function BrigadeirosCarousel() {
  // Filter non-seasonal brigadeiros and limit to show just a preview
  const regularBrigadeiros = BRIGADEIROS.filter(
    (brigadeiro) => !brigadeiro.isSeasonal && brigadeiro.isActive,
  ).slice(0, 8); // Show only first 8 items

  return (
    <section
      className={`
        py-6
        sm:py-16
      `}
    >
      <div
        className={`
          mx-auto max-w-7xl px-4
          sm:px-6
          lg:px-8
        `}
      >
        {/* Section Header */}
        <div
          className={`
            mb-6 text-center
            sm:mb-8
          `}
        >
          <h2
            className={`
              mb-3 text-2xl font-bold text-gray-900
              sm:text-3xl
            `}
          >
            Nuestros Brigadeiros
          </h2>
          <p
            className={`
              mx-auto max-w-xl text-sm text-gray-600
              sm:text-base
            `}
          >
            Descubre algunos de nuestros sabores artesanales
          </p>
        </div>

        {/* Mobile scroll hint */}
        <div
          className={`
            mb-4 text-center
            sm:hidden
          `}
        >
          <p className="text-xs text-gray-500">Desliza para ver más →</p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              dragFree: true,
              containScroll: "trimSnaps",
              skipSnaps: false,
              inViewThreshold: 0.7,
            }}
            className="mobile-carousel-smooth w-full"
          >
            <CarouselContent
              className={`
                -ml-3
                md:-ml-4
              `}
            >
              {regularBrigadeiros.map((brigadeiro) => (
                <CarouselItem
                  key={brigadeiro.id}
                  className={`
                    basis-[42%] pl-3
                    min-[480px]:basis-2/5
                    sm:basis-1/3
                    md:basis-1/4 md:pl-4
                    lg:basis-1/5
                  `}
                >
                  <Link href="/build-a-box" className="block h-full touch-manipulation">
                    <Card
                      className={`
                        group h-full cursor-pointer border-orange-100 transition-all duration-200
                        hover:shadow-lg
                        active:scale-[0.98]
                        sm:hover:scale-105 sm:active:scale-95
                      `}
                    >
                      <CardContent
                        className={`
                          p-2.5
                          sm:p-3
                        `}
                      >
                        <div
                          className={`
                            relative mb-2 aspect-square overflow-hidden rounded-lg bg-gradient-to-br
                            from-orange-50 to-amber-50
                            sm:mb-3
                          `}
                        >
                          <Image
                            src={brigadeiro.image}
                            alt={brigadeiro.name}
                            fill
                            sizes="(max-width: 640px) 45vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                            className={`
                              object-cover transition-transform duration-200
                              group-hover:scale-110
                            `}
                          />
                        </div>
                        <h3
                          className={`
                            mb-1 text-xs font-semibold text-primary
                            sm:text-sm
                          `}
                        >
                          {brigadeiro.name}
                        </h3>
                        <p
                          className={`
                            line-clamp-2 hidden text-xs text-gray-600
                            sm:block
                          `}
                        >
                          {brigadeiro.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className={`
                hidden
                md:flex
              `}
            />
            <CarouselNext
              className={`
                hidden
                md:flex
              `}
            />
          </Carousel>
        </div>

        {/* More Products Button */}
        <div
          className={`
            mt-6 text-center
            sm:mt-8
          `}
        >
          <Button asChild size="lg" className="bg-primary px-8">
            <Link href="/build-a-box">Más Productos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
