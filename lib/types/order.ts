import type { CartItem } from "@/lib/types/cart";
import type { CustomerInfo } from "@/lib/types/customer";

export interface Order {
  id?: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  totalPrice: number;
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}
