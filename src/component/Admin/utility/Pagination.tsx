import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Helper to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first 5, last 5, and current +/- 2
      if (currentPage <= 5) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else if (currentPage >= totalPages - 4) {
        for (let i = 1; i <= 2; i++) pages.push(i);
        pages.push("...");
        for (let i = totalPages - 6; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1, 2, "...");
        for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
        pages.push("...", totalPages - 1, totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-6 gap-2 flex-wrap">
      <button
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        Start
      </button>
      <button
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageNumbers.map((num, idx) =>
        typeof num === "number" ? (
          <button
            key={num}
            className={`px-3 py-1 rounded font-semibold ${
              num === currentPage
                ? "bg-blue-700 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        ) : (
          <span key={"ellipsis-" + idx} className="px-2 py-1 text-gray-400 select-none">...</span>
        )
      )}
      <button
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        End
      </button>
    </div>
  );
};

export default Pagination;
