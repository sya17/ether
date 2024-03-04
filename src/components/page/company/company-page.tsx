"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef, Table } from "@tanstack/react-table";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { Company } from "@/interfaces/company";
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
import SetTable from "@/lib/table-util";
import {
  clearGetAll,
  deleteCompany,
  deleteCompanyList,
  getCompany,
  selectDelete,
  selectGetAll,
} from "@/lib/redux/slices/companySliceNew";
import { FilterRequest } from "@/interfaces/request-interface";
import { DeleteState, GetAllState } from "@/interfaces/api";
import { errorToast, successToast } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import DetailCompanyPage from "./detail-company-page";

const idTable = "user-table";
const detailPageComponent = "detail_user_page";

// page
const CompanyPage: React.FC = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [key, setKey] = useState<number>();
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataTable, setDataTable] = useState<Table<Company>>();
  // const [search, setSearch] = useState<{ key: string; value: any }>();
  const [search, setSearch] = useState<FilterRequest[] | undefined>(undefined);

  // fatch
  const response: GetAllState<Company> = useSelector(selectGetAll)!;
  const responseDelete: DeleteState<Company> = useSelector(selectDelete)!;

  //search function
  const doSearch = (key: string | undefined, value: string | undefined) => {
    // setSearch({ key: key!, value: value });
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

  //do detail function
  const doDetail = (val: Company | undefined) => {
    console.log("doDetail");
    openCloseDetail(true);
    setKey(val?.id);
  };

  //action open close detail
  const openCloseDetail = (val: boolean) => {
    console.log("openCloseDetail");
    setKey(undefined);
    setOpenDetail(val);
  };

  // do Delete By Id
  const doDelete = (val: Company | undefined) => {
    if (val) {
      dispatch(deleteCompany(val.id!));
      fetchCompany();
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

  // column definition
  const columns: ColumnDef<Company>[] = getColumnsCompany({
    doDetail: doDetail,
    doDelete: doDelete,
  });

  const reactTable = SetTable({
    id: idTable,
    data: response.dataList ?? [],
    columns: columns,
  });

  // do Delete Selected
  const doDeleteSelected = () => {
    const userList: Company[] = reactTable
      .getSelectedRowModel()
      .rows.map((e) => e.original);
    dispatch(deleteCompanyList(userList));
    fetchCompany();
  };

  const fetchCompany = () => {
    dispatch(
      getCompany({
        page: currentPage,
        size: PAGINATION.limit,
        desc: ["updatedDate"],
        filter: search,
      })
    );
  };

  useEffect(() => setDataTable(reactTable), [response.dataList]);

  useEffect(() => fetchCompany(), [search, currentPage]);

  // useEffect(() => setKey(key), [key]);

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
            <ButtonAdd openCloseDetail={openCloseDetail} />
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
      <DetailCompanyPage
        openDetail={openDetail}
        openCloseDetail={openCloseDetail}
        dataKey={{ id: key }}
      />
    </div>
  );
};
export default CompanyPage;

export const getColumnsCompany = ({
  doDetail,
  doDelete,
}: {
  doDetail: (val: Company | undefined) => void;
  doDelete: (val: Company | undefined) => void;
}): ColumnDef<Company>[] => {
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
        <ColumnHeader columns={column} name="Companyname" sorting={false} />
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
          doDeleted={doDelete}
        />
      ),
    },
  ];
};
