import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const getPageNumbers = () => {
    
    const totalNumbers = 5;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);
      let pages = [];

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return [1, ...pages, totalPages];
    }

    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

  return (
    <nav className="mt-4 flex justify-center" aria-label="Page navigation">
      <ul className="inline-flex space-x-2">
        <li>
          <button
            className={`px-3 py-2 bg-gray-200 rounded-md text-gray-700 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            <button
              className={`px-3 py-2 rounded-md ${
                page === currentPage
                  ? "bg-[#ee4f50] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`px-3 py-2 bg-gray-200 rounded-md text-gray-700 ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
