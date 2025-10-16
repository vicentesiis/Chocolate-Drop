import { Check } from "lucide-react";

const highlights = [
  "Recetas 100% originales y artesanales",
  "Chocolate belga e ingredientes orgánicos",
  "Tradición brasileña adaptada al gusto mexicano",
  "Un sabor nuevo cada mes",
];

export function AboutHighlights() {
  return (
    <div className="space-y-3">
      {highlights.map((highlight, index) => (
        <div className="flex items-center gap-3" key={index}>
          <div
            className={`
              flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full
              bg-primary/20
            `}
          >
            <Check className="h-3 w-3 text-primary" />
          </div>
          <span className="text-muted-foreground">{highlight}</span>
        </div>
      ))}
    </div>
  );
}
