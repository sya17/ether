import { ColumnDef, Row, Table, flexRender } from "@tanstack/react-table";
import * as table from "../../ui/table";
import Loading from "@/app/loading";
import { ActionTable } from "./action-table";
import { DetailComponentProps } from "@/interfaces/detail-component";
import PagingTable from "./paging-table";
import { setTable } from "@/lib/table-util";

export const MainTable = <T extends object>({
  id,
  data,
  loading,
  columns,
  nextPage,
  prevPage,
  detailPage,
  toPage,
  doUpdate,
  doDeleted,
  page,
}: {
  id: string;
  data: T[];
  loading: boolean;
  columns: ColumnDef<T>[];
  nextPage: () => void;
  prevPage: () => void;
  toPage: (page: number) => void;
  doSave: (Values: T) => void;
  doUpdate: (Values: T) => void;
  doDeleted: (selected: T[]) => void;
  detailPage: DetailComponentProps;
  page: {
    ttlRecords: number;
    ttlPages: number;
    pageNo: number;
    pageRecords: number;
  };
}) => {
  const dataTable = setTable({
    id: id,
    data: data,
    columns: columns,
  });
  if (data) {
  }

  return !data || loading ? (
    <Loading />
  ) : (
    <div className="w-full h-full flex flex-1 flex-col space-y-2">
      <ActionTable
        dataTable={dataTable}
        detail={detailPage}
        doDeleted={doDeleted}
      />
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
    </div>
  );
};
