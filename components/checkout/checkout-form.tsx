import type { CustomerData } from "@/lib/schemas/customer";

import { FormInput } from "@/components/shared/forms/form-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCustomerForm } from "@/hooks/use-customer-form";
import { Phone, User } from "lucide-react";
import React from "react";

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
  const { errors, handleSubmit, isNameValid, isPhoneValid, register, watch } =
    useCustomerForm({
      defaultValues,
      onSubmit,
    });

  // Watch individual fields to avoid object reference issues
  const nameValue = watch("name");
  const phoneValue = watch("phone");
  const isFormValid = Boolean(isNameValid && isPhoneValid);

  React.useEffect(() => {
    const currentData: CustomerData = {
      name: nameValue || "",
      phone: phoneValue || "",
    };
    onFormChange?.(currentData, isFormValid);
  }, [nameValue, phoneValue, isFormValid, onFormChange]);

  return (
    <Card className="border-0 bg-card/50 shadow-sm backdrop-blur-sm">
      <CardHeader
        className={`
          px-4 pb-3
          sm:px-6 sm:pb-4
        `}
      >
        <div className="flex items-center justify-between">
          <CardTitle
            className={`
              flex items-center text-lg
              sm:text-xl
            `}
          >
            <User
              className={`
                mr-2 h-4 w-4 text-primary
                sm:h-5 sm:w-5
              `}
            />
            <span
              className={`
                hidden
                sm:inline
              `}
            >
              Información de Contacto
            </span>
            <span className="sm:hidden">Datos de Contacto</span>
          </CardTitle>
        </div>
        <p
          className={`
            text-xs text-muted-foreground
            sm:text-sm
          `}
        >
          Necesitamos estos datos para coordinar la entrega
        </p>
      </CardHeader>

      <CardContent
        className={`
          space-y-5 px-4
          sm:space-y-6 sm:px-6
        `}
      >
        <form
          className={`
            space-y-5
            sm:space-y-6
          `}
          onSubmit={handleSubmit}
        >
          <FormInput
            autoComplete="name"
            error={errors.name?.message}
            icon={User}
            inputMode="text"
            isValid={isNameValid}
            label="Nombre Completo"
            placeholder="Ej: María González López"
            required
            {...register("name")}
          />

          <FormInput
            autoComplete="tel"
            error={errors.phone?.message}
            icon={Phone}
            inputMode="tel"
            isValid={isPhoneValid}
            label="Teléfono"
            maxLength={10}
            placeholder="Ej: 5512345678"
            required
            type="tel"
            {...register("phone")}
          />
        </form>
      </CardContent>
    </Card>
  );
}
