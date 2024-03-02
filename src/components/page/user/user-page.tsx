"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef, Table } from "@tanstack/react-table";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { User } from "@/interfaces/user";
import { SelectAll, SelectCell } from "@/components/common/table/select-table";
import {
  ColumnCell,
  ColumnHeader,
} from "@/components/common/table/column-table";
import Loading from "@/app/loading";
import { CONNECTOR, OPERATORS, PAGINATION } from "@/constant/common-constant";
import { ActionCell } from "@/components/common/table/action-cell-table";
import ButtonAdd from "@/components/common/table/button-add";
import ButtonDelete from "@/components/common/table/Button-delete";
import FilterTable from "@/components/common/table/filters-table";
import InquiryTable from "@/components/common/table/inquiry-table";
import SearchTable from "@/components/common/table/search-table";
import DetailUserPage from "./detail-user-page";
import SetTable from "@/lib/table-util";
import { getUser, selectGetAll } from "@/lib/redux/slices/userSliceNew";
import { FilterRequest } from "@/interfaces/request-interface";
import { GetAllState } from "@/interfaces/api";

const idTable = "user-table";
const detailPageComponent = "detail_user_page";

// page
const UserPage: React.FC = () => {
  const dispatch = useDispatch();
  const [key, setKey] = useState<number>();
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataTable, setDataTable] = useState<Table<User>>();
  const [search, setSearch] = useState<{ key: string; value: any }>();

  // fatch
  const response: GetAllState<User> = useSelector(selectGetAll)!;
  // const loading = useSelector(selectResourceLoading);
  // const dataList: User[] = useSelector(selectResourceDataList);
  // const page = useSelector(selectResourcePage);
  // const error = useSelector(selectResourceError);

  //search function
  const doSearch = (key: string | undefined, value: string | undefined) => {
    setSearch({ key: key!, value: value });
  };

  //do detail function
  const doDetail = (val: User | undefined) => {
    openCloseDetail(true);
    setKey(val?.id);
  };

  //action open close detail
  const openCloseDetail = (val: boolean) => {
    setKey(undefined);
    setOpenDetail(val);
  };

  // action page
  const handleNextPage = () => {
    if (currentPage < response.page.ttlPages! - 1) {
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
    data: response.dataList ?? [],
    columns: columns,
  });

  // useEffect(() => {
  //   dispatch(getUser({ page: currentPage, size: PAGINATION.limit }));
  // }, [currentPage]);

  // useEffect(() => {
  //   if (reactTable) setDataTable(reactTable);
  // }, [reactTable]);

  useEffect(() => setDataTable(reactTable), [response.dataList]);

  useEffect(() => {
    let filters: FilterRequest[] | undefined = undefined;
    if (search?.key! && search?.value) {
      filters = [
        {
          connector: CONNECTOR.AND,
          operator: OPERATORS.LIKE,
          keySearch: search?.key!,
          value: search?.value,
        },
      ];
    }
    dispatch(
      getUser({ page: currentPage, size: PAGINATION.limit, filter: filters })
    );
  }, [search, currentPage]);

  if (!response || response.loading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      {/* Header Render */}
      <div>
        <div className="flex items-center py-4">
          <SearchTable dataTable={dataTable} doSearch={doSearch} />
          <div className=" w-full flex justify-end ml-auto float-right space-x-2 px-2">
            <ButtonAdd openCloseDetail={openCloseDetail} />
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
            pageNo: response.page.pageNo!,
            pageRecords: response.page.pageRecords!,
            ttlPages: response.page.ttlPages!,
            ttlRecords: response.page.ttlRecords!,
          }}
        />
      </div>
      {/* detail page */}
      <DetailUserPage
        openDetail={openDetail}
        openCloseDetail={openCloseDetail}
        dataKey={{ id: key }}
      />
    </div>
  );
};

export default UserPage;
