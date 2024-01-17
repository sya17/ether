import { useSelector } from "@/lib/redux/store";
import * as page from "../../ui/pagination";
export default function PagingTable({
  toPage,
  prevPage,
  nextPage,
}: {
  nextPage: () => void;
  prevPage: () => void;
  toPage: (page: number) => void;
}) {
  const pageNo = useSelector((state) => state.api.response?.pageNo);
  const pageRecords = useSelector((state) => state.api.response?.pageRecords);
  const ttlPages = useSelector((state) => state.api.response?.ttlPages);
  const ttlRecords = useSelector((state) => state.api.response?.ttlRecords);

  const renderPaginationLinks = () => {
    const totalPage: number[] = [];

    for (let i = 1; i <= ttlPages!; i++) {
      totalPage.push(i);
    }

    const totalPages = Math.ceil(totalPage!.length / pageRecords!);
    const startPage = Math.max(1, pageNo! - 1);
    const endPage = Math.min(startPage + pageRecords! - 1, totalPages);
    const maxVisiblePages = 3;
    const pages = [];

    if (totalPage.length <= maxVisiblePages) {
      // Render semua tautan jika total halaman kurang dari atau sama dengan 5
      for (let i = 1; i <= totalPage.length; i++) {
        pages.push(renderPaginationLink(i));
      }
    } else {
      // Tentukan halaman saat ini dan halaman sekitarnya yang akan ditampilkan
      const currentPage = pageNo! + 1;
      let start, end;

      // Render tautan dengan elipsis untuk halaman pertama
      pages.push(renderPaginationLink(1, currentPage != 1));

      if (currentPage <= 3) {
        // Render 5 tautan untuk halaman pertama
        start = 2;
        end = Math.min(totalPage.length - 1, start + maxVisiblePages - 2);
      } else if (currentPage >= totalPage.length - 2) {
        // Render 5 tautan untuk halaman terakhir
        end = totalPage.length - 1;
        start = Math.max(2, end - maxVisiblePages + 2);
      } else {
        // Render 5 tautan untuk halaman di tengah-tengah
        start = currentPage - 2;
        end = currentPage + 2;
      }

      // Render tautan untuk halaman di sekitar halaman saat ini
      for (let i = start; i <= end; i++) {
        pages.push(renderPaginationLink(i));
      }

      // Render tautan dengan elipsis untuk halaman terakhir
      pages.push(renderPaginationLink(totalPage.length, true));
    }

    return pages;
  };

  const renderPaginationLink = (pageNum: number, lastPage?: boolean) => (
    <>
      <page.PaginationItem key={pageNum - 1}>
        <page.PaginationLink
          onClick={(e) => {
            toPage(pageNum);
          }}
          className="cursor-pointer"
          isActive={pageNum === pageNo! + 1}
        >
          {pageNum}
        </page.PaginationLink>
      </page.PaginationItem>
      {!lastPage ? (
        <></>
      ) : (
        <page.PaginationItem>
          <page.PaginationEllipsis />
        </page.PaginationItem>
      )}
    </>
  );

  return (
    <page.Pagination className="justify-end">
      <page.PaginationContent>
        <page.PaginationItem className="cursor-pointer">
          <page.PaginationPrevious onClick={prevPage} />
        </page.PaginationItem>
        {renderPaginationLinks()}
        <page.PaginationItem className="cursor-pointer">
          <page.PaginationNext onClick={nextPage} />
        </page.PaginationItem>
      </page.PaginationContent>
    </page.Pagination>
  );
}
