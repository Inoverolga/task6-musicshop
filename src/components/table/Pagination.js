import { Pagination as BootstrapPagination } from "react-bootstrap";

const Pagination = ({ currentPage, onPageChange }) => {
  const getVisiblePages = () => {
    const pages = [];

    pages.push(1);

    const startPage = Math.max(2, currentPage - 1);
    const endPage = currentPage + 2;

    if (startPage > 2) {
      pages.push("ellipsis-left");
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <BootstrapPagination className="justify-content-center">
      <BootstrapPagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {getVisiblePages().map((page, index) => {
        if (page === "ellipsis-left") {
          return (
            <BootstrapPagination.Ellipsis key={`ellipsis-${index}`} disabled />
          );
        }

        return (
          <BootstrapPagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </BootstrapPagination.Item>
        );
      })}

      <BootstrapPagination.Next onClick={() => onPageChange(currentPage + 1)} />
    </BootstrapPagination>
  );
};

export default Pagination;
