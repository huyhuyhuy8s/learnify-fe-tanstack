import { Trans } from "react-i18next";
import Icon from "@/components/Icon";
import "./style.scss";

type TPaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}: TPaginationProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = (): (number | "…")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "…")[] = [];
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "…", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(
        1,
        "…",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "…",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "…",
        totalPages
      );
    }
    return pages;
  };

  return (
    <div className="admin-pagination">
      <span className="admin-pagination__info">
        <Trans
          i18nKey="admin.pagination.showing"
          values={{ start: startItem, end: endItem, total: totalItems }}
        />
      </span>

      <div className="admin-pagination__controls">
        <button
          type="button"
          id="pagination-prev-btn"
          className="admin-pagination__btn admin-pagination__btn--nav"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          <Icon name="chevron_left" size={18} />
        </button>

        {getPageNumbers().map((page, idx) =>
          page === "…" ? (
            <span
              key={`ellipsis-${idx}`}
              className="admin-pagination__ellipsis"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              id={`pagination-page-${page}`}
              className={`admin-pagination__btn ${
                page === currentPage ? "admin-pagination__btn--active" : ""
              }`}
              onClick={() => onPageChange(page as number)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          id="pagination-next-btn"
          className="admin-pagination__btn admin-pagination__btn--nav"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          <Icon name="chevron_right" size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
