import { useMemo } from "react";
import type { TableColumn } from "@/lib/utils/table-columns";

/**
 * Generic hook factory for creating table columns
 */
export function useTableColumns<T>(
  columnDefinitions: TableColumn<T>[],
  dependencies: any[] = [],
) {
  return useMemo(() => columnDefinitions, dependencies);
}

/**
 * Hook factory for creating columns with dynamic configuration
 */
export function createColumnHook<T, TProps = {}>(
  columnFactory: (props: TProps) => TableColumn<T>[],
) {
  return function useColumns(props: TProps, dependencies: any[] = []) {
    return useMemo(() => columnFactory(props), dependencies);
  };
}
