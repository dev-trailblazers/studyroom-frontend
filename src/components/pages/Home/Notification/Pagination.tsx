import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: PaginationProps) => (
  <div className="flex items-center justify-between mt-4">
    <button
      onClick={onPrevPage}
      disabled={currentPage === 1}
      className="flex items-center text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ChevronLeft className="w-4 h-4 mr-1" />
      이전
    </button>
    <span className="text-sm text-gray-500">
      {currentPage} / {totalPages}
    </span>
    <button
      onClick={onNextPage}
      disabled={currentPage === totalPages}
      className="flex items-center text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      다음
      <ChevronRight className="w-4 h-4 ml-1" />
    </button>
  </div>
);
