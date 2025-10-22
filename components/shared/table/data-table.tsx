"use client";

import type { ReactNode } from "react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

interface Column<T> {
  header: string;
  key: string;
  render: (item: T) => ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  getRowKey: (item: T) => string;
  loading?: boolean;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  searchTerm?: string;
}

export function DataTable<T>({
  columns,
  data,
  emptyMessage = "No hay datos disponibles",
  getRowKey,
  loading = false,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  searchTerm = "",
}: DataTableProps<T>) {
  return (
    <div className="space-y-4">
      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        {onSearchChange && (
          <div className="relative max-w-md flex-1">
            <Search
              className={`
                absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform
                text-muted-foreground
              `}
            />
            <Input
              className="pl-10"
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              value={searchTerm}
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  style={{
                    width: column.width,
                    textAlign: column.align,
                  }}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  className="py-8 text-center text-muted-foreground"
                  colSpan={columns.length}
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={getRowKey(item)}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      style={{
                        width: column.width,
                        textAlign: column.align,
                      }}
                    >
                      {column.render(item)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
