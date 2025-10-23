import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FeatureRow } from "@/components/quote-event/info-feature-rows";
import { CART_RENTAL_PRICE, SERVICE_HOURS } from "@/lib/constants/quote-event-constants";
import { pesos } from "@/lib/utils/quote-event-utils";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ExtrasStepProps {
  withCart: boolean;
  setWithCart: (withCart: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ExtrasStep({
  withCart,
  setWithCart,
  onNext,
  onPrev,
}: ExtrasStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>4) Extras</CardTitle>
        <CardDescription>
          Potencia tu evento con carrito/barra y atención por {SERVICE_HOURS}{" "}
          horas.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div
          className={cn(
            "flex items-start gap-4 rounded-xl border p-4",
            withCart && "border-primary bg-primary/5",
          )}
        >
          <input
            checked={withCart}
            className="mt-1 h-4 w-4"
            id="withCart"
            onChange={(e) => setWithCart(e.target.checked)}
            type="checkbox"
          />
          <div className="flex-1">
            <Label className="text-base" htmlFor="withCart">
              Renta de Carrito / Barra de Postres
            </Label>
            <p className="text-sm text-muted-foreground">
              Incluye montaje, desmontaje y atención personalizada por{" "}
              {SERVICE_HOURS} horas.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary">
                {pesos(CART_RENTAL_PRICE)} flat
              </Badge>
              <Badge variant="outline">Montaje y desmontaje incluidos</Badge>
            </div>
            <div
              className={`
                mt-3 grid gap-2
                md:grid-cols-2
              `}
            >
              <FeatureRow text="Carrito elegante y personalizable" />
              <FeatureRow text="Variedad de brigadeiros y dulces" />
              <FeatureRow text="Barra amplia para eventos grandes" />
              <FeatureRow text="Decoración acorde al tema" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button onClick={onPrev} variant="ghost">
          <ChevronLeft className="mr-2 h-4 w-4" /> Atrás
        </Button>
        <Button onClick={onNext}>
          Continuar <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}