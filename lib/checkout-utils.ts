export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(price);
};

export interface CustomerData {
  name: string;
  phone: string;
}

export interface ValidationErrors {
  name: string;
  phone: string;
}

export const validateCustomerData = (data: CustomerData): ValidationErrors => {
  const errors: ValidationErrors = {
    name: "",
    phone: "",
  };

  if (!data.name.trim()) {
    errors.name = "El nombre completo es necesario";
  }

  if (!data.phone.trim()) {
    errors.phone = "El teléfono es necesario";
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
