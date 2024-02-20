import { ColumnDef, Table, flexRender } from "@tanstack/react-table";
import * as table from "../../ui/table";
import PagingTable from "./paging-table";
export default function InquiryTable({
  dataTable,
  columns,
  nextPage,
  prevPage,
  toPage,
  page,
}: {
  dataTable: Table<any>;
  columns: ColumnDef<any>[];
  nextPage: () => void;
  prevPage: () => void;
  toPage: (page: number) => void;
  page: {
    ttlRecords: number;
    ttlPages: number;
    pageNo: number;
    pageRecords: number;
  };
}) {
  return (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
      </table.Table>
      <div className="bg-background p-2">
        <PagingTable
          toPage={toPage}
          prevPage={prevPage}
          nextPage={nextPage}
          pageNo={page.pageNo}
          pageRecords={page.pageRecords}
          ttlPages={page.ttlPages}
          ttlRecords={page.pageRecords}
        />
      </div>
    </div>
  );
}
