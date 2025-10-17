import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre completo es necesario")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre solo puede contener letras y espacios",
    )
    .transform((val) => val.trim()),

  phone: z
    .string()
    .min(1, "El teléfono es necesario")
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .regex(/^[\+]?[\d\s\-\(\)]+$/, "Formato de teléfono inválido")
    .transform((val) => val.trim()),
});

export type CustomerData = z.infer<typeof customerSchema>;
