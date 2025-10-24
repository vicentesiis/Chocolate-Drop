import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressProps {
  step: number; // 0-indexed
}

export function Progress({ step }: ProgressProps) {
  const steps = ["Evento", "Productos", "Extras", "Resumen"];
  const total = steps.length;
  const pct =
    total > 1 ? Math.min(100, Math.max(0, (step / (total - 1)) * 100)) : 0;

  return (
    <nav
      aria-label="Progreso"
      className={cn(
        `
          rounded-xl border bg-gradient-to-b from-background to-muted/30 p-3
          md:p-4
        `,
        "shadow-[inset_0_1px_0_0_hsl(var(--border))]",
      )}
    >
      {/* Mobile: compact progress bar + labels (UI-only) */}
      <div className="md:hidden">
        <div
          className={`relative h-2 w-full overflow-hidden rounded-full bg-muted`}
        >
          <div
            aria-hidden="true"
            className={`
              h-full w-0 rounded-full bg-primary transition-all duration-300
              ease-out
            `}
            style={{ width: `${pct}%` }}
          />
          {/* soft highlight */}
          <div
            className={`
              pointer-events-none absolute inset-0 rounded-full
              shadow-[0_0_0_1px_rgba(0,0,0,0.03)_inset]
            `}
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Paso{" "}
            <span className="font-medium text-foreground">
              {Math.min(step + 1, total)}
            </span>{" "}
            de {total}
          </span>
          <span className="font-medium">{steps[step] ?? ""}</span>
        </div>
      </div>

      {/* Desktop: badges + animated connectors (UI-only) */}
      <ol
        className={`
          hidden select-none
          md:flex md:flex-wrap md:items-center md:gap-3
        `}
      >
        {steps.map((label, idx) => {
          const isDone = idx < step;
          const isCurrent = idx === step;

          return (
            <li className="flex items-center gap-2" key={label}>
              {/* Dot */}
              <div
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Paso ${idx + 1}: ${label}`}
                className={cn(
                  `
                    relative flex h-8 w-8 items-center justify-center
                    rounded-full text-xs font-medium
                  `,
                  "transition-colors duration-300",
                  isDone && "bg-primary text-primary-foreground",
                  isCurrent &&
                    `
                      bg-primary/90 text-primary-foreground ring-2
                      ring-primary/25
                    `,
                  !isDone && !isCurrent && "bg-muted text-muted-foreground",
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : idx + 1}
                {/* subtle glow for current */}
                {isCurrent && (
                  <span
                    className={`
                      pointer-events-none absolute inset-0 rounded-full
                      bg-primary/10 blur-[2px]
                    `}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-sm whitespace-nowrap",
                  isCurrent
                    ? "font-semibold"
                    : isDone
                      ? "text-foreground/80"
                      : `text-muted-foreground`,
                )}
              >
                {label}
              </span>

              {/* Connector */}
              {idx < total - 1 && (
                <div
                  className={`
                    relative mx-1 hidden h-8 items-center
                    md:flex
                  `}
                >
                  {/* base hairline */}
                  <Separator
                    className="h-6 w-px bg-border"
                    orientation="vertical"
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
