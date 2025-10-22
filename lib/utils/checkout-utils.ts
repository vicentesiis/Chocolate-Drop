import { customerSchema } from "../schemas/customer";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(price);
};

// Re-export types from schema for backward compatibility
export type { CustomerData } from "../schemas/customer";

// Legacy interface for backward compatibility
export interface ValidationErrors {
  name: string;
  phone: string;
}

// Legacy validation function - now uses Zod schema
export const validateCustomerData = (data: {
  name: string;
  phone: string;
}): ValidationErrors => {
  const result = customerSchema.safeParse(data);

  const errors: ValidationErrors = {
    name: "",
    phone: "",
  };

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof ValidationErrors;
      if (field in errors) {
        errors[field] = issue.message;
      }
    }
  }

  return errors;
};

export const getMissingFields = (errors: ValidationErrors): string[] => {
  const missingFields: string[] = [];

  if (errors.name) missingFields.push("Nombre completo");
  if (errors.phone) missingFields.push("Teléfono");

  return missingFields;
};

export const getValidationMessage = (missingFields: string[]): string => {
  if (missingFields.length === 0) return "";

  return missingFields.length === 1
    ? `Por favor completa el campo: ${missingFields[0]}`
    : `Por favor completa los campos: ${missingFields.join(", ")}`;
};
