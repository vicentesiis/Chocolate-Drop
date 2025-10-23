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
import { FlavorPicker } from "@/components/quote-event/flavor-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FlavorsStepProps {
  qtyPastelitos: number;
  qtyBrigadeiros: number;
  selectedFlavorsPastelitos: string[];
  setSelectedFlavorsPastelitos: (flavors: string[]) => void;
  selectedFlavorsBrigadeiros: string[];
  setSelectedFlavorsBrigadeiros: (flavors: string[]) => void;
  presentation: "mesa" | "recuerdo";
  setPresentation: (presentation: "mesa" | "recuerdo") => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
}

export function FlavorsStep({
  qtyPastelitos,
  qtyBrigadeiros,
  selectedFlavorsPastelitos,
  setSelectedFlavorsPastelitos,
  selectedFlavorsBrigadeiros,
  setSelectedFlavorsBrigadeiros,
  presentation,
  setPresentation,
  onNext,
  onPrev,
  isValid,
}: FlavorsStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>3) Sabores y presentación</CardTitle>
        <CardDescription>
          Selecciona sabores (opcional) y cómo quieres presentar los postres.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div
          className={`
            grid gap-4
            md:grid-cols-2
          `}
        >
          <FlavorPicker
            disabled={qtyPastelitos === 0}
            label="Sabores para Pastelitos"
            selected={selectedFlavorsPastelitos}
            setSelected={setSelectedFlavorsPastelitos}
          />
          <FlavorPicker
            disabled={qtyBrigadeiros === 0}
            label="Sabores para Brigadeiros"
            selected={selectedFlavorsBrigadeiros}
            setSelected={setSelectedFlavorsBrigadeiros}
          />
        </div>
        <div className="space-y-2">
          <Label>Presentación</Label>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: "mesa", label: "Mesa de postres" },
                { id: "recuerdo", label: "Recuerdito individual" },
              ] as const
            ).map((opt) => (
              <Button
                className="rounded-full"
                key={opt.id}
                onClick={() => setPresentation(opt.id)}
                type="button"
                variant={presentation === opt.id ? "default" : "outline"}
              >
                {opt.label}
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Incluye moldecitos decorativos y presentación lista para mesa o
            recuerdo.
          </p>
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