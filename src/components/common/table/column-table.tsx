import { ArrowUpDown } from "lucide-react";
import { Button } from "../../ui/button";
import { Column, ColumnDef, Row } from "@tanstack/react-table";

interface ColumnHeader<T extends object> {
  name: string;
  columns: Column<T>;
}

interface ColumnCell<T extends object> {
  name: string;
  row: Row<T>;
}

export const ColumnHeader = <T extends object>({
  columns,
  name,
}: ColumnHeader<T>) => {
  return (
    <Button
      variant="ghost"
      onClick={() => columns.toggleSorting(columns.getIsSorted() === "asc")}
    >
      {name}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const ColumnCell = <T extends object>({ row, name }: ColumnCell<T>) => {
  return <div className="capitalize">{row.getValue(name)}</div>;
};
