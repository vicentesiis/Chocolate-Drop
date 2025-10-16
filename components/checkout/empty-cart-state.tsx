import { ShoppingBag, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyCartState() {
  return (
    <div className="flex justify-center px-4">
      <Card className="max-w-md w-full shadow-sm border-0 bg-card/50 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4 sm:px-6">
          <div className="relative mb-6">
            <div className="rounded-full bg-gradient-to-br from-primary/10 to-primary/20 p-4 sm:p-6">
              <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </div>
            <div className="absolute -top-1 -right-1 rounded-full bg-muted p-1.5 sm:p-2">
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </div>
          </div>

          <h2 className="mb-3 text-xl sm:text-2xl font-bold">
            Tu carrito está vacío
          </h2>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground max-w-sm leading-relaxed">
            Parece que aún no has agregado ningún brigadeiro delicioso a tu
            carrito. ¡Explora nuestras opciones y encuentra tu sabor favorito!
          </p>

          <div className="space-y-3 w-full">
            <Link href="/" className="block">
              <Button
                size="lg"
                className="w-full h-12 sm:h-12 font-semibold text-sm sm:text-base active:scale-95 transition-transform"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Explorar Brigadeiros
              </Button>
            </Link>

            <Link href="/build-a-box" className="block">
              <Button
                variant="outline"
                size="lg"
                className="w-full h-12 sm:h-12 text-sm sm:text-base active:scale-95 transition-transform"
              >
                Armar mi Caja Personalizada
              </Button>
            </Link>
          </div>

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/50 w-full">
            <p className="text-xs text-muted-foreground">
              ¿Necesitas ayuda? Contáctanos y te ayudaremos a elegir
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
