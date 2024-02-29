import { Button } from "@/components/ui/button";
import * as dropdown from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Settings2 } from "lucide-react";

export default function FilterTable({
  dataTable,
}: {
  dataTable: Table<any> | null | undefined;
}) {
  return (
    <dropdown.DropdownMenu>
      <dropdown.DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto flex space-x-2 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 hover:text-background/90"
        >
          <Settings2 className=" h-4 w-4" />
          <span>Views</span>
        </Button>
      </dropdown.DropdownMenuTrigger>
      <dropdown.DropdownMenuContent align="end">
        {dataTable &&
          dataTable
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <dropdown.DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize cursor-pointer"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value: any) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </dropdown.DropdownMenuCheckboxItem>
              );
            })}
      </dropdown.DropdownMenuContent>
    </dropdown.DropdownMenu>
  );
}
