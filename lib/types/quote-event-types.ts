// Type definitions for quote event functionality

export interface EventDetails {
  city: string;
  date: Date;
  name: string;
  phone: string;
  type: string;
}

export interface Event {
  // Event details
  city: string;
  date: Date;
  name: string;
  phone: string;
  type: string;

  // Product quantities
  qtyPastelitos: number;
  qtyBrigadeiros: number;

  // Extras
  withCart: boolean;

  // Calculated fields (optional for storage, can be computed)
  subtotalProducts?: number;
  subtotalExtras?: number;
  subtotal?: number;
  total?: number;
  deposit?: number;
  balance?: number;
}
