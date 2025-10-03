import type { CartItem } from "@/components/build-a-box/types";

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
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
