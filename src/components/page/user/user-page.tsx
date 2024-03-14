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
import {
  CONNECTOR,
  OPERATORS,
  PAGINATION,
  TOAST_MSG,
} from "@/constant/common-constant";
import { ActionCell } from "@/components/common/table/action-cell-table";
import ButtonAdd from "@/components/common/table/button-add";
import ButtonDelete from "@/components/common/table/Button-delete";
import FilterTable from "@/components/common/table/filters-table";
import InquiryTable from "@/components/common/table/inquiry-table";
import SearchTable from "@/components/common/table/search-table";
import DetailUserPage from "./detail-user-page";
import SetTable from "@/lib/table-util";
import {
  clearGetAll,
  deleteUser,
  deleteUserList,
  getUser,
  getUserByKey,
  selectDelete,
  selectGetAll,
} from "@/lib/redux/slices/userSliceNew";
import { FilterRequest } from "@/interfaces/request-interface";
import { DeleteState, GetAllState } from "@/interfaces/api";
import { errorToast, successToast } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const idTable = "user-table";
const detailPageComponent = "detail_user_page";

// page
const UserPage: React.FC = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(0);
  const [dataTable, setDataTable] = useState<Table<User>>();
  const [search, setSearch] = useState<FilterRequest[] | undefined>(undefined);
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  // fatch
  const response: GetAllState<User> = useSelector(selectGetAll)!;
  const responseDelete: DeleteState<User> = useSelector(selectDelete)!;

  //search function
  const doSearch = (key: string | undefined, value: string | undefined) => {
    if (key && value) {
      setSearch([
        {
          connector: CONNECTOR.AND,
          operator: OPERATORS.LIKE,
          keySearch: key,
          value: value,
        },
      ]);
    } else {
      setSearch(undefined);
    }
  };

  // detail action
  const openDetailEdit = (val: User) => {
    console.log("OPEN DETAIL EDIT");
    if (val) {
      dispatch(getUserByKey(val.id!));
    }
    setIsOpenDetail(true);
  };
  const openDetail = () => {
    console.log("OPEN DETAIL ADD");
    setIsOpenDetail(true);
  };
  const closedDetail = () => {
    setIsOpenDetail(true);
  };

  // do Delete By Id
  const doDelete = (val: User | undefined) => {
    if (val) {
      dispatch(deleteUser(val.id!));
      fetchUser();
    }
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

  // do Delete Selected
  const doDeleteSelected = () => {
    const userList: User[] = reactTable
      .getSelectedRowModel()
      .rows.map((e) => e.original);
    dispatch(deleteUserList(userList));
    fetchUser();
  };

  const fetchUser = () => {
    dispatch(
      getUser({
        page: currentPage,
        size: PAGINATION.limit,
        desc: ["updatedDate"],
        filter: search,
      })
    );
  };

  // column definition
  const columns: ColumnDef<User>[] = getColumnsUser({
    doDetail: openDetailEdit,
    doDelete: doDelete,
  });

  const reactTable = SetTable({
    id: idTable,
    data: response.dataList ?? [],
    columns: columns,
  });

  useEffect(() => setDataTable(reactTable), [response.dataList]);

  useEffect(() => fetchUser(), [search, currentPage]);

  useEffect(() => {
    if (responseDelete.success) {
      successToast({
        toast: toast,
        description: TOAST_MSG.DELETE_SUCCESS_MSG,
      });
      dispatch(clearGetAll());
    }
  }, [responseDelete.success]);

  useEffect(() => {
    if (responseDelete.error)
      errorToast({
        toast: toast,
        description: responseDelete.error ?? TOAST_MSG.ERR_MSG,
      });
  }, [responseDelete.error]);

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
            <ButtonAdd openDetail={openDetail} />
            <ButtonDelete doDeleteSelected={doDeleteSelected} />
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
      {isOpenDetail ? (
        <DetailUserPage openDetail={isOpenDetail} closeDetail={closedDetail} />
      ) : (
        <></>
      )}
    </div>
  );
};
export default UserPage;

export const getColumnsUser = ({
  doDetail,
  doDelete,
}: {
  doDetail: (val: User) => void;
  doDelete: (val: User | undefined) => void;
}): ColumnDef<User>[] => {
  return [
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
          doDetail={() => doDetail(row.original)}
          doDeleted={doDelete}
        />
      ),
    },
  ];
};
