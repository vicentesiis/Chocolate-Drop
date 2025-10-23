import { InfoRow } from "@/components/quote-event/info-feature-rows";
import { ProductQtyCard } from "@/components/quote-event/product-qty-card";
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
import { Separator } from "@/components/ui/separator";
import {
  MIN_BRIGADEIROS,
  MIN_PASTELITOS,
  UNIT_PRICE_BRIGADEIROS,
  UNIT_PRICE_PASTELITOS,
} from "@/lib/constants/quote-event-constants";
import { BRIGADEIROS, CAKES } from "@/lib/data/products";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

interface ProductsStepProps {
  isValid: boolean;
  onNext: () => void;
  onPrev: () => void;
  presentation: "mesa" | "recuerdo";
  qtyBrigadeiros: number;
  qtyPastelitos: number;
  setPresentation: (p: "mesa" | "recuerdo") => void;
  setQtyBrigadeiros: (qty: number) => void;
  setQtyPastelitos: (qty: number) => void;
}

export function ProductsStep({
  isValid,
  onNext,
  onPrev,
  presentation,
  qtyBrigadeiros,
  qtyPastelitos,
  setPresentation,
  setQtyBrigadeiros,
  setQtyPastelitos,
}: ProductsStepProps) {
  // Get active flavors from products data
  const activeBrigadeiros = BRIGADEIROS.filter(b => b.isActive).map(b => b.name);
  const activeCakes = CAKES.filter(c => c.isActive).map(c => c.name);

  return (
    <Card>
      <CardHeader>
        <CardTitle>2) Productos, presentación y sabores</CardTitle>
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
        {/* Cantidades */}
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
            Incluye moldecitos decorativos y presentación lista para mesa o
            recuerdo.
            </p>
          </InfoRow>
        </div>

        {/* Presentation Selection */}
        <div className="md:col-span-2">
          <div className="mb-3 text-sm font-medium">Presentación</div>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`
                rounded-lg border p-3 text-left transition-colors
                ${presentation === "mesa" 
                  ? "border-primary bg-primary/5" 
                  : `
                    border-border
                    hover:bg-muted/50
                  `
                }
              `}
              onClick={() => setPresentation("mesa")}
              type="button"
            >
              <div className="font-medium">Mesa</div>
              <div className="text-xs text-muted-foreground">
                Presentación elegante para servir directamente
              </div>
            </button>
            <button
              className={`
                rounded-lg border p-3 text-left transition-colors
                ${presentation === "recuerdo" 
                  ? "border-primary bg-primary/5" 
                  : `
                    border-border
                    hover:bg-muted/50
                  `
                }
              `}
              onClick={() => setPresentation("recuerdo")}
              type="button"
            >
              <div className="font-medium">Recuerdo</div>
              <div className="text-xs text-muted-foreground">
                Empaque individual para llevar
              </div>
            </button>
          </div>
        </div>

        {/* Sabores (visual only) */}
        <div className={`
          rounded-xl border p-4
          md:col-span-2
        `}>
          <div className="mb-1 text-sm font-medium">
            Sabores disponibles (mezcla incluida)
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            Los sabores se entregan en <strong>mezcla variada</strong> según
            disponibilidad. Si necesitas evitar algún ingrediente, indícalo en
            las notas más adelante.
          </p>

          <div className={`
            grid gap-4
            md:grid-cols-2
          `}>
            {/* Brigadeiros list */}
            <div>
              <div className="mb-2 text-sm font-medium">Brigadeiros</div>
              <div className="flex flex-wrap gap-2">
                {activeBrigadeiros.map((name) => (
                  <Badge key={name} variant="secondary">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pastelitos list */}
            <div>
              <div className="mb-2 text-sm font-medium">Mini pastelitos</div>
              <div className="flex flex-wrap gap-2">
                {activeCakes.map((name) => (
                  <Badge key={name} variant="secondary">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="text-xs text-muted-foreground">
            Nota: la mezcla exacta puede variar por temporada y disponibilidad.
          </div>
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