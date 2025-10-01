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
        flex w-full items-center justify-center overflow-hidden border-b border-accent
        sm:h-screen
      `}
    >
      <div
        className={`
          mx-auto flex w-full max-w-(--breakpoint-xl) flex-col items-center justify-between gap-x-10
          gap-y-6 px-4 py-4
          sm:gap-y-8 sm:px-6 sm:py-6
          lg:flex-row lg:gap-y-14 lg:py-0
        `}
      >
        <div className="max-w-xl">
          <h1
            className={`
              font-display bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-2xl
              leading-tight font-bold tracking-tight text-transparent
              sm:text-4xl
              md:text-5xl
              lg:text-6xl lg:leading-[1.1]
            `}
          >
            BRIGADEIROS GOURMET, DULCES DE BRASIL
          </h1>
          <p
            className={`
              ${chewy.className}
              max-w-[700px] text-lg text-muted-foreground
              sm:text-xl
              md:text-2xl
              lg:text-3xl
            `}
          >
            From our hearts, to your hands
          </p>
          {/* Button visible on sm+ screens */}
          <div
            className={`
              mt-4 hidden flex-col items-center gap-4
              sm:mt-6 sm:flex sm:flex-row
              lg:mt-8
            `}
          >
            <Button className={`h-12 gap-1.5 px-8 transition-colors duration-200`} size="lg">
              Haz tu pedido <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div
          className={`
            relative aspect-square w-full max-w-xs rounded-xl bg-accent
            sm:max-w-sm
            lg:max-w-lg
            xl:max-w-xl
          `}
        >
          <Image src="/hero.jpg" fill alt="" className="rounded-xl object-cover" />
        </div>
        {/* Button visible only on mobile */}
        <div
          className={`
            flex w-full flex-col items-center gap-4
            sm:hidden
          `}
        >
          <Button className={`h-12 gap-1.5 px-8 transition-colors duration-200`} size="lg">
            Haz tu pedido <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
