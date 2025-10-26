/**
 * Event Service
 *
 * This service handles all Firebase operations related to events.
 * It extends the base Firestore service for common operations and adds event-specific functionality.
 *
 * Usage examples:
 *
 * // Create a new event
 * const eventNumber = await createEvent(eventData);
 *
 * // Search for an event
 * const event = await searchEvent("EVT-20241025-1234");
 *
 * // Get all events
 * const events = await getAllEvents();
 *
 * // Get event statistics
 * const stats = await eventService.getEventStats();
 */

import type { Event } from "@/lib/types/event";

import { orderBy } from "firebase/firestore";

import { EventStatus } from "../constants/event-constants";
import { generateEventNumber } from "../utils/event-utils";
import { BaseFirestoreService } from "./base-firestore-service";

/**
 * Event service class extending base Firestore service
 */
class EventService extends BaseFirestoreService<Event> {
  constructor() {
    super("events");
  }

  /**
   * Creates a new event with generated event number
   */
  async createEvent(
    eventData: Omit<Event, "createdAt" | "id" | "status" | "updatedAt">,
  ): Promise<string> {
    // Add default status if not provided
    const eventWithStatus: Omit<Event, "createdAt" | "id" | "updatedAt"> = {
      ...eventData,
      status: EventStatus.LEAD,
    };

    // Generate event number
    const eventNumber = generateEventNumber();

    // Create the event with event number as document ID
    await this.create(eventWithStatus, eventNumber);
    return eventNumber;
  }

  /**
   * Gets all events sorted by creation date (newest first)
   */
  async getAllEventsSorted(): Promise<Event[]> {
    return this.getAll([orderBy("createdAt", "desc")]);
  }

  /**
   * Gets events by city
   */
  async getEventsByCity(city: string): Promise<Event[]> {
    return this.findBy("details.city", city);
  }

  /**
   * Gets events by customer phone
   */
  async getEventsByCustomerPhone(phone: string): Promise<Event[]> {
    return this.findBy("customer.phone", phone);
  }

  /**
   * Gets events by status
   */
  async getEventsByStatus(status: EventStatus): Promise<Event[]> {
    return this.findBy("status", status);
  }

  /**
   * Gets events by type
   */
  async getEventsByType(type: string): Promise<Event[]> {
    return this.findBy("details.type", type);
  }

  /**
   * Gets event statistics
   */
  async getEventStats(): Promise<{
    averageTotal: number;
    byCity: Record<string, number>;
    byStatus: Record<string, number>;
    byType: Record<string, number>;
    total: number;
    totalRevenue: number;
  }> {
    const events = await this.getAll();

    const byCity: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    let totalRevenue = 0;

    for (const event of events) {
      // Count by city
      byCity[event.details.city] = (byCity[event.details.city] || 0) + 1;

      // Count by type
      byType[event.details.type] = (byType[event.details.type] || 0) + 1;

      // Count by status
      byStatus[event.status] = (byStatus[event.status] || 0) + 1;

      // Sum revenue
      if (event.totals.total) {
        totalRevenue += event.totals.total;
      }
    }

    return {
      averageTotal: events.length > 0 ? totalRevenue / events.length : 0,
      byCity,
      byStatus,
      byType,
      total: events.length,
      totalRevenue,
    };
  }

  /**
   * Gets recent events with limit
   */
  async getRecentEvents(limitCount = 10): Promise<Event[]> {
    return this.getPaginated(limitCount, [orderBy("createdAt", "desc")]);
  }

  /**
   * Searches for an event by event number
   */
  async searchByEventNumber(eventNumber: string): Promise<Event | null> {
    return this.getById(eventNumber.toUpperCase());
  }

  /**
   * Updates event details
   */
  async updateEvent(
    eventNumber: string,
    updates: Partial<Omit<Event, "createdAt" | "id" | "updatedAt">>,
  ): Promise<void> {
    const currentEvent = await this.getById(eventNumber);
    if (!currentEvent) {
      throw new Error("Event not found");
    }

    await this.update(eventNumber, updates);
  }

  /**
   * Updates event status
   */
  async updateEventStatus(
    eventNumber: string,
    status: EventStatus,
  ): Promise<void> {
    await this.updateEvent(eventNumber, { status });
  }
}

// Export singleton instance
export const eventService = new EventService();

// Export individual methods for backward compatibility
export const createEvent = eventService.createEvent.bind(eventService);
export const searchEvent = eventService.searchByEventNumber.bind(eventService);
export const getAllEvents = eventService.getAllEventsSorted.bind(eventService);
export const updateEvent = eventService.updateEvent.bind(eventService);
export const updateEventStatus =
  eventService.updateEventStatus.bind(eventService);
export const getEventsByStatus =
  eventService.getEventsByStatus.bind(eventService);
