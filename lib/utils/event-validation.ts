/**
 * Event validation utilities for data integrity
 */

import type { Event } from "@/lib/types/event";

import {
  CITIES,
  EVENT_TYPES,
  MIN_BRIGADEIROS,
  MIN_PASTELITOS,
} from "@/lib/constants/quote-event-constants";

/**
 * Validates customer information for events
 */
export const validateEventCustomer = (
  customer: Event["customer"],
): string[] => {
  const errors: string[] = [];

  if (!customer.name?.trim()) {
    errors.push("Customer name is required");
  } else if (customer.name.trim().length < 2) {
    errors.push("Customer name must be at least 2 characters");
  }

  if (!customer.phone?.trim()) {
    errors.push("Customer phone is required");
  } else if (!/^\d{10}$/.test(customer.phone)) {
    errors.push("Phone number must be exactly 10 digits");
  }

  return errors;
};

/**
 * Validates event details
 */
export const validateEventDetails = (details: Event["details"]): string[] => {
  const errors: string[] = [];

  if (!details.city?.trim()) {
    errors.push("City is required");
  } else if (!CITIES.includes(details.city)) {
    errors.push("Invalid city selected");
  }

  if (!details.type?.trim()) {
    errors.push("Event type is required");
  } else if (!EVENT_TYPES.some((type) => type.id === details.type)) {
    errors.push("Invalid event type selected");
  }

  return errors;
};

/**
 * Validates event products
 */
export const validateEventProducts = (
  products: Event["products"],
): string[] => {
  const errors: string[] = [];

  // Validate quantities
  if (products.qtyPastelitos < 0) {
    errors.push("Pastelitos quantity cannot be negative");
  }

  if (products.qtyBrigadeiros < 0) {
    errors.push("Brigadeiros quantity cannot be negative");
  }

  // Check minimum quantities if items are selected
  if (products.qtyPastelitos > 0 && products.qtyPastelitos < MIN_PASTELITOS) {
    errors.push(`Minimum ${MIN_PASTELITOS} pastelitos required`);
  }

  if (
    products.qtyBrigadeiros > 0 &&
    products.qtyBrigadeiros < MIN_BRIGADEIROS
  ) {
    errors.push(`Minimum ${MIN_BRIGADEIROS} brigadeiros required`);
  }

  // At least one product must be selected
  const totalPieces = products.qtyPastelitos + products.qtyBrigadeiros;
  if (totalPieces === 0) {
    errors.push("At least one product must be selected");
  }

  return errors;
};

/**
 * Validates event totals
 */
export const validateEventTotals = (totals: Event["totals"]): string[] => {
  const errors: string[] = [];

  // If totals are provided, validate they are positive numbers
  if (totals.subtotalProducts !== undefined) {
    if (
      typeof totals.subtotalProducts !== "number" ||
      totals.subtotalProducts < 0
    ) {
      errors.push("Invalid subtotal for products");
    }
  }

  if (totals.subtotalExtras !== undefined) {
    if (
      typeof totals.subtotalExtras !== "number" ||
      totals.subtotalExtras < 0
    ) {
      errors.push("Invalid subtotal for extras");
    }
  }

  if (totals.total !== undefined) {
    if (typeof totals.total !== "number" || totals.total <= 0) {
      errors.push("Invalid total amount");
    }

    // Validate total matches subtotals if both are provided
    const subtotalProducts = totals.subtotalProducts || 0;
    const subtotalExtras = totals.subtotalExtras || 0;
    const expectedTotal = subtotalProducts + subtotalExtras;

    if (expectedTotal > 0 && Math.abs(totals.total - expectedTotal) > 0.01) {
      errors.push("Total doesn't match sum of subtotals");
    }
  }

  return errors;
};

/**
 * Validates complete event data
 */
export const validateEventData = (event: Event): string[] => {
  return [
    ...validateEventCustomer(event.customer),
    ...validateEventDetails(event.details),
    ...validateEventProducts(event.products),
    ...validateEventTotals(event.totals),
  ];
};

/**
 * Validates if event is ready for submission
 */
export const validateEventForSubmission = (event: Event): string[] => {
  const errors = validateEventData(event);

  // Additional checks for submission
  if (!event.details.date) {
    errors.push("Event date is required for submission");
  }

  if (!event.totals.total || event.totals.total <= 0) {
    errors.push("Valid total amount is required for submission");
  }

  return errors;
};
