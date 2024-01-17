"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useDispatch } from "@/lib/redux/store";
import { Company } from "@/interfaces/company";
import { Table } from "../../common/table/table";
import { ColumnCell, ColumnHeader } from "../../common/table/column-table";
import { SelectAll, SelectCell } from "../../common/table/select-table";
import { apiCall } from "@/lib/redux/actions/apiActions";
import { ActionCell } from "@/components/common/table/action-cell-table";
import { ActionTable } from "@/components/common/table/action-table";

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
    header: ({ column }) => <ColumnHeader columns={column} name="Name" />,
    cell: ({ row }) => <ColumnCell row={row} name="name" />,
  },
  {
    accessorKey: "publicKey",
    header: ({ column }) => <ColumnHeader columns={column} name="Public Key" />,
    cell: ({ row }) => <ColumnCell row={row} name="publicKey" />,
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
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = (page: number) => {
      dispatch(
        apiCall({
          endpoint: "Company",
          method: "GET",
          queryParams: { page, size: 10, desc: "createdDate" },
        })
      );
    };

    fetchData(currentPage); // first function

    // Cleanup effect
    return () => {
      // un-mount
    };
  }, [currentPage, dispatch]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toPage = (page: number) => {
    setCurrentPage(page - 1);
  };

  return (
    <Table
      id="company-table"
      detailPage={{
        title: "Company",
        description: "",
        page: "detail_company_page",
      }}
      columns={columns}
      nextPage={handleNextPage}
      prevPage={handlePrevPage}
      toPage={toPage}
    />
  );
}
