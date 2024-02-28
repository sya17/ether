"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef, Table } from "@tanstack/react-table";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { getUser } from "@/lib/redux/slices/userSlice";
import { User } from "@/interfaces/user";
import { SelectAll, SelectCell } from "@/components/common/table/select-table";
import {
  ColumnCell,
  ColumnHeader,
} from "@/components/common/table/column-table";
import Loading from "@/app/loading";
import { PAGINATION } from "@/constant/common-constant";
import { ActionCell } from "@/components/common/table/action-cell-table";
import ButtonAdd from "@/components/common/table/button-add";
import ButtonDelete from "@/components/common/table/Button-delete";
import FilterTable from "@/components/common/table/filters-table";
import InquiryTable from "@/components/common/table/inquiry-table";
import SearchTable from "@/components/common/table/search-table";
import DetailUserPage from "./detail-user-page";
// import { SetTable } from "@/lib/table-util";
import SetTable from "@/lib/table-util";

const idTable = "user-table";
const detailPageComponent = "detail_user_page";

// page
export default function UserPage() {
  const dispatch = useDispatch();
  const [dataDetail, setDataDetail] = useState<User | undefined>();
  const [currentPage, setCurrentPage] = useState(0);
  const [dataTable, setDataTable] = useState<Table<User>>();
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  // fatch
  const data: User[] = useSelector((state) => state.apiUser.response?.data);
  const error = useSelector((state) => state.apiUser.response?.error);
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
    console.log("key", key);
    console.log("search", search);

    dispatch(
      getUser({
        page: currentPage,
        size: PAGINATION.limit,
        sorting: { desc: "createdDate" },
      })
    );
  };

  //search detail function
  const doDetail = (val: User) => {
    setOpenDetail(true);
    setDataDetail(val);
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

  // column definition
  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => <SelectAll table={table} />,
      cell: ({ row }) => <SelectCell row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <ColumnHeader columns={column} name="Name" sorting={false} />
      ),
      cell: ({ row }) => <ColumnCell row={row} name="name" />,
    },
    {
      accessorKey: "username",
      header: ({ column }) => (
        <ColumnHeader columns={column} name="Username" sorting={false} />
      ),
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
          doDetail={doDetail}
          doDeleted={() => {}}
        />
      ),
    },
  ];

  const reactTable = SetTable({
    id: idTable,
    data: data,
    columns: columns,
  });

  useEffect(() => {
    dispatch(getUser({ page: currentPage, size: PAGINATION.limit }));
    setDataTable(reactTable);
    setOpenDetail(false);
    setDataDetail(undefined);
  }, [currentPage, dispatch, reactTable]);

  if (!dataTable || loading || error) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      {/* Header Render */}
      <div>
        <div className="flex items-center py-4">
          <SearchTable dataTable={dataTable} doSearch={doSearch} />
          <div className=" w-full flex justify-end ml-auto float-right space-x-2 px-2">
            <ButtonAdd doDetail={doDetail} />
            <ButtonDelete />
            {/* <ButtonUploadExcel /> */}
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
      {/* detail page */}
      <DetailUserPage
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        dataDetail={dataDetail!}
      />
    </div>
  );
}
