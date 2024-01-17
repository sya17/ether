import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Row } from "@tanstack/react-table";

export interface ActionCell<T extends object> {
  row: Row<T>;
}

export const ActionCell = <T extends object>({ row }: ActionCell<T>) => {
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
        {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.id)}
              className="w-full inline-flex items-center space-x-2 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Code</span>
            </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full inline-flex items-center space-x-2 cursor-pointer">
          <Pencil className="w-4 h-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full inline-flex items-center space-x-2 cursor-pointer">
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
