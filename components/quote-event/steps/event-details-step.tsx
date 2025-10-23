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
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { CITIES, EVENT_TYPES } from "@/lib/constants/quote-event-constants";
import { cn } from "@/lib/utils";
import { clamp, recommendedPieces } from "@/lib/utils/quote-event-utils";
import { format } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users2,
} from "lucide-react";
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
  piecesTotal,
  setEvent,
}: EventDetailsStepProps) {
  const recommend = recommendedPieces(event.guests);
  const showPiecesNudge = recommend > 0 && piecesTotal < recommend;
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() =>
    event.date ? new Date(event.date) : undefined
  );
  
  const [selectedHour, setSelectedHour] = useState<string>(() => {
    if (!event.time) return "";
    const [hours] = event.time.split(":");
    const hour = parseInt(hours);
    return hour === 0 ? "12" : hour > 12 ? (hour - 12).toString() : hour.toString();
  });
  
  const [selectedPeriod, setSelectedPeriod] = useState<string>(() => {
    if (!event.time) return "AM";
    const [hours] = event.time.split(":");
    const hour = parseInt(hours);
    return hour >= 12 ? "PM" : "AM";
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setEvent({ ...event, date: format(date, "yyyy-MM-dd") });
    } else {
      setEvent({ ...event, date: "" });
    }
  };

  const handleTimeChange = (hour: string, period: string) => {
    if (hour && period) {
      let hour24 = parseInt(hour);
      if (period === "PM" && hour24 !== 12) {
        hour24 += 12;
      } else if (period === "AM" && hour24 === 12) {
        hour24 = 0;
      }
      const timeString = `${hour24.toString().padStart(2, "0")}:00`;
      setEvent({ ...event, time: timeString });
    }
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
          md:grid-cols-2
        `}
      >
        <div className="space-y-2">
          <Label>Fecha</Label>
          <DatePicker
            date={selectedDate}
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
            onDateChange={handleDateSelect}
            placeholder="Selecciona una fecha"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Hora</Label>
          <div className="flex gap-2">
            <Select
              onValueChange={(hour) => {
                setSelectedHour(hour);
                handleTimeChange(hour, selectedPeriod);
              }}
              value={selectedHour}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Hora" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(period) => {
                setSelectedPeriod(period);
                handleTimeChange(selectedHour, period);
              }}
              value={selectedPeriod}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <FormInput
          helperText={
            showPiecesNudge
              ? `Sugerencia: ~2 piezas por invitado → ${recommend} piezas para ${event.guests} invitados.`
              : undefined
          }
          icon={Users2}
          inputMode="numeric"
          label="Invitados (opcional)"
          onChange={(e) =>
            setEvent({
              ...event,
              guests: e.target.value
                ? clamp(Number.parseInt(e.target.value) || 0, 0, 10000)
                : null,
            })
          }
          placeholder="Ej. 80"
          value={event.guests ?? ""}
        />

        <FormInput
          icon={MapPin}
          label="Ciudad / Colonia"
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
        <Button disabled={!isValid} onClick={onNext}>
          Continuar <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}