import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  siblingCount = 1,
  boundaryCount = 1,
}: PaginationProps) {
  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3 + boundaryCount * 2;
    
    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaryCount + 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - boundaryCount);

    const showLeftEllipsis = leftSiblingIndex > boundaryCount + 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - boundaryCount - 1;

    const pages: (number | string)[] = [];

    for (let i = 1; i <= boundaryCount; i++) {
      pages.push(i);
    }

    if (showLeftEllipsis) {
      pages.push('left-ellipsis');
    } else if (boundaryCount + 1 < leftSiblingIndex) {
      for (let i = boundaryCount + 1; i < leftSiblingIndex; i++) {
        pages.push(i);
      }
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i);
    }

    if (showRightEllipsis) {
      pages.push('right-ellipsis');
    } else if (rightSiblingIndex < totalPages - boundaryCount) {
      for (let i = rightSiblingIndex + 1; i < totalPages - boundaryCount + 1; i++) {
        pages.push(i);
      }
    }

    for (let i = totalPages - boundaryCount + 1; i <= totalPages; i++) {
      if (i > 0 && !pages.includes(i)) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages && !disabled) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-1 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
        className="h-9 px-3"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (typeof page === 'string') {
            return (
              <div
                key={`${page}-${index}`}
                className="h-9 px-2 flex items-center justify-center"
              >
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
            );
          }

          const isActive = page === currentPage;

          return (
            <Button
              key={page}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageClick(page)}
              disabled={disabled}
              className={`h-9 w-9 p-0 ${
                isActive ? "" : "hover:bg-accent"
              }`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
        className="h-9 px-3"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}
