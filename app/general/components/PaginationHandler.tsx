import React, { useCallback } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPageChange: any;
}

export const PaginationHandler: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = useCallback(() => {
    const pageNumbers: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages - 1);
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pageNumbers.push(1);
        pageNumbers.push(2);
        pageNumbers.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push(2);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages - 1);
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  }, [currentPage, totalPages]);

  const handlePageClick = (page: number | string) => {
    onPageChange(page);
  };

  return (
    <div key="pagination" className="flex items-center justify-between border-t px-4 py-3 sm:px-6">
      <div key="showing-items" className="text-sm ">
        <span key="val-1" className="font-medium">
          {String((currentPage - 1) * 10 + 1)}
        </span>{' '}
        - {'  '}
        <span key="val-2" className="font-medium">
          {String(Math.min(currentPage * 10, totalPages * 10))}
        </span>
        {'  '}
        arasında
        {'  '}
        <span key="val-3" className="font-medium">
          {String(totalPages * 10)}
        </span>{' '}
        nəticədən
      </div>
      <div key="pages-0" className=" inline-flex -space-x-px rounded-md shadow-xs">
        <button
          key={0}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? 'cursor-not-allowed' : ''
          } relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-gray-300 ring-inset hover:bg-gray-500 focus:z-20 focus:outline-offset-0 disabled:opacity-50`}
        >
          Previous
        </button>
        {getPageNumbers().map((page) => {
          if (page === '...') {
            return (
              <button
                key={`dots-${Math.random()}`}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-gray-300 ring-inset focus:outline-offset-0"
              >
                {String(page)}
              </button>
            );
          }
          if (isNaN(Number(page))) {
            return '';
          } else {
            return (
              <button
                key={`pages-${page}`}
                onClick={() => handlePageClick(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-gray-300 ring-inset hover:bg-gray-500 focus:z-20 focus:outline-offset-0 ${
                  page === currentPage
                    ? 'z-10 bg-gray-800 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-gray-800'
                    : 'bg-gray-600'
                }`}
              >
                {page}
              </button>
            );
          }
        })}
        <button
          key={`page${totalPages + 1}`}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages ? 'cursor-not-allowed' : ''
          } relative inline-flex items-center rounded-r-md px-2 py-2  ring-1 ring-gray-300 ring-inset hover:bg-gray-500 focus:z-20 focus:outline-offset-0 disabled:opacity-50`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
