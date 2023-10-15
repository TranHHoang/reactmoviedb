interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalResults?: number;
  totalPages?: number;
}

export function Pagination({ page, setPage, totalResults, totalPages }: PaginationProps) {
  return (
    <div className="my-8 flex flex-col items-center">
      <span className="text-md text-gray-700">
        Showing <span className="font-semibold text-gray-900">{(page - 1) * 20 + 1}</span> to{" "}
        <span className="font-semibold text-gray-900">{Math.min(totalResults ?? 0, page * 20)}</span> of{" "}
        <span className="font-semibold text-gray-900">{totalResults ?? 0}</span> Entries
      </span>
      <div className="xs:mt-0 mt-2 inline-flex">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="flex h-8 items-center justify-center rounded-l bg-gray-800 px-3 text-sm font-medium text-white hover:bg-gray-900 "
        >
          <svg
            className="mr-2 h-3.5 w-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === (totalPages ?? 0)}
          className="flex h-8 items-center justify-center rounded-r border-0 border-l border-gray-700 bg-gray-800 px-3 text-sm font-medium text-white hover:bg-gray-900 "
        >
          Next
          <svg
            className="ml-2 h-3.5 w-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
