import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerData, ValidationErrors } from "@/lib/checkout-utils";

interface CheckoutFormProps {
  customerData: CustomerData;
  errors: ValidationErrors;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CheckoutForm({ customerData, errors, onInputChange }: CheckoutFormProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Información de Contacto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Nombre Completo *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={customerData.name}
            onChange={onInputChange}
            placeholder="Ingresa tu nombre completo"
            className={errors.name ? `
              border-red-500
              focus-visible:ring-red-500
            ` : ""}
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Teléfono *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={customerData.phone}
            onChange={onInputChange}
            placeholder="Ingresa tu número de teléfono"
            className={errors.phone ? `
              border-red-500
              focus-visible:ring-red-500
            ` : ""}
            required
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}