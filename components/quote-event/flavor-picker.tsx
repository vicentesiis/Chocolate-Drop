import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FLAVORS } from "@/lib/constants/quote-event-constants";
import { cn } from "@/lib/utils";

interface FlavorPickerProps {
  disabled?: boolean;
  label: string;
  selected: string[];
  setSelected: (ids: string[]) => void;
}

export function FlavorPicker({
  disabled,
  label,
  selected,
  setSelected,
}: FlavorPickerProps) {
  return (
    <div className={cn("rounded-xl border p-4", disabled && "opacity-60")}>
      <div className="mb-2 flex items-center justify-between">
        <Label className="text-base">{label}</Label>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Clásico</Badge>
          <Badge variant="outline">Premium</Badge>
          <Badge variant="outline">Fruta</Badge>
          <Badge variant="outline">Nuez</Badge>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {FLAVORS.map((f) => {
          const active = selected.includes(f.id);
          return (
            <Button
              className="rounded-full"
              disabled={disabled}
              key={f.id}
              onClick={() => {
                if (active) setSelected(selected.filter((id) => id !== f.id));
                else setSelected([...selected, f.id]);
              }}
              size="sm"
              type="button"
              variant={active ? "default" : "outline"}
            >
              {f.label}
            </Button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Tip: Puedes distribuir cantidades por sabor más adelante en el proceso
        (opcional).
      </p>
    </div>
  );
}
