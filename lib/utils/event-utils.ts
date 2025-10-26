/**
 * Event utility functions
 */

import type { Event } from "@/lib/types/event";

import {
  CART_RENTAL_PRICE,
  MIN_BRIGADEIROS,
  MIN_PASTELITOS,
  UNIT_PRICE_BRIGADEIROS,
  UNIT_PRICE_PASTELITOS,
} from "@/lib/constants/quote-event-constants";

export const generateEventNumber = (): string => {
  return `${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
};

/**
 * Calculates event totals based on products
 */
export const calculateEventTotals = (
  products: Event["products"],
): Event["totals"] => {
  const subtotalProducts =
    products.qtyPastelitos * UNIT_PRICE_PASTELITOS +
    products.qtyBrigadeiros * UNIT_PRICE_BRIGADEIROS;

  const subtotalExtras = products.withCart ? CART_RENTAL_PRICE : 0;
  const total = subtotalProducts + subtotalExtras;

  return {
    subtotalExtras,
    subtotalProducts,
    total,
  };
};

/**
 * Calculates total pieces for an event
 */
export const calculateTotalPieces = (products: Event["products"]): number => {
  return products.qtyPastelitos + products.qtyBrigadeiros;
};

/**
 * Formats event date for display
 */
export const formatEventDate = (date: Date | undefined): string => {
  if (!date) return "Fecha no especificada";

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  }).format(date);
};

/**
 * Formats currency for display
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-MX", {
    currency: "MXN",
    style: "currency",
  }).format(amount);
};

/**
 * Gets event type label from ID
 */
export const getEventTypeLabel = (typeId: string): string => {
  const eventTypes = {
    baby: "Baby Shower",
    boda: "Boda",
    corporativo: "Corporativo",
    cumpleaños: "Cumpleaños",
    social: "Social",
  };

  return eventTypes[typeId as keyof typeof eventTypes] || typeId;
};

/**
 * Checks if event products meet minimum requirements
 */
export const meetsMinimumRequirements = (
  products: Event["products"],
): boolean => {
  const validPastelitos =
    products.qtyPastelitos === 0 || products.qtyPastelitos >= MIN_PASTELITOS;
  const validBrigadeiros =
    products.qtyBrigadeiros === 0 || products.qtyBrigadeiros >= MIN_BRIGADEIROS;
  const hasProducts = calculateTotalPieces(products) > 0;

  return validPastelitos && validBrigadeiros && hasProducts;
};

/**
 * Creates a summary string for the event
 */
export const createEventSummary = (event: Event): string => {
  const pieces = calculateTotalPieces(event.products);
  const typeLabel = getEventTypeLabel(event.details.type);
  const dateStr = formatEventDate(event.details.date);
  const totalStr = event.totals.total
    ? formatCurrency(event.totals.total)
    : "Sin total";

  return `${typeLabel} en ${event.details.city} - ${pieces} piezas - ${dateStr} - ${totalStr}`;
};
