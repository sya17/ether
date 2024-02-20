import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import * as dialog from "@/components/ui/dialog";
import { Row } from "@tanstack/react-table";
import { mainComponents } from "@/constant/component-constant";
import { DetailComponentProps } from "@/interfaces/detail-component";

export const ActionCell = <T extends object>({
  row,
  detail,
  doUpdate,
  doDeleted,
}: {
  idTable: string;
  detail: DetailComponentProps;
  row: Row<T>;
  doUpdate: (Values: T) => void;
  doDeleted: (selected: T) => void;
}) => {
  const ComponentDetail = mainComponents[detail.page];

  const updated = () => {
    doUpdate(row.original);
  };
  const deleted = () => {
    doDeleted(row.original);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className="cursor-pointer" />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full inline-flex items-center space-x-2 cursor-pointer">
          <dialog.Dialog>
            <dialog.DialogTrigger asChild>
              <div className="inline-flex space-x-2">
                <Pencil className="w-4 h-4" />
                <span>Edit</span>
              </div>
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
        </DropdownMenuItem>
        <DropdownMenuItem
          className="w-full inline-flex items-center space-x-2 cursor-pointer"
          onClick={deleted}
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
