/**
 * Order Service
 *
 * This service handles all Firebase operations related to orders.
 * It provides a clean API for order management operations.
 */

import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

import type { Order } from "../types/order";

import { db } from "../firebase";
import { generateOrderNumber } from "../utils/order-utils";

/**
 * Creates a new order in Firestore
 * @param customerInfo Customer information
 * @param items Cart items
 * @param totalPrice Order total
 * @returns Promise with order number
 */
export const createOrder = async (
  customer: { name: string; phone: string },
  items: any[],
  total: number,
): Promise<string> => {
  const orderNumber = generateOrderNumber();
  const now = new Date();

  const orderData: Order = {
    createdAt: now,
    customer,
    id: orderNumber,
    items,
    orderNumber,
    status: "pending",
    timestamp: now.toISOString(),
    total,
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
 * Gets all orders from Firestore
 * @returns Promise with array of orders
 */
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const ordersCollection = collection(db, "orders");
    const querySnapshot = await getDocs(ordersCollection);

    if (querySnapshot.empty) {
      return [];
    }

    const orders: Order[] = [];
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();

      const order = {
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
        id: data.id || docSnapshot.id,
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      } as Order;

      orders.push(order);
    }

    // Sort by createdAt descending (newest first)
    orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return orders;
  } catch (error) {
    console.error("Error getting orders:", error);
    throw new Error("Failed to get orders");
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
    // Use the orderNumber as the document ID (your Firestore documents use orderNumber as the key)
    const orderRef = doc(db, "orders", orderNumber);
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
