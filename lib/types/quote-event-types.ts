// Type definitions for quote event functionality

export interface EventDetails {
  city: string;
  date: string; // ISO yyyy-mm-dd
  guests: null | number;
  time: string; // HH:mm
  type: string; // EVENT_TYPES.id
}

export interface ContactDetails {
  email: string;
  name: string;
  notes: string;
  phone: string;
  promo: string; // optional % or code – we handle number only for demo
}
