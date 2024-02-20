import * as dropdown from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { Filter } from "lucide-react";
import { useState } from "react";

export default function SearchTable({
  dataTable,
  doSearch,
}: {
  dataTable: Table<any>;
  doSearch: (key: string, search: string) => void;
}) {
  const [listFilter, setListFilter] = useState<string>();

  const doAddFilter = (column: string) => {
    setListFilter(column);
  };
  const doRemoveFilter = (column: string) => {
    setListFilter(undefined);
  };
  const isChekedFilter = (column: string) => {
    return listFilter == column;
  };

  return (
    <div className="inline-flex w-full">
      <dropdown.DropdownMenu>
        <dropdown.DropdownMenuTrigger asChild>
          <button
            // variant="outline"
            className={cn(
              "flex justify-center items-center cursor-pointer  px-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-background/90",
              listFilter ? "rounded-l-md" : "rounded-md mr-2"
            )}
          >
            <Filter className="h-4 w-4" />
          </button>
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
                    checked={isChekedFilter(column.id)}
                    onCheckedChange={(value: any) => {
                      if (value) {
                        doAddFilter(column.id);
                      } else {
                        doRemoveFilter(column.id);
                      }
                    }}
                  >
                    <span>{column.id}</span>
                  </dropdown.DropdownMenuCheckboxItem>
                );
              })}
        </dropdown.DropdownMenuContent>
      </dropdown.DropdownMenu>
      <div className="flex items-center justify-center mr-2">
        {listFilter ? (
          <span className="w-full h-full justify-center items-center text-center rounded-r-md px-2 py-1 bg-primary text-primary-foreground">
            {listFilter}
          </span>
        ) : (
          <></>
        )}
      </div>
      <Input
        placeholder="search"
        className="max-w-sm"
        onChange={(e) => doSearch(listFilter!, e.target.value)}
      />
    </div>
  );
}
