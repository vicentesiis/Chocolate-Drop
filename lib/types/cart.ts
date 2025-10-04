import type { Box, Brigadeiro } from "./brigadeiro";

// Cart item interface - represents a box with selected brigadeiros
export interface CartItem {
  boxType: Box;
  brigadeiros: Brigadeiro[];
  totalPrice: number;
}

// Props for cart item component
export interface CartItemProps {
  item: CartItem;
  index: number;
  onRemove: (index: number) => void;
}
