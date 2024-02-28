import * as dropdown from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { Filter, X } from "lucide-react";
import React, { useState } from "react";

const SearchTable = ({
  dataTable,
  doSearch,
}: {
  dataTable: Table<any>;
  doSearch: (key: string, search: string) => void;
}) => {
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
  const doClearFilter = () => {
    setListFilter(undefined);
  };

  return (
    <div className="inline-flex items-center w-full h-full">
      <dropdown.DropdownMenu>
        <dropdown.DropdownMenuTrigger asChild>
          <button
            // variant="outline"
            className={cn(
              "py-2 flex justify-center items-center cursor-pointer  px-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-background/90",
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
      <div className="flex items-center justify-center mr-2 py-0">
        {listFilter ? (
          <div className="flex w-full h-full justify-center items-center space-x-2 text-center rounded-r-md px-2 py-1 bg-primary text-primary-foreground">
            <span>{listFilter}</span>
            <X className="w-5 h-5 cursor-pointer" onClick={doClearFilter} />
          </div>
        ) : (
          <></>
        )}
      </div>
      {listFilter ? (
        <Input
          placeholder="search"
          className="max-w-sm py-3"
          onChange={(e) => doSearch(listFilter!, e.target.value)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default SearchTable;
