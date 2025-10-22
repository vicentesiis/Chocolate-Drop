# Reusable Table Components

This folder contains reusable table components for the ChocolateDrop application.

## Components

### DataTable
A generic, reusable table component that handles search, refresh, and empty states.

```tsx
import { DataTable } from "@/components/shared/table";

const columns = [
  {
    key: 'name',
    header: 'Name',
    render: (item) => <span>{item.name}</span>,
  },
  // ... more columns
];

<DataTable
  data={items}
  columns={columns}
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  searchPlaceholder="Search items..."
  onRefresh={loadItems}
  loading={loading}
  emptyMessage="No items found"
  getRowKey={(item) => item.id}
/>
```

### Table Cells
Pre-built cell components for common data types:

- `OrderNumberCell` - Displays order numbers with # prefix
- `CustomerCell` - Shows customer name and phone
- `ProductsCell` - Lists products with quantities
- `PriceCell` - Formatted price display
- `StatusCell` - Status badge with optional dropdown
- `DateCell` - Formatted date display

### TableSkeleton
Loading skeleton for tables:

```tsx
import { TableSkeleton } from "@/components/shared/table";

<TableSkeleton columns={6} rows={5} />
```