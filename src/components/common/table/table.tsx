"use client";

import { ColumnDef, flexRender } from "@tanstack/react-table";
import * as table from "../../ui/table";
import * as page from "../../ui/pagination";
import { setTable } from "@/lib/table-util";
import { useSelector } from "@/lib/redux/store";
import Loading from "@/app/loading";
import { useToast } from "@/components/ui/use-toast";
import { ActionTable } from "./action-table";

export const Table = <T extends object>({
  id,
  columns,
}: {
  id: string;
  columns: ColumnDef<T>[];
}) => {
  const apiData = useSelector((state) => state.api.response?.data);
  const pageNo = useSelector((state) => state.api.response?.pageNo);
  const pageRecords = useSelector((state) => state.api.response?.pageRecords);
  const ttlPages = useSelector((state) => state.api.response?.ttlPages);
  const ttlRecords = useSelector((state) => state.api.response?.ttlRecords);
  const { toast } = useToast();
  const loading = useSelector((state) => state.api.loading);

  const totalPage: number[] = [];

  for (let i = 1; i <= ttlPages!; i++) {
    totalPage.push(i);
  }

  const totalPages = Math.ceil(totalPage!.length / pageRecords!);
  const startPage = Math.max(1, pageNo! - 1);
  const endPage = Math.min(startPage + pageRecords! - 1, totalPages);

  // console.log("apiData ", apiData);

  const dataTable = setTable({
    id: id,
    data: apiData,
    columns: columns,
  });

  return !apiData || loading ? (
    <Loading />
  ) : (
    <div className="w-full h-full flex flex-1 flex-col space-y-2">
      <ActionTable dataTable={dataTable} />
      <div className="rounded-md border w-full h-full overflow-y-auto">
        <table.Table className="h-full overflow-hidden">
          <table.TableHeader className="sticky bg-background">
            {dataTable &&
              dataTable.getHeaderGroups().map((headerGroup) => (
                <table.TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <table.TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </table.TableHead>
                    );
                  })}
                </table.TableRow>
              ))}
          </table.TableHeader>
          <table.TableBody className="h-24 overflow-y-auto bg-background">
            {dataTable &&
            dataTable.getRowModel() &&
            dataTable.getRowModel().rows ? (
              dataTable.getRowModel().rows.map((row) => (
                <table.TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-10 "
                >
                  {row.getVisibleCells().map((cell) => (
                    <table.TableCell key={cell.id} className="py-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </table.TableCell>
                  ))}
                </table.TableRow>
              ))
            ) : (
              <table.TableRow>
                <table.TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </table.TableCell>
              </table.TableRow>
            )}
          </table.TableBody>
          <table.TableFooter className="sticky bg-background">
            <table.TableCell colSpan={5}>
              <page.Pagination className="justify-end">
                <page.PaginationContent>
                  <page.PaginationItem>
                    <page.PaginationPrevious href="#" />
                  </page.PaginationItem>
                  {Array.from({ length: 3 }).map((_, index) => {
                    const pageNum = startPage + index;
                    return (
                      <page.PaginationItem key={index}>
                        <page.PaginationLink
                          // href="#"
                          // onClick={() => handlePageChange(pageNum)}
                          className="cursor-pointer"
                          isActive={pageNum === pageNo! + 1}
                        >
                          {pageNum}
                        </page.PaginationLink>
                      </page.PaginationItem>
                    );
                  })}
                  <page.PaginationItem>
                    <page.PaginationEllipsis />
                  </page.PaginationItem>
                  <page.PaginationItem>
                    <page.PaginationNext href="#" />
                  </page.PaginationItem>
                </page.PaginationContent>
              </page.Pagination>
            </table.TableCell>
          </table.TableFooter>
        </table.Table>
      </div>
    </div>
  );
};
