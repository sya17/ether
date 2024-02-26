"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { Company } from "@/interfaces/company";
import { ColumnCell, ColumnHeader } from "../../common/table/column-table";
import { SelectAll, SelectCell } from "../../common/table/select-table";
import { ActionCell } from "@/components/common/table/action-cell-table";
import {
  getCompany,
  deleteCompany,
  postCompany,
  patchCompany,
} from "@/lib/redux/slices/companySlice";
import { MainTable } from "@/components/common/table/main-table";

export default function CompanyPage(params: {}) {
  let idTable = "company-table";
  let detailPageComponent = "detail_company_page";
  const dispatch = useDispatch();

  // fatch
  const data = useSelector((state) => state.apiCompany.response?.data);
  const loading = useSelector((state) => state.apiCompany.loading);

  // paging
  const [currentPage, setCurrentPage] = useState(0);
  const pageNo = useSelector((state) => state.apiCompany.response?.pageNo);
  const pageRecords = useSelector(
    (state) => state.apiCompany.response?.pageRecords
  );
  const ttlPages = useSelector((state) => state.apiCompany.response?.ttlPages);
  const ttlRecords = useSelector(
    (state) => state.apiCompany.response?.ttlRecords
  );

  useEffect(() => {
    fetchData(currentPage);
    // Cleanup effect
    return () => {
      // un-mount
    };
  }, [currentPage]);

  // action data
  const fetchData = async (page: number) => {
    await dispatch(getCompany({ page: page, size: 10 }));
  };
  async function doSave(values: Company) {
    await dispatch(postCompany(values));
    await fetchData(0);
  }
  async function doUpdate(values: Company) {
    const { id } = values;
    await dispatch(patchCompany({ id, values }));
    await fetchData(0);
  }
  const doDeleteSelected = async (selected: Company[]) => {
    await selected.map((e) => {
      dispatch(deleteCompany(e.id));
    });
    await fetchData(0);
  };
  const doDeleteOne = async (e: Company) => {
    dispatch(deleteCompany(e.id));
    await fetchData(0);
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

  // Column definition
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
      header: ({ column }) => (
        <ColumnHeader columns={column} name="Name" sorting={false} />
      ),
      cell: ({ row }) => <ColumnCell row={row} name="name" />,
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <ColumnHeader columns={column} name="Code" sorting={false} />
      ),
      cell: ({ row }) => (
        <ColumnCell row={row} name="code" className="w-24 truncate " />
      ),
    },
    {
      accessorKey: "signature",
      header: ({ column }) => (
        <ColumnHeader columns={column} name="Signature" sorting={false} />
      ),
      cell: ({ row }) => (
        <ColumnCell row={row} name="signature" className="w-24 truncate" />
      ),
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
          doDetail={() => doUpdate}
          doDeleted={doDeleteOne}
        />
      ),
    },
  ];

  return (
    <MainTable
      id={idTable}
      detailPage={{
        title: "Company",
        description: "",
        page: detailPageComponent,
      }}
      data={data!}
      columns={columns}
      loading={loading!}
      nextPage={handleNextPage}
      prevPage={handlePrevPage}
      toPage={toPage}
      doSave={doSave}
      doUpdate={doUpdate}
      doDeleted={doDeleteSelected}
      page={{
        pageNo: pageNo!,
        pageRecords: pageRecords!,
        ttlPages: ttlPages!,
        ttlRecords: ttlRecords!,
      }}
    />
  );
}
