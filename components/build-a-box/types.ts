import type { BOXES } from "./data";

export interface SelectedDessert {
  id: string;
  name: string;
  quantity: number;
}

export interface CartItem {
  boxType: (typeof BOXES)[0];
  selectedDesserts: SelectedDessert[];
  totalPrice: number;
}
