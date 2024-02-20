import { ArrowUpDown } from "lucide-react";
import { Button } from "../../ui/button";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface ColumnHeader<T extends object> {
  name: string;
  columns: Column<T>;
}

interface ColumnCell<T extends object> {
  name: string;
  row: Row<T>;
  className?: string;
  children?: React.ReactNode;
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

export const ColumnCell = <T extends object>({
  row,
  name,
  className,
  children,
}: ColumnCell<T>) => {
  return (
    <div className={cn("capitalize ", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{row.getValue(name)}</span>
          </TooltipTrigger>
          <TooltipContent align="center">
            <div className="flex flex-col space-y-1">
              <span>{name}</span>
              <p>{row.getValue(name)}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {children ? children : <></>}
    </div>
  );
};
