/**
 * Order Service
 *
 * This service handles all Firebase operations related to orders.
 * It extends the base Firestore service for common operations and adds order-specific functionality.
 */

import type { CartItem } from "@/lib/types/cart";
import type { Customer } from "@/lib/types/customer";

import { orderBy } from "firebase/firestore";

import type { Order } from "../types/order";
import { OrderStatus } from "../constants/order-constants";
import { generateOrderNumber } from "../utils/order-utils";
import { validateOrderData, validateOrderStatus } from "../utils/validation";
import { BaseFirestoreService } from "./base-firestore-service";

/**
 * Order service class extending base Firestore service
 */
class OrderService extends BaseFirestoreService<Order> {
  constructor() {
    super("orders");
  }

  /**
   * Creates a new order with generated order number
   */
  async createOrder(
    customer: Customer,
    items: CartItem[],
    total: number,
  ): Promise<string> {
    // Validate order data
    const validationErrors = validateOrderData(customer, items, total);
    if (validationErrors.length > 0) {
      throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
    }

    const orderNumber = generateOrderNumber();

    const orderData: Omit<Order, "createdAt" | "id" | "updatedAt"> = {
      customer,
      items,
      orderNumber,
      status: OrderStatus.pending,
      total,
    };

    // Use orderNumber as document ID for easy lookup
    await this.create(orderData, orderNumber);
    return orderNumber;
  }

  /**
   * Gets all orders sorted by creation date (newest first)
   */
  async getAllOrdersSorted(): Promise<Order[]> {
    return this.getAll([orderBy("createdAt", "desc")]);
  }

  /**
   * Gets orders by customer phone
   */
  async getOrdersByCustomerPhone(phone: string): Promise<Order[]> {
    return this.findBy("customer.phone", phone);
  }

  /**
   * Gets orders by status
   */
  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    return this.findBy("status", status);
  }

  /**
   * Gets order statistics
   */
  async getOrderStats(): Promise<{
    cancelled: number;
    confirmed: number;
    delivered: number;
    pending: number;
    preparing: number;
    ready: number;
    total: number;
  }> {
    const orders = await this.getAll();

    return {
      cancelled: orders.filter((o) => o.status === "cancelled").length,
      confirmed: orders.filter((o) => o.status === "confirmed").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      pending: orders.filter((o) => o.status === "pending").length,
      preparing: orders.filter((o) => o.status === "preparing").length,
      ready: orders.filter((o) => o.status === "ready").length,
      total: orders.length,
    };
  }

  /**
   * Gets recent orders with limit
   */
  async getRecentOrders(limitCount = 10): Promise<Order[]> {
    return this.getPaginated(limitCount, [orderBy("createdAt", "desc")]);
  }

  /**
   * Searches for an order by order number
   */
  async searchByOrderNumber(orderNumber: string): Promise<null | Order> {
    return this.getById(orderNumber.toUpperCase());
  }

  /**
   * Updates order status with validation
   */
  async updateOrderStatus(
    orderNumber: string,
    status: OrderStatus,
  ): Promise<void> {
    if (!validateOrderStatus(status)) {
      throw new Error(`Invalid order status: ${status}`);
    }
    await this.update(orderNumber, { status });
  }
}

// Export singleton instance
export const orderService = new OrderService();

// Export individual methods for backward compatibility
export const createOrder = orderService.createOrder.bind(orderService);
export const searchOrder = orderService.searchByOrderNumber.bind(orderService);
export const getAllOrders = orderService.getAllOrdersSorted.bind(orderService);
export const updateOrderStatus =
  orderService.updateOrderStatus.bind(orderService);
