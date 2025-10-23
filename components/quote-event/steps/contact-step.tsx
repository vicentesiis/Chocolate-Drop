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
import { Textarea } from "@/components/ui/textarea";
import type { ContactDetails } from "@/lib/types/quote-event-types";
import { ChevronLeft, ChevronRight, Mail, Percent, Phone } from "lucide-react";

interface ContactStepProps {
  contact: ContactDetails;
  setContact: (contact: ContactDetails) => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
}

export function ContactStep({
  contact,
  setContact,
  onNext,
  onPrev,
  isValid,
}: ContactStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>5) Datos de contacto</CardTitle>
        <CardDescription>
          Te enviaremos la cotización a tu correo (y opcionalmente por
          WhatsApp).
        </CardDescription>
      </CardHeader>
      <CardContent
        className={`
          grid gap-4
          md:grid-cols-2
        `}
      >
        <div
          className={`
            space-y-2
            md:col-span-1
          `}
        >
          <Label htmlFor="name">Nombre completo</Label>
          <Input
            id="name"
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            placeholder="Tu nombre"
            value={contact.name}
          />
        </div>
        <div
          className={`
            space-y-2
            md:col-span-1
          `}
        >
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input
              id="email"
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
              placeholder="tucorreo@ejemplo.com"
              type="email"
              value={contact.email}
            />
            <Mail
              className={`
                pointer-events-none absolute top-1/2 right-3 h-4 w-4
                -translate-y-1/2 opacity-60
              `}
            />
          </div>
        </div>
        <div
          className={`
            space-y-2
            md:col-span-1
          `}
        >
          <Label htmlFor="phone">Teléfono</Label>
          <div className="relative">
            <Input
              id="phone"
              inputMode="numeric"
              onChange={(e) =>
                setContact({ ...contact, phone: e.target.value })
              }
              placeholder="10 dígitos"
              value={contact.phone}
            />
            <Phone
              className={`
                pointer-events-none absolute top-1/2 right-3 h-4 w-4
                -translate-y-1/2 opacity-60
              `}
            />
          </div>
        </div>
        <div
          className={`
            space-y-2
            md:col-span-1
          `}
        >
          <Label htmlFor="promo">Descuento (opcional, %)</Label>
          <div className="relative">
            <Input
              id="promo"
              inputMode="numeric"
              onChange={(e) =>
                setContact({
                  ...contact,
                  promo: e.target.value.replace(/[^0-9]/g, ""),
                })
              }
              placeholder="Ej. 10"
              value={contact.promo}
            />
            <Percent
              className={`
                pointer-events-none absolute top-1/2 right-3 h-4 w-4
                -translate-y-1/2 opacity-60
              `}
            />
          </div>
        </div>
        <div
          className={`
            space-y-2
            md:col-span-2
          `}
        >
          <Label htmlFor="notes">Notas del evento</Label>
          <Textarea
            id="notes"
            onChange={(e) => setContact({ ...contact, notes: e.target.value })}
            placeholder="Tema, colores, restricciones, horario de montaje, etc."
            value={contact.notes}
          />
        </div>
        <p
          className={`
            text-xs text-muted-foreground
            md:col-span-2
          `}
        >
          Al enviar aceptas ser contactad@ por correo o WhatsApp. Anticipo del
          50% para confirmar la fecha.
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button onClick={onPrev} variant="ghost">
          <ChevronLeft className="mr-2 h-4 w-4" /> Atrás
        </Button>
        <div className="flex items-center gap-2">
          <Button onClick={() => onNext()} variant="outline">
            Ver resumen
          </Button>
          <Button disabled={!isValid} onClick={() => onNext()}>
            Continuar <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}