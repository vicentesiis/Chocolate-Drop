import { Check } from "lucide-react";
import type { DessertCartHighlight } from "./types";

const highlights: DessertCartHighlight[] = [
  {
    id: "elegant-cart",
    text: "Carrito de postres elegante y personalizable",
  },
  {
    id: "variety",
    text: "Amplia variedad de dulces y golosinas",
  },
  {
    id: "professional-service",
    text: "Configuración y servicio profesional",
  },
];

export function DessertCartHighlights() {
  return (
    <div className="space-y-3">
      {highlights.map((highlight) => (
        <div className="flex items-center gap-3" key={highlight.id}>
          <div
            className={`
              flex h-5 w-5 items-center justify-center rounded-full bg-primary/20
            `}
          >
            <Check className="h-3 w-3 text-primary" />
          </div>
          <span className="text-muted-foreground">{highlight.text}</span>
        </div>
      ))}
    </div>
  );
}
