"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CarouselProps {
  images: {
    alt: string;
    src: string;
  }[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function Carousel({
  images,
  autoPlay = true,
  autoPlayInterval = 10000,
  className,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const resetAutoPlay = useCallback(() => {
    if (!autoPlay) return;

    if (intervalId) {
      clearInterval(intervalId);
    }

    const newInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    setIntervalId(newInterval);
  }, [autoPlay, autoPlayInterval, images.length, intervalId]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetAutoPlay();
  }, [images.length, resetAutoPlay]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    resetAutoPlay();
  }, [images.length, resetAutoPlay]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      resetAutoPlay();
    },
    [resetAutoPlay],
  );

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    setIntervalId(interval);

    return () => {
      clearInterval(interval);
      setIntervalId(null);
    };
  }, [autoPlay, autoPlayInterval, images.length]);

  if (images.length === 0) return null;

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {/* Main carousel container */}
      <div className="relative aspect-[0.9] w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              index === currentIndex ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              alt={image.alt}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={image.src}
            />
          </div>
        ))}

        {/* Navigation arrows */}
        <Button
          className={cn(
            "absolute top-1/2 left-2 z-10 h-8 w-8 -translate-y-1/2 rounded-full",
            "bg-black/50 p-0 text-white",
          )}
          onClick={prevSlide}
          size="sm"
          variant="ghost"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          className={cn(
            "absolute top-1/2 right-2 z-10 h-8 w-8 -translate-y-1/2 rounded-full",
            "bg-black/50 p-0 text-white",
          )}
          onClick={nextSlide}
          size="sm"
          variant="ghost"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              index === currentIndex
                ? "bg-white"
                : `
                  bg-white/50
                  hover:bg-white/75
                `,
            )}
            onClick={() => goToSlide(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
