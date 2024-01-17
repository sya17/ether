import { Row, Table } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";

interface SelectAllProps<T extends object> {
  table: Table<T>;
}
interface SelectCellProps<T extends object> {
  row: Row<T>;
}

export const SelectAll = <T extends object>({ table }: SelectAllProps<T>) => {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
};
export const SelectCell = <T extends object>({ row }: SelectCellProps<T>) => {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value: any) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
};
