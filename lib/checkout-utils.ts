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

  // Name validation
  if (!data.name.trim()) {
    errors.name = "El nombre completo es necesario";
  } else if (data.name.trim().length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  } else if (data.name.trim().length > 50) {
    errors.name = "El nombre no puede exceder 50 caracteres";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(data.name.trim())) {
    errors.name = "El nombre solo puede contener letras y espacios";
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.phone = "El teléfono es necesario";
  } else if (data.phone.trim().length < 10) {
    errors.phone = "El teléfono debe tener al menos 10 dígitos";
  } else if (!/^[\+]?[\d\s\-\(\)]+$/.test(data.phone.trim())) {
    errors.phone = "Formato de teléfono inválido";
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
