import React from "react";
import { User, Phone } from "lucide-react";
import { FormInput } from "@/components/shared/forms/form-input";
import { useCustomerForm } from "@/hooks/use-customer-form";
import type { CustomerData } from "@/lib/schemas/customer";

interface CustomerFormFieldsProps {
  defaultValues?: Partial<CustomerData>;
  onFormChange?: (data: CustomerData, isValid: boolean) => void;
}

/**
 * Customer form fields component for checkout page
 * Provides name and phone inputs with Zod validation
 */
export function CustomerFormFields({
  defaultValues,
  onFormChange,
}: CustomerFormFieldsProps) {
  const { register, errors, isNameValid, isPhoneValid, watch } =
    useCustomerForm({ defaultValues });

  // Watch form changes and notify parent
  const watchedData = watch();
  const isFormValid = isNameValid && isPhoneValid;

  React.useEffect(() => {
    onFormChange?.(watchedData, isFormValid);
  }, [watchedData, isFormValid, onFormChange]);

  return (
    <>
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
    </>
  );
}
