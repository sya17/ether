"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef, Table, flexRender } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import * as table from "@/components/ui/table";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { deleteUser, getUser } from "@/lib/redux/slices/userSlice";
import { User } from "@/interfaces/user";
import { SelectAll, SelectCell } from "@/components/common/table/select-table";
import {
  ColumnCell,
  ColumnHeader,
} from "@/components/common/table/column-table";
import Loading from "@/app/loading";
import { setTable } from "@/lib/table-util";
import { PAGINATION } from "@/constant/common-constant";
import PagingTable from "@/components/common/table/paging-table";
import { Plus, Settings2, Trash } from "lucide-react";
import { ActionCell } from "@/components/common/table/action-cell-table";
import ButtonAdd from "@/components/common/table/button-add";
import ButtonDelete from "@/components/common/table/Button-delete";
import FilterTable from "@/components/common/table/filters-table";
import InquiryTable from "@/components/common/table/inquiry-table";
import SearchTable from "@/components/common/table/search-table";

const idTable = "user-table";
const detailPageComponent = "detail_user_page";

// column definition
export const columns: ColumnDef<User>[] = [
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
    accessorKey: "username",
    header: ({ column }) => <ColumnHeader columns={column} name="Username" />,
    cell: ({ row }) => <ColumnCell row={row} name="username" />,
  },
  {
    id: "actions",
    header: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionCell
        row={row}
        idTable={idTable}
        detail={{
          title: "Company",
          description: "",
          page: detailPageComponent,
        }}
        doUpdate={() => {}}
        doDeleted={() => {}}
      />
    ),
  },
];

// page
export default function UserPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [dataTable, setDataTable] = useState<Table<User>>();

  // fatch
  const data = useSelector((state) => state.apiUser.response?.data);
  const loading = useSelector((state) => state.apiUser.loading);
  // paging
  const pageNo = useSelector((state) => state.apiUser.response?.pageNo);
  const pageRecords = useSelector(
    (state) => state.apiUser.response?.pageRecords
  );
  const ttlPages = useSelector((state) => state.apiUser.response?.ttlPages);
  const ttlRecords = useSelector((state) => state.apiUser.response?.ttlRecords);

  //search function
  const doSearch = (key: string, search: string) => {
    dispatch(getUser({ page: currentPage, size: PAGINATION.limit }));
  };

  // action page
  const handleNextPage = () => {
    if (currentPage < ttlPages! - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const toPage = (page: number) => {
    setCurrentPage(page - 1);
  };

  const reactTable = setTable({
    id: idTable,
    data: data,
    columns: columns,
  });

  useEffect(() => {
    dispatch(getUser({ page: currentPage, size: PAGINATION.limit }));
    setDataTable(reactTable);
  }, [currentPage, dispatch]);

  if (!dataTable || loading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      {/* Header Render */}
      <div className="flex items-center py-4">
        <SearchTable dataTable={dataTable} doSearch={doSearch} />
        <div className=" w-full flex justify-end ml-auto float-right space-x-2 px-2">
          <ButtonAdd
            addPage={detailPageComponent}
            title="User"
            desc="Menu User"
          />
          <ButtonDelete />
        </div>
        <FilterTable dataTable={dataTable} />
      </div>

      {/* Table Render */}
      <InquiryTable
        columns={columns}
        dataTable={dataTable}
        nextPage={handleNextPage}
        prevPage={handlePrevPage}
        toPage={toPage}
        page={{
          pageNo: pageNo!,
          pageRecords: pageRecords!,
          ttlPages: ttlPages!,
          ttlRecords: ttlRecords!,
        }}
      />
    </div>
  );
}
