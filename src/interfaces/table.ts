import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

export interface TableProps<T extends object> {
  id: string;
  data: T[];
  columns: ColumnDef<T>[];
  // sort: {
  //   sorting: SortingState;
  //   setSorting: OnChangeFn<SortingState>;
  // };
  // filters: {
  //   columnFilters: ColumnFiltersState;
  //   setColumnFilters: OnChangeFn<ColumnFiltersState>;
  // };
  // visibility: {
  //   columnVisibility: VisibilityState;
  //   setColumnVisibility: OnChangeFn<VisibilityState>;
  // };
  // rowSelect: {
  //   rowSelection: RowSelectionState;
  //   setRowSelection: OnChangeFn<RowSelectionState>;
  // };
}
