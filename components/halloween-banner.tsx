"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HalloweenBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-50 duration-500 animate-in slide-in-from-bottom-2`}
    >
      <Card
        className={`
          relative rounded-none border-x-0 border-t border-b-0 border-orange-500/30 bg-gradient-to-r
          from-slate-900 via-orange-900 to-purple-900 shadow-2xl backdrop-blur-sm
        `}
      >
        {/* Elegant decorative elements inspired by hero */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={`
              absolute top-2 left-10 h-16 w-16 rounded-full bg-gradient-to-br from-orange-500/30
              to-amber-500/30 blur-lg
            `}
          ></div>
          <div
            className={`
              absolute top-1 right-10 h-20 w-20 rounded-full bg-gradient-to-br from-purple-500/20
              to-orange-500/20 blur-xl
            `}
          ></div>
          <div
            className={`
              absolute top-3 left-1/3 h-12 w-12 rounded-full bg-gradient-to-br from-amber-400/25
              to-orange-400/25 blur-md
            `}
          ></div>
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(false)}
          className={`
            absolute top-1 right-1 rounded-full border border-orange-500/30 bg-slate-800/80
            hover:bg-slate-700/80
            sm:top-3 sm:right-3
          `}
          aria-label="Cerrar banner"
        >
          <X className="h-4 w-4 text-orange-300" />
        </Button>

        <CardContent
          className={`
            mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4
            sm:flex-row sm:gap-6 sm:px-6 sm:py-6
          `}
        >
          {/* Content */}
          <div
            className={`
              flex-1 text-center
              sm:text-left
            `}
          >
            <div
              className={`
                mb-1 flex items-center justify-center gap-2
                sm:mb-2 sm:justify-start sm:gap-3
              `}
            >
              <h3
                className={`
                  text-base leading-tight font-semibold text-orange-100
                  sm:text-lg
                  lg:text-xl
                `}
              >
                Algo dulce y tenebroso llegó este octubre
              </h3>
            </div>
            <p
              className={`
                text-xs font-medium text-orange-200/90
                sm:text-sm
                lg:text-base
              `}
            >
              4 brigadeiros artesanales, cada uno con un toque monstruoso.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <Button
              size="default"
              className={`
                hover:from-orange-90000 hover:scale-[1.02] hover:to-amber-600 hover:shadow-xl
                sm:size-lg sm:px-8 sm:py-3
                transform rounded-lg border border-orange-400/50 bg-gradient-to-r from-orange-700
                to-amber-700 px-6 py-2 font-semibold text-white shadow-lg transition-all
                duration-200
              `}
            >
              <Link href="#packages">Ordenar Ahora!</Link>
            </Button>
          </div>
        </CardContent>

        {/* Subtle animated accent */}
        <div
          className={`
            absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/80
            to-transparent
          `}
        ></div>
      </Card>
    </div>
  );
}
