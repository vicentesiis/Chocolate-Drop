import type { EventDetails } from "@/lib/types/quote-event-types";

import { FormInput } from "@/components/shared/forms/form-input";
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
import { Toggle } from "@/components/ui/toggle";
import { CITIES, EVENT_TYPES } from "@/lib/constants/quote-event-constants";
import { cn } from "@/lib/utils";
import { toLocalISODate } from "@/lib/utils/utils";
import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";

interface EventDetailsStepProps {
  event: EventDetails;
  isValid: boolean;
  onNext: () => void;
  onPrev: () => void;
  piecesTotal: number;
  setEvent: (event: EventDetails) => void;
}

export function EventDetailsStep({
  event,
  isValid,
  onNext,
  setEvent,
}: EventDetailsStepProps) {
  const [dateError, setDateError] = useState<string>("");

  const handleNext = () => {
    // Check if date is before today
    if (event.date) {
      const selectedDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to compare only dates

      if (selectedDate < today) {
        setDateError("La fecha del evento no puede ser anterior a hoy");
        return;
      }
    }

    setDateError("");
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>1) Detalles del evento</CardTitle>
        <CardDescription>
          Cuéntanos lo básico para poder sugerirte cantidades y presentación.
        </CardDescription>
      </CardHeader>
      <CardContent
        className={`
          grid gap-4
          sm:grid-cols-2
        `}
      >
        <FormInput
          icon={MapPin}
          label="Ciudad"
          list="city-list"
          onChange={(e) => setEvent({ ...event, city: e.target.value })}
          placeholder="Ej. San Pedro"
          value={event.city}
        />
        <datalist id="city-list">
          {CITIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>

        <FormInput
          error={dateError}
          icon={Calendar}
          label="Fecha del evento"
          min={toLocalISODate(new Date())}
          onChange={(e) => {
            setEvent({ ...event, date: e.target.value });
            setDateError(""); // Clear error when user changes date
          }}
          type="date"
          value={event.date}
        />
        <div className="col-span-full">
          <Label>Tipo de evento</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {EVENT_TYPES.map(({ icon: Icon, id, label }) => (
              <Toggle
                className={cn(
                  `
                    rounded-full px-3 py-2 text-sm
                    data-[state=on]:bg-primary
                    data-[state=on]:text-primary-foreground
                  `,
                  event.type === id ? "" : "bg-muted",
                )}
                key={id}
                onPressedChange={() => setEvent({ ...event, type: id })}
                pressed={event.type === id}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Toggle>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button disabled variant="ghost">
          <ChevronLeft className="mr-2 h-4 w-4" /> Atrás
        </Button>
        <Button disabled={!isValid} onClick={handleNext}>
          Continuar <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
