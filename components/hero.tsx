import { ArrowRight } from "lucide-react";
import { Chewy } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const chewy = Chewy({
  subsets: ["latin"],
  weight: "400",
});

const Hero = () => {
  return (
    <div
      className={`
        relative flex h-screen-minus-navbar w-full items-start justify-center overflow-hidden
        border-b border-orange-200/50 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 pt-4
        lg:items-start
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
          mx-auto flex w-full max-w-(--breakpoint-xl) flex-col items-center justify-start gap-x-8
          gap-y-4 px-4 py-2
          sm:gap-y-6 sm:px-6 sm:py-4
          md:gap-y-8 md:py-6
          lg:h-full lg:flex-row lg:justify-center
        `}
      >
        <div className="max-w-xl">
          <h1
            className={`
              font-display bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-3xl
              leading-tight font-bold tracking-tight text-transparent
              sm:text-5xl
              md:text-6xl
              lg:text-7xl lg:leading-[1.1]
            `}
          >
            BRIGADEIROS GOURMET, DULCES DE BRASIL
          </h1>
          <p
            className={`
              ${chewy.className}
              mt-2 max-w-[700px] text-xl text-muted-foreground
              sm:mt-3 sm:text-2xl
              md:mt-4 md:text-3xl
              lg:mt-6 lg:text-4xl
            `}
          >
            From our hearts, to your hands
          </p>
          {/* Button visible on sm+ screens */}
          <div
            className={`
              mt-4 hidden flex-col items-center gap-4
              sm:mt-5 sm:flex sm:flex-row
              md:mt-6
              lg:mt-8
            `}
          >
            <Button
              className={`
                h-12 gap-1.5 px-8 font-semibold text-white transition-all duration-300
                hover:scale-105
              `}
              size="lg"
            >
              Haz tu pedido <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div
          className={`
            chocolate-shadow warm-glow relative aspect-square w-full max-w-sm rounded-xl
            bg-gradient-to-br from-orange-100 to-amber-100 ring-1 ring-orange-200/50
            sm:max-w-md
            md:max-w-lg
            lg:max-w-lg
            xl:max-w-xl
          `}
        >
          <Image src="/hero.jpg" fill alt="" className="rounded-xl object-cover" />
          <div
            className={`
              absolute inset-0 rounded-xl bg-gradient-to-t from-orange-900/10 via-transparent
              to-transparent
            `}
          ></div>
        </div>
        {/* Button visible only on mobile */}
        <div
          className={`
            flex w-full flex-col items-center gap-4
            sm:hidden
          `}
        >
          <Button
            className={`
              chocolate-gradient chocolate-shadow h-12 gap-1.5 px-8 font-semibold text-white
              transition-all duration-300
              hover:scale-105
            `}
            size="lg"
          >
            Haz tu pedido <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
