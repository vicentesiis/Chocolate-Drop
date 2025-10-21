import type { CartItem } from "@/lib/types/cart";
import type { CustomerInfo } from "@/lib/types/customer";

export interface Order {
  createdAt: Date;
  customerInfo: CustomerInfo;
  id?: string;
  items: CartItem[];
  notes?: string;
  status:
    | "cancelled"
    | "confirmed"
    | "delivered"
    | "pending"
    | "preparing"
    | "ready";
  totalPrice: number;
  updatedAt: Date;
}
