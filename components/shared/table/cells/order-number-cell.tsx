interface OrderNumberCellProps {
  orderNumber?: string;
  id?: string;
}

export function OrderNumberCell({ orderNumber, id }: OrderNumberCellProps) {
  return <div className="font-medium">#{orderNumber || id}</div>;
}
