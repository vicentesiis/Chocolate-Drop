/**
 * Order Service
 *
 * This service handles all Firebase operations related to orders.
 * It provides a clean API for order management operations.
 */

import { doc, getDoc, setDoc } from "firebase/firestore";

import type { Order } from "../types/order";

import { db } from "../firebase";
import { generateOrderNumber } from "../order-utils";

/**
 * Creates a new order in Firestore
 * @param customerInfo Customer information
 * @param items Cart items
 * @param totalPrice Order total
 * @returns Promise with order number
 */
export const createOrder = async (
  customerInfo: { name: string; phone: string },
  items: any[],
  totalPrice: number,
): Promise<string> => {
  const orderNumber = generateOrderNumber();
  const now = new Date();

  const orderData: Order = {
    createdAt: now,
    customerInfo,
    id: orderNumber,
    items,
    status: "pending",
    totalPrice,
    updatedAt: now,
  };

  try {
    // Convert dates to ISO strings for Firestore storage
    await setDoc(doc(db, "orders", orderNumber), {
      ...orderData,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });
    return orderNumber;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
};

/**
 * Searches for an order by order number
 * @param orderNumber The order number to search for
 * @returns Promise with order data or null if not found
 */
export const searchOrder = async (
  orderNumber: string,
): Promise<null | Order> => {
  try {
    const orderDoc = await getDoc(doc(db, "orders", orderNumber.toUpperCase()));

    if (orderDoc.exists()) {
      const data = orderDoc.data();
      // Convert ISO strings back to Date objects
      return {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      } as Order;
    }

    return null;
  } catch (error) {
    console.error("Error searching order:", error);
    throw new Error("Failed to search order");
  }
};

/**
 * Updates an existing order status
 * @param orderNumber The order number to update
 * @param status New status
 * @returns Promise<void>
 */

export const updateOrderStatus = async (
  orderNumber: string,
  status: Order["status"],
): Promise<void> => {
  try {
    const orderRef = doc(db, "orders", orderNumber.toUpperCase());
    const now = new Date();

    await setDoc(
      orderRef,
      {
        status,
        updatedAt: now.toISOString(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
};
