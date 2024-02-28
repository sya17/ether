import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { mainComponents } from "@/constant/component-constant";
import { DetailComponentProps } from "@/interfaces/detail-component";

export const ActionCell = <T extends object>({
  row,
  detail,
  doDetail,
  doDeleted,
}: {
  idTable: string;
  detail: DetailComponentProps;
  row: Row<T>;
  // doDetail: React.Dispatch<React.SetStateAction<{ open: boolean; data?: any }>>;
  doDetail: (val: T) => void;
  doDeleted: (selected: T) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Action</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="w-full inline-flex items-center space-x-2 cursor-pointer"
          onClick={() => doDetail(row.original)}
        >
          <div className="inline-flex space-x-2">
            <Pencil className="w-4 h-4" />
            <span>Edit</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="w-full inline-flex items-center space-x-2 cursor-pointer"
          onClick={() => doDeleted(row.original)}
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
