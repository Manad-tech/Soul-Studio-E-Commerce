import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null; // No pagination controls needed if only 1 page

  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-20 flex justify-center items-center gap-3">
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 hover:border-[#C58A5C] hover:text-[#C58A5C] transition disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>

      {pagesArray.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition font-semibold cursor-pointer ${
            page === currentPage
              ? "bg-[#C58A5C] text-black"
              : "border border-white/10 hover:border-[#C58A5C] hover:text-[#C58A5C]"
          }`}
        >
          {page}
        </button>
      ))}

      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 hover:border-[#C58A5C] hover:text-[#C58A5C] transition disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}