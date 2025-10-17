import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone } from "lucide-react";
import { FormInput } from "@/components/shared/forms/form-input";
import { useCustomerForm } from "@/hooks/use-customer-form";
import type { CustomerData } from "@/lib/schemas/customer";

interface CheckoutFormProps {
  defaultValues?: Partial<CustomerData>;
  onFormChange?: (data: CustomerData, isValid: boolean) => void;
  onSubmit?: (data: CustomerData) => void;
}

export function CheckoutForm({
  defaultValues,
  onFormChange,
  onSubmit,
}: CheckoutFormProps) {
  const {
    register,
    errors,
    isNameValid,
    isPhoneValid,
    completedFields,
    totalFields,
    watch,
    handleSubmit,
  } = useCustomerForm({
    defaultValues,
    onSubmit,
  });

  // Watch form changes and notify parent
  const watchedData = watch();
  const isFormValid = Boolean(isNameValid && isPhoneValid);

  React.useEffect(() => {
    onFormChange?.(watchedData, isFormValid);
  }, [watchedData, isFormValid, onFormChange]);

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
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <FormInput
            label="Nombre Completo"
            placeholder="Ej: María González López"
            icon={User}
            error={errors.name?.message}
            isValid={isNameValid}
            required
            autoComplete="name"
            inputMode="text"
            {...register("name")}
          />

          <FormInput
            label="Teléfono"
            type="tel"
            placeholder="Ej: +52 55 1234 5678"
            icon={Phone}
            error={errors.phone?.message}
            isValid={isPhoneValid}
            helperText="Te contactaremos para coordinar la entrega"
            required
            autoComplete="tel"
            inputMode="tel"
            {...register("phone")}
          />

          {/* Form Progress */}
          <div className="pt-3 sm:pt-4 border-t">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground text-xs sm:text-sm">
                Progreso del formulario
              </span>
              <span className="font-medium text-xs sm:text-sm">
                {completedFields} de {totalFields} completados
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 ease-out"
                style={{
                  width: `${(completedFields / totalFields) * 100}%`,
                }}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
