import { ArrowRight, Instagram } from "lucide-react";
import { Chewy } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const chewy = Chewy({
  subsets: ["latin"],
  weight: "400",
});

export function HeroContent() {
  return (
    <div
      className={`
        flex-1 text-center
        lg:text-left
      `}
    >
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
            h-12 w-full gap-2 px-8 font-semibold text-white shadow-lg transition-all duration-300
            hover:scale-105 hover:shadow-xl
            sm:w-auto sm:text-lg
          `}
          size="lg"
          asChild
        >
          <Link href="/build-a-box">
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
          <Link
            href="https://www.instagram.com/chocolatedrop.27"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-5 w-5" />
            Síguenos en Instagram
          </Link>
        </Button>
      </div>
    </div>
  );
}
