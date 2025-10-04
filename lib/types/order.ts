import type { CartItem } from "@/components/build-a-box/types";

export interface CustomerInfo {
  name: string;
  phone: string;
}

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
