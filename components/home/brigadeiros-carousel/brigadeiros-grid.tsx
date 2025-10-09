"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BrigadeiroCard } from "./brigadeiro-card";

interface BrigadeirosGridProps {
  brigadeiros: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
  }>;
}

export function BrigadeirosGrid({ brigadeiros }: BrigadeirosGridProps) {
  return (
    <>
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
            {brigadeiros.map((brigadeiro) => (
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
                <BrigadeiroCard brigadeiro={brigadeiro} />
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
    </>
  );
}
