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
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { InfoRow } from "@/components/quote-event/info-feature-rows";
import { EVENT_TYPES, CITIES } from "@/lib/constants/quote-event-constants";
import type { EventDetails } from "@/lib/types/quote-event-types";
import { clamp, recommendedPieces } from "@/lib/utils/quote-event-utils";
import { cn } from "@/lib/utils";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Info,
  MapPin,
  Users2,
} from "lucide-react";

interface EventDetailsStepProps {
  event: EventDetails;
  setEvent: (event: EventDetails) => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
  piecesTotal: number;
}

export function EventDetailsStep({
  event,
  setEvent,
  onNext,
  onPrev,
  isValid,
  piecesTotal,
}: EventDetailsStepProps) {
  const recommend = recommendedPieces(event.guests);
  const showPiecesNudge = recommend > 0 && piecesTotal < recommend;

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
          <Label htmlFor="date">Fecha</Label>
          <div className="relative">
            <Input
              id="date"
              onChange={(e) => setEvent({ ...event, date: e.target.value })}
              type="date"
              value={event.date}
            />
            <CalendarIcon
              className={`
                pointer-events-none absolute top-1/2 right-3 h-4 w-4
                -translate-y-1/2 opacity-60
              `}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Hora</Label>
          <div className="relative">
            <Input
              id="time"
              onChange={(e) => setEvent({ ...event, time: e.target.value })}
              type="time"
              value={event.time}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="guests">Invitados (opcional)</Label>
          <div className="relative">
            <Input
              id="guests"
              inputMode="numeric"
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
            <Users2
              className={`
                pointer-events-none absolute top-1/2 right-3 h-4 w-4
                -translate-y-1/2 opacity-60
              `}
            />
          </div>
          {showPiecesNudge && (
            <p className="text-sm text-muted-foreground">
              Sugerencia: ~2 piezas por invitado →{" "}
              <strong>{recommend}</strong> piezas para {event.guests}{" "}
              invitados.
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad / Colonia</Label>
          <div className="relative">
            <Input
              id="city"
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
            <MapPin
              className={`
                pointer-events-none absolute top-1/2 right-3 h-4 w-4
                -translate-y-1/2 opacity-60
              `}
            />
          </div>
        </div>
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