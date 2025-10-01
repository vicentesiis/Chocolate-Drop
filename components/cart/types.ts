export interface CartItemProps {
  item: {
    boxType: {
      name: string;
    };
    totalPrice: number;
    selectedDesserts: Array<{
      id: string;
      quantity: number;
    }>;
  };
  index: number;
  onRemove: (index: number) => void;
}

export interface CartDessertItemProps {
  dessertId: string;
  quantity: number;
}
