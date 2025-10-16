import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Phone, CheckCircle, AlertCircle } from "lucide-react";
import type { CustomerData, ValidationErrors } from "@/lib/checkout-utils";

interface CheckoutFormProps {
  customerData: CustomerData;
  errors: ValidationErrors;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CheckoutForm({
  customerData,
  errors,
  onInputChange,
}: CheckoutFormProps) {
  const isNameValid = customerData.name.trim() && !errors.name;
  const isPhoneValid = customerData.phone.trim() && !errors.phone;

  return (
    <Card className="shadow-sm border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
            <span className="hidden sm:inline">Información de Contacto</span>
            <span className="sm:hidden">Datos de Contacto</span>
          </CardTitle>
          <Badge variant="outline" className="text-xs px-2 py-1">
            2/3
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Necesitamos estos datos para coordinar la entrega
        </p>
      </CardHeader>
      <CardContent className="space-y-5 sm:space-y-6 px-4 sm:px-6">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm font-medium flex items-center"
          >
            Nombre Completo *
            {isNameValid && (
              <CheckCircle className="h-4 w-4 ml-2 text-green-600" />
            )}
          </Label>
          <div className="relative">
            <Input
              id="name"
              name="name"
              type="text"
              value={customerData.name}
              onChange={onInputChange}
              placeholder="Ej: María González López"
              className={`pl-10 h-12 sm:h-10 text-base sm:text-sm transition-all duration-200 ${
                errors.name
                  ? "border-red-500 focus-visible:ring-red-500 bg-red-50/50"
                  : isNameValid
                    ? "border-green-500 focus-visible:ring-green-500 bg-green-50/50"
                    : "focus-visible:ring-primary"
              }`}
              required
              autoComplete="name"
              inputMode="text"
            />
            <User
              className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
                errors.name
                  ? "text-red-500"
                  : isNameValid
                    ? "text-green-600"
                    : "text-muted-foreground"
              }`}
            />
            {errors.name && (
              <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500" />
            )}
          </div>
          {errors.name && (
            <div className="flex items-start mt-2 p-2 bg-red-50 rounded-md">
              <AlertCircle className="h-4 w-4 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 leading-tight">
                {errors.name}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className="text-sm font-medium flex items-center"
          >
            Teléfono *
            {isPhoneValid && (
              <CheckCircle className="h-4 w-4 ml-2 text-green-600" />
            )}
          </Label>
          <div className="relative">
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={customerData.phone}
              onChange={onInputChange}
              placeholder="Ej: +52 55 1234 5678"
              className={`pl-10 h-12 sm:h-10 text-base sm:text-sm transition-all duration-200 ${
                errors.phone
                  ? "border-red-500 focus-visible:ring-red-500 bg-red-50/50"
                  : isPhoneValid
                    ? "border-green-500 focus-visible:ring-green-500 bg-green-50/50"
                    : "focus-visible:ring-primary"
              }`}
              required
              autoComplete="tel"
              inputMode="tel"
            />
            <Phone
              className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
                errors.phone
                  ? "text-red-500"
                  : isPhoneValid
                    ? "text-green-600"
                    : "text-muted-foreground"
              }`}
            />
            {errors.phone && (
              <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500" />
            )}
          </div>
          {errors.phone && (
            <div className="flex items-start mt-2 p-2 bg-red-50 rounded-md">
              <AlertCircle className="h-4 w-4 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 leading-tight">
                {errors.phone}
              </p>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Te contactaremos para coordinar la entrega
          </p>
        </div>

        {/* Form Progress */}
        <div className="pt-3 sm:pt-4 border-t">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground text-xs sm:text-sm">
              Progreso del formulario
            </span>
            <span className="font-medium text-xs sm:text-sm">
              {[isNameValid, isPhoneValid].filter(Boolean).length} de 2
              completados
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 ease-out"
              style={{
                width: `${([isNameValid, isPhoneValid].filter(Boolean).length / 2) * 100}%`,
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
