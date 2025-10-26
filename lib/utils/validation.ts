/**
 * Validation utilities for data integrity
 */

import { OrderStatus } from "@/lib/constants/order-constants";
import type { CartItem } from "@/lib/types/cart";
import type { Customer } from "@/lib/types/customer";

/**
 * Validates customer information
 */
export const validateCustomer = (customer: Customer): string[] => {
  const errors: string[] = [];

  if (!customer.name?.trim()) {
    errors.push("Customer name is required");
  }

  if (!customer.phone?.trim()) {
    errors.push("Customer phone is required");
  } else if (!/^\+?[\d\s\-\(\)]+$/.test(customer.phone)) {
    errors.push("Invalid phone number format");
  }

  return errors;
};

/**
 * Validates cart items
 */
export const validateCartItems = (items: CartItem[]): string[] => {
  const errors: string[] = [];

  if (!items || items.length === 0) {
    errors.push("At least one item is required");
    return errors;
  }

  items.forEach((item, index) => {
    if (!item.boxType) {
      errors.push(`Item ${index + 1}: Box type is required`);
    }

    if (!item.brigadeiros || item.brigadeiros.length === 0) {
      errors.push(`Item ${index + 1}: At least one brigadeiro is required`);
    }

    if (typeof item.totalPrice !== "number" || item.totalPrice <= 0) {
      errors.push(`Item ${index + 1}: Valid total price is required`);
    }
  });

  return errors;
};

/**
 * Validates order total
 */
export const validateOrderTotal = (
  total: number,
  items: CartItem[],
): string[] => {
  const errors: string[] = [];

  if (typeof total !== "number" || total <= 0) {
    errors.push("Valid order total is required");
    return errors;
  }

  const calculatedTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  // Allow small floating point differences
  if (Math.abs(total - calculatedTotal) > 0.01) {
    errors.push("Order total doesn't match item totals");
  }

  return errors;
};

/**
 * Validates order status
 */
export const validateOrderStatus = (status: string): status is OrderStatus => {
  const validStatuses: OrderStatus[] = [
    OrderStatus.CANCELLED,
    OrderStatus.CONFIRMED,
    OrderStatus.DELIVERED,
    OrderStatus.PENDING,
    OrderStatus.PREPARING,
    OrderStatus.READY,
  ];

  return validStatuses.includes(status as OrderStatus);
};

/**
 * Validates complete order data
 */
export const validateOrderData = (
  customer: Customer,
  items: CartItem[],
  total: number,
): string[] => {
  return [
    ...validateCustomer(customer),
    ...validateCartItems(items),
    ...validateOrderTotal(total, items),
  ];
};
