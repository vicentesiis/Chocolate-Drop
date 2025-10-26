/**
 * Base Firestore Service
 *
 * Generic service class that provides common CRUD operations for Firestore collections.
 * Handles date serialization, error handling, and provides a consistent API.
 */

import {
  collection,
  deleteDoc,
  doc,
  type DocumentData,
  type FieldValue,
  getDoc,
  getDocs,
  limit,
  query,
  type QueryConstraint,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase";

// Base interface for all entities with timestamps
export interface BaseEntity {
  createdAt: Date;
  id?: string;
  updatedAt: Date;
}

// Firestore document type (with server timestamps)
export interface FirestoreDocument
  extends Omit<BaseEntity, "createdAt" | "updatedAt"> {
  createdAt: FieldValue | string;
  updatedAt: FieldValue | string;
}

/**
 * Generic Firestore service class
 */
export class BaseFirestoreService<T extends BaseEntity> {
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  /**
   * Deserializes Firestore document to entity
   */
  protected deserializeFromFirestore(id: string, data: DocumentData): T {
    return {
      ...data,
      createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
      id,
      updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
    } as T;
  }

  /**
   * Serializes entity for Firestore storage
   */
  protected serializeForFirestore(
    entity: Omit<T, "createdAt" | "id" | "updatedAt">,
  ): Omit<FirestoreDocument, "id"> {
    const cleanEntity = this.removeUndefinedValues(entity);

    return {
      ...cleanEntity,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  }

  /**
   * Recursively removes undefined values from an object
   */
  private removeUndefinedValues(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.removeUndefinedValues(item));
    }

    // Handle Date objects specially - they should be preserved as-is
    if (obj instanceof Date) {
      return obj;
    }

    if (typeof obj === "object") {
      const cleaned: any = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined) {
          cleaned[key] = this.removeUndefinedValues(value);
        }
      }
      return cleaned;
    }

    return obj;
  }

  /**
   * Creates a new document
   */
  async create(
    data: Omit<T, "createdAt" | "id" | "updatedAt">,
    customId?: string,
  ): Promise<string> {
    try {
      const docId = customId || doc(collection(db, this.collectionName)).id;
      const serializedData = this.serializeForFirestore(data);

      await setDoc(doc(db, this.collectionName, docId), serializedData);
      return docId;
    } catch (error) {
      console.error(`Error creating ${this.collectionName} document:`, error);
      throw new Error(`Failed to create ${this.collectionName}`);
    }
  }

  /**
   * Deletes a document
   */
  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting ${this.collectionName} document:`, error);
      throw new Error(`Failed to delete ${this.collectionName}`);
    }
  }

  /**
   * Finds documents by field value
   */
  async findBy(field: string, value: any): Promise<T[]> {
    return this.getAll([where(field, "==", value)]);
  }

  /**
   * Gets all documents with optional query constraints
   */
  async getAll(constraints: QueryConstraint[] = []): Promise<T[]> {
    try {
      const collectionRef = collection(db, this.collectionName);
      const q =
        constraints.length > 0
          ? query(collectionRef, ...constraints)
          : collectionRef;
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) =>
        this.deserializeFromFirestore(doc.id, doc.data()),
      );
    } catch (error) {
      console.error(`Error getting ${this.collectionName} documents:`, error);
      throw new Error(`Failed to get ${this.collectionName} documents`);
    }
  }

  /**
   * Gets a document by ID
   */
  async getById(id: string): Promise<null | T> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return this.deserializeFromFirestore(docSnap.id, docSnap.data());
      }

      return null;
    } catch (error) {
      console.error(`Error getting ${this.collectionName} document:`, error);
      throw new Error(`Failed to get ${this.collectionName}`);
    }
  }

  /**
   * Gets documents with pagination
   */
  async getPaginated(
    limitCount: number,
    constraints: QueryConstraint[] = [],
  ): Promise<T[]> {
    return this.getAll([...constraints, limit(limitCount)]);
  }

  /**
   * Updates a document
   */
  async update(
    id: string,
    data: Partial<Omit<T, "createdAt" | "id" | "updatedAt">>,
  ): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error(`Error updating ${this.collectionName} document:`, error);
      throw new Error(`Failed to update ${this.collectionName}`);
    }
  }
}
