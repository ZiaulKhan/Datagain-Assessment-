/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
}: Props) => {
  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-xl  text-xs">
      <span className="text-gray-500">
        {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalPages * itemsPerPage)} of{" "}
        {totalPages * itemsPerPage}
      </span>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1  text-xs flex items-center gap-1 disabled:text-gray-300 cursor-pointer"
        >
          <FaArrowLeft /> Previous
        </button>

        {getPages().map((page, i) => (
          <button
            key={i}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`w-8 h-6 text-xs rounded-md ${
              currentPage === page ? "bg-white text-black" : "text-gray-500"
            } ${
              page === "..." ? "cursor-default" : "hover:bg-white"
            } cursor-pointer`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1  text-xs flex items-center gap-1 disabled:text-gray-300 cursor-pointer"
        >
          Next <FaArrowRight />
        </button>
      </div>

      <div className="flex items-center gap-2 text-gray-400 text-xs">
        Go on to
        <input
          type="number"
          min={1}
          max={totalPages}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              const val = parseInt(e.target.value);
              if (val >= 1 && val <= totalPages) {
                onPageChange(val);
              }
            }
          }}
          className="w-8 h-6 rounded-md border text-center text-black font-semibold bg-white border-none"
          placeholder={`${currentPage}`}
        />
      </div>
    </div>
  );
};

export default Pagination;
