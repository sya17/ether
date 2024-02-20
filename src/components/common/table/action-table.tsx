import { Button } from "@/components/ui/button";
import * as dialog from "@/components/ui/dialog";
import * as dropdown from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { mainComponents } from "@/constant/component-constant";
import { DetailComponentProps } from "@/interfaces/detail-component";
import { cn } from "@/lib/utils";
import { Row, Table } from "@tanstack/react-table";
import { Filter, Plus, Settings2, Trash } from "lucide-react";
import { useState } from "react";

export const ActionTable = async <T extends object>({
  dataTable,
  detail,
  doDeleted,
}: {
  dataTable: Table<T>;
  detail: DetailComponentProps;
  doDeleted: (selected: T[]) => void;
}) => {
  const [listFilter, setListFilter] = useState<string>();
  const ComponentDetail = mainComponents[detail.page];

  const doAddFilter = (column: string) => {
    setListFilter(column);
  };

  const doRemoveFilter = (column: string) => {
    setListFilter(undefined);
  };

  const isChekedFilter = (column: string) => {
    return listFilter == column;
  };

  const deleted = () => {
    doDeleted(dataTable.getSelectedRowModel().rows.map((e) => e.original));
  };

  return (
    <div className="flex items-center py-4 space-x-2">
      <div className="flex flex-col w-full space-y-1">
        <div className="inline-flex">
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
          <Input placeholder="search" className="max-w-sm" />
        </div>
      </div>
      <div className=" w-full flex justify-end ml-auto float-right space-x-2">
        <dialog.Dialog>
          <dialog.DialogTrigger asChild>
            <Button className="inline-flex space-x-2 items-center bg-primary text-primary-foreground group relative">
              <Plus className="w-4 h-4 transition-all duration-300 opacity-100 group-hover:mr-14" />
              <span className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100">
                Add
              </span>
            </Button>
          </dialog.DialogTrigger>
          <dialog.DialogContent
            className="sm:max-w-1/2 flex flex-col space-y-4"
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
          >
            <dialog.DialogHeader>
              <dialog.DialogTitle>{detail.title}</dialog.DialogTitle>
              <dialog.DialogDescription>
                {detail.description}
              </dialog.DialogDescription>
            </dialog.DialogHeader>
            {/* Detail Page */}
            <ComponentDetail />
          </dialog.DialogContent>
        </dialog.Dialog>

        <Button
          onClick={deleted}
          className="inline-flex space-x-2 items-center bg-primary text-primary-foreground group relative"
        >
          <Trash className="w-4 h-4 transition-all duration-300 opacity-100 group-hover:mr-16" />
          <span className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100">
            Delete
          </span>
        </Button>
      </div>
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
    </div>
  );
};
