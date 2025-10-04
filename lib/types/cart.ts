import type { Box, Brigadeiro } from "./brigadeiro";

// Selected dessert interface for cart items
export interface CartItem {
  boxType: Box;
  brigadeiros: Brigadeiro[];
  totalPrice: number;
}
