import { HeroContent } from "./hero-content";
import { HeroImage } from "./hero-image";

export function Hero() {
  return (
    <div
      className={`
        relative flex min-h-screen-minus-navbar w-full items-center justify-center overflow-hidden
        border-b border-orange-200/50 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50
        sm:py-12
        lg:py-16
      `}
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`
            absolute top-20 left-10 h-32 w-32 rounded-full bg-gradient-to-br from-orange-200/30
            to-amber-200/30 blur-xl
          `}
        ></div>
        <div
          className={`
            absolute right-10 bottom-20 h-40 w-40 rounded-full bg-gradient-to-br from-rose-200/30
            to-orange-200/30 blur-xl
          `}
        ></div>
        <div
          className={`
            absolute top-1/2 left-1/3 h-24 w-24 rounded-full bg-gradient-to-br from-amber-300/20
            to-orange-300/20 blur-lg
          `}
        ></div>
      </div>
      <div
        className={`
          mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-4
          sm:px-6
          lg:flex-row lg:gap-12
          xl:gap-16
        `}
      >
        <HeroContent />
        <HeroImage />
      </div>
    </div>
  );
}