import type { BaseEntity } from "@/lib/services/base-firestore-service";
import type { CartItem } from "@/lib/types/cart";
import type { Customer } from "@/lib/types/customer";

import type { OrderStatus } from "../constants/order-constants";

export interface Order extends BaseEntity {
  customer: Customer;
  items: CartItem[];
  orderNumber: string;
  status: OrderStatus;
  total: number;
}
