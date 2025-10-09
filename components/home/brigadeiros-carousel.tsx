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
        py-4
        sm:py-16
      `}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-4 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Nuestros Brigadeiros</h2>
          <p className="mx-auto max-w-xl text-base text-gray-600">
            Descubre algunos de nuestros sabores artesanales
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-2">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent
              className={`
                -ml-2
                md:-ml-3
              `}
            >
              {regularBrigadeiros.map((brigadeiro) => (
                <CarouselItem
                  key={brigadeiro.id}
                  className={`
                    basis-2/5 pl-2
                    sm:basis-1/3
                    md:basis-1/4 md:pl-3
                    lg:basis-1/5
                  `}
                >
                  <Link href="/build-a-box" className="block h-full">
                    <Card
                      className={`
                        h-full cursor-pointer border-orange-100 transition-all duration-300
                        hover:scale-105 hover:shadow-md
                      `}
                    >
                      <CardContent className="p-3">
                        <div
                          className={`
                            relative mb-3 aspect-square overflow-hidden rounded-lg bg-gradient-to-br
                            from-orange-50 to-amber-50
                          `}
                        >
                          <Image
                            src={brigadeiro.image}
                            alt={brigadeiro.name}
                            fill
                            className={`
                              object-cover transition-transform duration-300
                              hover:scale-110
                            `}
                          />
                        </div>
                        <h3 className="mb-1 text-sm font-semibold text-primary">
                          {brigadeiro.name}
                        </h3>
                        <p
                          className={`
                            line-clamp-2 hidden text-xs text-gray-600
                            sm:flex
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
            mt-4 text-center
            sm:mt-8
          `}
        >
          <Button asChild size={"lg"} className={`bg-primary`}>
            <Link href="/build-a-box">Más Productos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
