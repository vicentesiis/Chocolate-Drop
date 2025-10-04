import type { BOXES, DESSERTS } from "@/lib/data/products";

// Base types from data
export type Box = (typeof BOXES)[0];
export type Dessert = (typeof DESSERTS)[0];

// Brigadeiro interface - can be used for both data and component props
export interface Brigadeiro {
  id: string;
  name: string;
  quantity: number;
}
