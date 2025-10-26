import type { BaseEntity } from "@/lib/services/base-firestore-service";
import type { Customer } from "@/lib/types/customer";

import type { EventStatus } from "../constants/event-constants";

export interface EventDetails {
  city: string;
  date?: Date;
  type: string;
}

export interface EventProducts {
  qtyBrigadeiros: number;
  qtyPastelitos: number;
  withCart: boolean;
}

export interface EventTotals {
  subtotalExtras?: number;
  subtotalProducts?: number;
  total?: number;
}

export interface Event extends BaseEntity {
  customer: Customer;
  details: EventDetails;
  products: EventProducts;
  status: EventStatus;
  totals: EventTotals;
}
