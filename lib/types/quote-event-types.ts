// Type definitions for quote event functionality

export interface EventDetails {
  city: string;
  date: string; // ISO yyyy-mm-dd
  guests: null | number;
  name: string;
  phone: string;
  time: string; // HH:mm
  type: string; // EVENT_TYPES.id
}

export interface ContactDetails {
  email: string;
  name: string;
  phone: string;
}
