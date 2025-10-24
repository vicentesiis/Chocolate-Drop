import type { Event } from "@/lib/types/quote-event-types";

import { z } from "zod";

// Schema for form input (date as string)
export const eventDetailsFormSchema = z.object({
  city: z.string().min(1, "Selecciona una ciudad"),
  date: z.string().min(1, "Selecciona una fecha"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener 10 dígitos")
    .max(10, "El teléfono debe tener 10 dígitos")
    .regex(/^\d+$/, "El teléfono solo debe contener números"),
  type: z.string().min(1, "Selecciona un tipo de evento"),
});

// Schema for processed data (date as Date object)
export const eventDetailsSchema = z.object({
  city: z.string().min(1, "Selecciona una ciudad"),
  date: z.date(),
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
  deposit: z.number().optional(),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener 10 dígitos")
    .max(10, "El teléfono debe tener 10 dígitos")
    .regex(/^\d+$/, "El teléfono solo debe contener números"),

  qtyBrigadeiros: z.number().min(0),
  // Product quantities
  qtyPastelitos: z.number().min(0),

  subtotal: z.number().optional(),

  subtotalExtras: z.number().optional(),
  // Optional calculated fields
  subtotalProducts: z.number().optional(),
  total: z.number().optional(),
  type: z.string().min(1, "Selecciona un tipo de evento"),
  // Extras
  withCart: z.boolean(),
});

export type EventDetailsFormData = z.infer<typeof eventDetailsFormSchema>;
export type EventDetailsData = z.infer<typeof eventDetailsSchema>;
export type EventFormData = z.infer<typeof eventSchema>;

// Helper function to create a new Event with default values
export const createDefaultEvent = (): Event => ({
  city: "Monterrey",
  date: new Date(), // This will be overridden in the form with empty string
  name: "",
  phone: "",
  qtyBrigadeiros: 0,
  qtyPastelitos: 0,
  type: "social",
  withCart: false,
});

// Helper function to transform form data to processed data
export const transformEventDetailsFormData = (
  formData: EventDetailsFormData,
): EventDetailsData => {
  return {
    ...formData,
    date: new Date(formData.date),
  };
};

// Helper function to validate and prepare Event for Firestore
export const prepareEventForFirestore = (event: Event) => {
  return eventSchema.parse(event);
};
