import { ColumnDef, SortingState } from "@tanstack/react-table";

export interface TableProps<T extends object> {
  id: string;
  data: T[];
  columns: ColumnDef<T>[];
}
