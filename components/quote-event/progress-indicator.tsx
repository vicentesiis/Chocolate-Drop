import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ProgressProps {
  step: number;
}

export function Progress({ step }: ProgressProps) {
  const steps = [
    "Evento",
    "Productos",
    "Sabores",
    "Extras",
    "Contacto",
    "Resumen",
  ];

  return (
    <div className="rounded-xl border p-3">
      <ol
        className={`
          flex flex-wrap items-center gap-2 text-sm
          md:gap-3
        `}
      >
        {steps.map((label, idx) => (
          <li className="flex items-center gap-2" key={label}>
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs",
                idx <= step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {idx + 1}
            </span>
            <span
              className={cn(
                `
                  hidden
                  md:inline
                `,
                idx <= step ? "font-medium" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
            {idx < steps.length - 1 && (
              <Separator
                className={`
                  mx-1 hidden h-4
                  md:block
                `}
                orientation="vertical"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
