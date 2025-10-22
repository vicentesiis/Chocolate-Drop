interface CustomerCellProps {
  name: string;
  phone: string;
}

export function CustomerCell({ name, phone }: CustomerCellProps) {
  return (
    <div>
      <div className="font-medium">{name}</div>
      <div className="text-sm text-muted-foreground">{phone}</div>
    </div>
  );
}
