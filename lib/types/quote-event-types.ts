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
  deposit?: number;
  name: string;
  phone: string;

  qtyBrigadeiros: number;
  // Product quantities
  qtyPastelitos: number;

  subtotal?: number;

  subtotalExtras?: number;
  // Calculated fields (optional for storage, can be computed)
  subtotalProducts?: number;
  total?: number;
  type: string;
  // Extras
  withCart: boolean;
}
