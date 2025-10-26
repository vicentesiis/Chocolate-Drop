import type { CartItem } from "@/lib/types/cart";
import type { CustomerInfo } from "@/lib/types/customer";
import type { BaseEntity } from "@/lib/services/base-firestore-service";

export type OrderStatus =
  | "cancelled"
  | "confirmed"
  | "delivered"
  | "pending"
  | "preparing"
  | "ready";

export interface Order extends BaseEntity {
  customer: CustomerInfo;
  items: CartItem[];
  notes?: string;
  orderNumber: string;
  status: OrderStatus;
  total: number;
}
