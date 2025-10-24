import { z } from "zod";
import type { Event } from "@/lib/types/quote-event-types";

export const eventDetailsSchema = z.object({
  city: z.string().min(1, "Selecciona una ciudad"),
  date: z
    .string()
    .min(1, "Selecciona una fecha")
    .transform((str) => new Date(str)),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener 10 dígitos")
    .max(10, "El teléfono debe tener 10 dígitos")
    .regex(/^\d+$/, "El teléfono solo debe contener números"),
  type: z.string().min(1, "Selecciona un tipo de evento"),
});

export const eventSchema = z.object({
  // Event details
  city: z.string().min(1, "Selecciona una ciudad"),
  date: z.date(),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener 10 dígitos")
    .max(10, "El teléfono debe tener 10 dígitos")
    .regex(/^\d+$/, "El teléfono solo debe contener números"),
  type: z.string().min(1, "Selecciona un tipo de evento"),

  // Product quantities
  qtyPastelitos: z.number().min(0),
  qtyBrigadeiros: z.number().min(0),

  // Extras
  withCart: z.boolean(),

  // Optional calculated fields
  subtotalProducts: z.number().optional(),
  subtotalExtras: z.number().optional(),
  subtotal: z.number().optional(),
  total: z.number().optional(),
  deposit: z.number().optional(),
  balance: z.number().optional(),
});

export type EventDetailsFormData = z.infer<typeof eventDetailsSchema>;
export type EventFormData = z.infer<typeof eventSchema>;

// Helper function to create a new Event with default values
export const createDefaultEvent = (): Event => ({
  city: "Monterrey",
  date: new Date(),
  name: "",
  phone: "",
  type: "social",
  qtyPastelitos: 0,
  qtyBrigadeiros: 0,
  withCart: false,
});

// Helper function to validate and prepare Event for Firestore
export const prepareEventForFirestore = (event: Event) => {
  return eventSchema.parse(event);
};
