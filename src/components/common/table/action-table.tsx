"use client";

import { Button } from "@/components/ui/button";
import * as dialog from "@/components/ui/dialog";
import * as dropdown from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableProps } from "@/interfaces/table";
import {
  addColumnTable,
  addFilter,
  removeFilter,
} from "@/lib/redux/slices/tableSlice";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { setTable } from "@/lib/table-util";
import { Table } from "@tanstack/react-table";
import { Filter, Plus, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";

export const ActionTable = async <T extends object>({
  dataTable,
}: {
  dataTable: Table<T>;
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

  return (
    <div className="flex items-center py-4 space-x-2">
      <div className="flex flex-col w-full space-y-1">
        <div className="inline-flex space-x-2">
          <dropdown.DropdownMenu>
            <dropdown.DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex cursor-pointer px-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-background/90"
              >
                <Filter className="h-4 w-4" />
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
          <div className="flex items-center ">
            {listFilter ? <span>{listFilter}</span> : <></>}
          </div>
          <Input placeholder="search" className="max-w-sm" />
        </div>
      </div>
      <div className=" w-full flex justify-end ml-auto float-right ">
        <dialog.Dialog>
          <dialog.DialogTrigger asChild>
            <Button className="inline-flex space-x-2 items-center bg-primary text-primary-foreground hover:bg-primary/90 hover:text-background/90">
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </Button>
          </dialog.DialogTrigger>
          <dialog.DialogContent className="sm:max-w-[425px]">
            <dialog.DialogHeader>
              <dialog.DialogTitle>Edit profile</dialog.DialogTitle>
              <dialog.DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </dialog.DialogDescription>
            </dialog.DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
            <dialog.DialogFooter>
              <Button type="submit">Save changes</Button>
            </dialog.DialogFooter>
          </dialog.DialogContent>
        </dialog.Dialog>
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
