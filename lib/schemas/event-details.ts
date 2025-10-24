import { z } from "zod";

export const eventDetailsSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener 10 dígitos")
    .max(10, "El teléfono debe tener 10 dígitos")
    .regex(/^\d+$/, "El teléfono solo debe contener números"),
  city: z.string().min(1, "Selecciona una ciudad"),
  date: z.string().min(1, "Selecciona una fecha"),
  type: z.string().min(1, "Selecciona un tipo de evento"),
  time: z.string().optional(),
  guests: z.number().nullable().optional(),
});

export type EventDetailsFormData = z.infer<typeof eventDetailsSchema>;
