import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { generateOrderNumber } from "./order-utils";
import type { CustomerData } from "./checkout-utils";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Order interface for Firestore
export interface OrderData {
  orderNumber: string;
  customer: CustomerData;
  items: any[];
  timestamp: string;
  total: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
}

/**
 * Creates a new order in Firestore
 * @param customerData Customer information
 * @param items Cart items
 * @param total Order total
 * @returns Promise with order number
 */
export const createOrder = async (
  customerData: CustomerData,
  items: any[],
  total: number,
): Promise<string> => {
  const orderNumber = generateOrderNumber();

  const orderData: OrderData = {
    orderNumber,
    customer: customerData,
    items,
    timestamp: new Date().toISOString(),
    total,
    status: "pending",
  };

  try {
    await setDoc(doc(db, "orders", orderNumber), orderData);
    return orderNumber;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
};
