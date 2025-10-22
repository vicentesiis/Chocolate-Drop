interface ProductItem {
  boxType: {
    name: string;
  };
  brigadeiros: unknown[];
}

interface ProductsCellProps {
  items: ProductItem[];
}

export function ProductsCell({ items }: ProductsCellProps) {
  return (
    <div className="space-y-1">
      {items.map((item, index) => (
        <div className="text-sm" key={index}>
          {item.boxType.name} - {item.brigadeiros.length} brigadeiros
        </div>
      ))}
    </div>
  );
}
