import { useDispatch, useSelector } from "@/lib/redux/store";
import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@/interfaces/customer";
import { SelectAll, SelectCell } from "@/components/common/table/select-table";
import {
  ColumnCell,
  ColumnHeader,
} from "@/components/common/table/column-table";
import { ActionCell } from "@/components/common/table/action-cell-table";
import {
  deleteCustomer,
  getCustomer,
  patchCustomer,
  postCustomer,
} from "@/lib/redux/slices/customerSlice";
import { MainTable } from "@/components/common/table/main-table";
export default function CustomerPage(params: {}) {
  let idTable = "customer-table";
  let detailPageComponent = "detail_company_page";
  const dispatch = useDispatch();

  const data = useSelector((state) => state.apiCustomer.response?.data);
  const loading = useSelector((state) => state.apiCompany.loading);

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
    dispatch(getCustomer({ page: currentPage, size: 10 }));
    // Cleanup effect
    return () => {
      // un-mount
    };
  }, [dispatch, currentPage]);

  // action data
  async function doSave(values: Customer) {
    await dispatch(postCustomer(values));
    await dispatch(getCustomer({ page: currentPage, size: 10 }));
  }
  async function doUpdate(values: Customer) {
    const { id } = values;
    await dispatch(patchCustomer({ id, values }));
    await dispatch(getCustomer({ page: currentPage, size: 10 }));
  }
  const doDeleteSelected = async (selected: Customer[]) => {
    await selected.map((e) => {
      dispatch(deleteCustomer(e.id));
    });
    await dispatch(getCustomer({ page: currentPage, size: 10 }));
  };
  const doDeleteOne = async (e: Customer) => {
    dispatch(deleteCustomer(e.id));
    await dispatch(getCustomer({ page: currentPage, size: 10 }));
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
  const columns: ColumnDef<Customer>[] = [
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
          idTable={"customer-page"}
          detail={{
            title: "Company",
            description: "",
            page: "detail-customer-page",
          }}
          doDetail={() => {}}
          doDeleted={() => {}}
        />
      ),
    },
  ];

  return (
    <MainTable
      id={idTable}
      detailPage={{
        title: "Customer",
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
