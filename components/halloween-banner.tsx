"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

export function HalloweenBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={`
      fixed right-0 bottom-0 left-0 z-50 duration-500 animate-in slide-in-from-bottom-2
    `}>
      <div className={`
        relative border-t border-orange-500/30 bg-gradient-to-r from-slate-900 via-orange-900
        to-purple-900 shadow-2xl backdrop-blur-sm
      `}>
        {/* Elegant decorative elements inspired by hero */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className={`
            absolute top-2 left-10 h-16 w-16 rounded-full bg-gradient-to-br from-orange-500/30
            to-amber-500/30 blur-lg
          `}></div>
          <div className={`
            absolute top-1 right-10 h-20 w-20 rounded-full bg-gradient-to-br from-purple-500/20
            to-orange-500/20 blur-xl
          `}></div>
          <div className={`
            absolute top-3 left-1/3 h-12 w-12 rounded-full bg-gradient-to-br from-amber-400/25
            to-orange-400/25 blur-md
          `}></div>
        </div>
        
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className={`
            absolute top-3 right-3 rounded-full border border-orange-500/30 bg-slate-800/80 p-1.5
            shadow-sm transition-colors
            hover:bg-slate-700/80
          `}
          aria-label="Cerrar banner"
        >
          <X className="h-4 w-4 text-orange-300" />
        </button>

        <div className={`
          mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-6
          sm:flex-row sm:px-6
        `}>
          {/* Content */}
          <div className={`
            flex-1 text-center
            sm:text-left
          `}>
            <div className={`
              mb-2 flex items-center justify-center gap-3
              sm:justify-start
            `}>
              <span className="text-2xl opacity-90">🎃</span>
              <h3 className={`
                text-lg leading-tight font-semibold text-orange-100
                sm:text-xl
              `}>
                Algo dulce y tenebroso llegó este octubre
              </h3>
              <span className="text-2xl opacity-90">🍫</span>
            </div>
            <p className={`
              text-sm font-medium text-orange-200/90
              sm:text-base
            `}>
              4 brigadeiros artesanales, cada uno con un toque monstruoso.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <Button
              size="lg"
              className={`
                transform rounded-lg border border-orange-400/50 bg-gradient-to-r from-orange-500
                to-amber-500 px-8 py-3 font-semibold text-white shadow-lg transition-all
                duration-200
                hover:scale-[1.02] hover:from-orange-600 hover:to-amber-600 hover:shadow-xl
              `}
            >
              Ordenar Ahora
            </Button>
          </div>
        </div>

        {/* Subtle animated accent */}
        <div className={`
          absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/80
          to-transparent
        `}></div>
      </div>
    </div>
  );
}