import type { Event } from "@/lib/types/quote-event-types";

// Example Firestore utility functions for the Event model
// You'll need to install and configure Firebase/Firestore first

/**
 * Prepare Event data for Firestore storage
 * Converts Date objects to Firestore Timestamps and adds metadata
 */
export const prepareEventForFirestore = (event: Event) => {
  return {
    ...event,
    // Convert Date to Firestore Timestamp (you'll need to import Timestamp from firebase/firestore)
    // date: Timestamp.fromDate(event.date),

    // Add calculated fields if not already present
    subtotalProducts: event.subtotalProducts || 0,
    subtotalExtras: event.subtotalExtras || 0,
    subtotal: event.subtotal || 0,
    total: event.total || 0,
    deposit: event.deposit || 0,
    balance: event.balance || 0,

    // Add metadata
    createdAt: new Date(), // Will be converted to Timestamp by Firestore
    updatedAt: new Date(),
  };
};

/**
 * Convert Firestore document data back to Event model
 * Converts Firestore Timestamps back to Date objects
 */
export const parseEventFromFirestore = (firestoreData: any): Event => {
  return {
    ...firestoreData,
    // Convert Firestore Timestamp back to Date
    // date: firestoreData.date?.toDate() || new Date(),
    date:
      firestoreData.date instanceof Date
        ? firestoreData.date
        : new Date(firestoreData.date),
  };
};

/**
 * Example function to save Event to Firestore
 * Uncomment and modify when you have Firestore configured
 */
/*
import { collection, addDoc, getFirestore } from 'firebase/firestore';

export const saveEventToFirestore = async (event: Event) => {
  try {
    const db = getFirestore();
    const eventData = prepareEventForFirestore(event);
    
    const docRef = await addDoc(collection(db, 'events'), eventData);
    console.log('Event saved with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving event: ', error);
    throw error;
  }
};
*/
