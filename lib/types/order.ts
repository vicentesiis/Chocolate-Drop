import type { CartItem } from "@/lib/types/cart";
import type { CustomerInfo } from "@/lib/types/customer";

export interface Order {
  createdAt: Date;
  customer: CustomerInfo;
  id?: string;
  items: CartItem[];
  notes?: string;
  orderNumber?: string;
  status:
    | "cancelled"
    | "confirmed"
    | "delivered"
    | "pending"
    | "preparing"
    | "ready";
  total: number;
  updatedAt: Date;
}
