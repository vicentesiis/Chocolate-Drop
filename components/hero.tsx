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
    <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center overflow-hidden border-accent border-b">
      <div className="mx-auto flex w-full max-w-(--breakpoint-xl) flex-col items-center justify-between gap-x-10 gap-y-14 px-6 py-12 lg:flex-row lg:py-0">
        <div className="max-w-xl">
          <h1
            className={`bg-gradient-to-r from-primary to-primary/70 bg-clip-text font-bold font-display text-4xl text-transparent leading-tight tracking-tight sm:text-5xl md:text-6xl lg:leading-[1.1]`}
          >
            BRIGADEIROS GOURMET, DULCES DE BRASIL
          </h1>
          <p
            className={`${chewy.className} max-w-[700px] text-muted-foreground text-xl md:text-3xl`}
          >
            From our hearts, to your hands
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Button className={`h-12 gap-1.5 px-8 transition-colors duration-200`} size="lg">
              Haz tu pedido <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative aspect-square w-full rounded-xl bg-accent lg:max-w-lg xl:max-w-xl">
          <Image src="/hero.jpg" fill alt="" className="rounded-xl object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
