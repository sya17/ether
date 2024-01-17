"use client";

import { ColumnDef, flexRender } from "@tanstack/react-table";
import * as table from "../../ui/table";
import * as page from "../../ui/pagination";
import { setTable } from "@/lib/table-util";
import { useSelector } from "@/lib/redux/store";
import Loading from "@/app/loading";
import { useToast } from "@/components/ui/use-toast";
import { ActionTable } from "./action-table";
import { DetailComponentProps } from "@/interfaces/detail-component";
import { ReactNode } from "react";
import PagingTable from "./paging-table";

export const Table = <T extends object>({
  id,
  columns,
  nextPage,
  prevPage,
  detailPage,
  toPage,
}: {
  id: string;
  columns: ColumnDef<T>[];
  nextPage: () => void;
  prevPage: () => void;
  toPage: (page: number) => void;
  detailPage: DetailComponentProps;
}) => {
  const apiData = useSelector((state) => state.api.response?.data);
  const { toast } = useToast();
  const loading = useSelector((state) => state.api.loading);

  const dataTable = setTable({
    id: id,
    data: apiData,
    columns: columns,
  });

  return !apiData || loading ? (
    <Loading />
  ) : (
    <div className="w-full h-full flex flex-1 flex-col space-y-2">
      <ActionTable dataTable={dataTable} detail={detailPage} />
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
              <PagingTable
                toPage={toPage}
                prevPage={prevPage}
                nextPage={nextPage}
              />
            </table.TableCell>
          </table.TableFooter>
        </table.Table>
      </div>
    </div>
  );
};
