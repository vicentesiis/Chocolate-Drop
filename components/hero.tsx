import { ArrowRight, Instagram } from "lucide-react";
import { Chewy } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const chewy = Chewy({
  subsets: ["latin"],
  weight: "400",
});

const Hero = () => {
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
        <div className={`
          flex-1 text-center
          lg:text-left
        `}>
          <h1
            className={`
              font-display bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-4xl
              leading-tight font-bold tracking-tight text-transparent
              sm:text-5xl sm:leading-tight
              md:text-6xl md:leading-tight
              lg:text-6xl lg:leading-tight
              xl:text-7xl xl:leading-[1.1]
            `}
          >
            BRIGADEIROS GOURMET, DULCES DE BRASIL
          </h1>
          <p
            className={`
              ${chewy.className}
              text-lg text-muted-foreground/80
              sm:mt-4 sm:text-xl
              md:mt-6 md:text-2xl
              lg:text-2xl
              xl:text-3xl
            `}
          >
            From our hearts, to your hands
          </p>
          <div
            className={`
              mt-6 flex flex-col items-center gap-3
              sm:mt-8 sm:flex-row sm:justify-center sm:gap-4
              lg:justify-start
            `}
          >
            <Button
              className={`
                h-12 w-full gap-2 px-8 font-semibold text-white shadow-lg transition-all
                duration-300
                hover:scale-105 hover:shadow-xl
                sm:w-auto sm:text-lg
              `}
              size="lg"
              asChild
            >
              <Link href="#packages">
                Haz tu pedido <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              className={`
                h-12 w-full gap-2 px-8 font-semibold shadow-md transition-all duration-300
                hover:scale-105 hover:shadow-lg
                sm:w-auto sm:text-lg
              `}
              size="lg"
              variant="outline"
              asChild
            >
              <Link href="https://www.instagram.com/chocolatedrop.27" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
                Síguenos en Instagram
              </Link>
            </Button>
          </div>
        </div>
        <div
          className={`
            chocolate-shadow warm-glow relative aspect-square w-full max-w-sm flex-shrink-0
            overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 ring-1
            ring-orange-200/50 transition-transform duration-500
            hover:scale-105
            sm:max-w-md
            lg:aspect-[1] lg:max-w-lg
            xl:max-w-xl
          `}
        >
          <Image 
            src="/hero.jpg" 
            fill 
            alt="Delicious Brazilian brigadeiros" 
            className="rounded-2xl object-cover" 
            priority 
          />
          <div
            className={`
              absolute inset-0 rounded-2xl bg-gradient-to-t from-orange-900/20 via-transparent
              to-transparent
            `}
          ></div>
          {/* Floating badge */}
          <div
            className={`
              absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold
              text-orange-800 shadow-lg backdrop-blur-sm
            `}
          >
            Artesanal
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
