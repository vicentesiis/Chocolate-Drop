import type { ReactNode } from "react";

export interface TableColumn<T = any> {
  header: string;
  key: string;
  render: (item: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface ColumnConfig<T = any> {
  columns: TableColumn<T>[];
  dependencies?: any[];
}

/**
 * Generic column builder utility
 */
export function createColumn<T>(
  key: string,
  header: string,
  render: (item: T) => ReactNode,
  options?: {
    sortable?: boolean;
    width?: string;
  },
): TableColumn<T> {
  return {
    key,
    header,
    render,
    sortable: options?.sortable,
    width: options?.width,
  };
}

/**
 * Column configuration factory
 */
export function createColumnConfig<T>(
  columns: TableColumn<T>[],
  dependencies: any[] = [],
): ColumnConfig<T> {
  return {
    columns,
    dependencies,
  };
}
