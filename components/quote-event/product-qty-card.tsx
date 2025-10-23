import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

interface ProductQtyCardProps {
  min: number;
  setValue: (n: number) => void;
  subtitle: string;
  title: string;
  value: number;
}

export function ProductQtyCard({
  min,
  setValue,
  subtitle,
  title,
  value,
}: ProductQtyCardProps) {
  const meetsMin = value === 0 || value >= min;

  return (
    <Card className={cn("h-full", !meetsMin && "border-destructive/60")}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setValue(Math.max(0, value - 10))}
            size="icon"
            type="button"
            variant="outline"
          >
            -10
          </Button>
          <Button
            onClick={() => setValue(Math.max(0, value - 1))}
            size="icon"
            type="button"
            variant="outline"
          >
            -
          </Button>
          <Input
            className="w-32 text-center"
            inputMode="numeric"
            onChange={(e) =>
              setValue(Math.max(0, Number.parseInt(e.target.value || "0") || 0))
            }
            placeholder="0"
            value={value}
          />
          <Button
            onClick={() => setValue(value + 1)}
            size="icon"
            type="button"
            variant="outline"
          >
            +
          </Button>
          <Button
            onClick={() => setValue(value + 10)}
            size="icon"
            type="button"
            variant="outline"
          >
            +10
          </Button>
        </div>
        {!meetsMin && (
          <p className="mt-2 text-sm text-destructive">
            Mínimo {min} para continuar.
          </p>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={() => setValue(0)} size="sm" variant="ghost">
          <Trash2 className="mr-1 h-4 w-4" /> Limpiar
        </Button>
      </CardFooter>
    </Card>
  );
}
