"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react";
import { useDispatch } from "@/lib/redux/store";
import { Company } from "@/interfaces/company";
import { Table } from "../../common/table/table";
import { ColumnCell, ColumnHeader } from "../../common/table/column-table";
import { SelectAll, SelectCell } from "../../common/table/select-table";
import { apiCall } from "@/lib/redux/actions/apiActions";
import { ActionCell } from "@/components/common/table/action-cell-table";

const columns: ColumnDef<Company>[] = [
  {
    id: "select",
    header: ({ table }) => <SelectAll table={table} />,
    cell: ({ row }) => <SelectCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader columns={column} />,
    cell: ({ row }) => <ColumnCell row={row} name="name" />,
  },
  {
    id: "actions",
    header: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

export default function CompanyPage(params: {}) {
  const dispatch = useDispatch();

  dispatch(
    apiCall({
      endpoint: "Company",
      method: "GET",
      queryParams: { page: 0, size: 10 },
    })
  );

  return <Table id="company-table" columns={columns} />;
}
