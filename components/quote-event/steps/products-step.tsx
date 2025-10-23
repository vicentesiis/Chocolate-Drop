import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InfoRow } from "@/components/quote-event/info-feature-rows";
import { ProductQtyCard } from "@/components/quote-event/product-qty-card";
import {
  MIN_BRIGADEIROS,
  MIN_PASTELITOS,
  UNIT_PRICE_BRIGADEIROS,
  UNIT_PRICE_PASTELITOS,
} from "@/lib/constants/quote-event-constants";
import { recommendedPieces } from "@/lib/utils/quote-event-utils";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

interface ProductsStepProps {
  qtyPastelitos: number;
  setQtyPastelitos: (qty: number) => void;
  qtyBrigadeiros: number;
  setQtyBrigadeiros: (qty: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
  guests: number | null;
  piecesTotal: number;
}

export function ProductsStep({
  qtyPastelitos,
  setQtyPastelitos,
  qtyBrigadeiros,
  setQtyBrigadeiros,
  onNext,
  onPrev,
  isValid,
  guests,
  piecesTotal,
}: ProductsStepProps) {
  const recommend = recommendedPieces(guests);
  const showPiecesNudge = recommend > 0 && piecesTotal < recommend;

  return (
    <Card>
      <CardHeader>
        <CardTitle>2) Productos y cantidades</CardTitle>
        <CardDescription>
          Los mínimos se validan por producto: 50 pastelitos, 100 brigadeiros.
        </CardDescription>
      </CardHeader>
      <CardContent
        className={`
          grid gap-4
          md:grid-cols-2
        `}
      >
        <ProductQtyCard
          min={MIN_PASTELITOS}
          setValue={setQtyPastelitos}
          subtitle={`$${UNIT_PRICE_PASTELITOS} c/u · mínimo ${MIN_PASTELITOS}`}
          title="Mini pastelitos gourmet"
          value={qtyPastelitos}
        />
        <ProductQtyCard
          min={MIN_BRIGADEIROS}
          setValue={setQtyBrigadeiros}
          subtitle={`$${UNIT_PRICE_BRIGADEIROS} c/u · mínimo ${MIN_BRIGADEIROS}`}
          title="Brigadeiros"
          value={qtyBrigadeiros}
        />
        <div className="md:col-span-2">
          <InfoRow>
            <Info className="h-4 w-4" />
            <p className="text-sm text-muted-foreground">
              Puedes elegir solo uno de los productos o ambos. Los mínimos no se
              combinan entre sí.
            </p>
          </InfoRow>
          {showPiecesNudge && (
            <p className="mt-2 text-sm text-muted-foreground">
              Recomendación por invitados: {recommend} piezas. Actualmente
              llevas {piecesTotal}.
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button onClick={onPrev} variant="ghost">
          <ChevronLeft className="mr-2 h-4 w-4" /> Atrás
        </Button>
        <Button disabled={!isValid} onClick={onNext}>
          Continuar <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}