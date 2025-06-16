"use client";
import { useAllWritings } from "@/contexts/AllWritingsContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const MainPagination = () => {
  const posts = useAllWritings();
  const postsPerPage = 9;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const baseButtonStyles =
    "h-[50px] w-[50px] mt-[10px] bg-[#f3f4f6] text-[30px] flex items-center justify-center";
  const disabledStyles = "pointer-events-none opacity-50";
  const numberButtonStyles =
    "min-w-[50px] text-[17px] rounded-[5px] cursor-pointer flex items-center justify-center no-underline";

  return (
    <div className="mt-[90px] w-full text-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(1);
              }}
              className={cn(
                baseButtonStyles,
                currentPage === 1
                  ? "text-[#d1d5db] " + disabledStyles
                  : "text-[#a3a3a3]",
              )}
            >
              <ChevronsLeft size={24} />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              className={cn(
                baseButtonStyles,
                "mr-[50px]",
                currentPage === 1
                  ? "text-[#d1d5db] " + disabledStyles
                  : "text-[#a3a3a3]",
              )}
            >
              <ChevronLeft size={24} />
            </PaginationLink>
          </PaginationItem>
          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
                isActive={page === currentPage}
                className={cn(
                  baseButtonStyles,
                  numberButtonStyles,
                  page === currentPage ? "text-[#040f0f]" : "text-[#a3a3a3]",
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              className={cn(
                baseButtonStyles,
                "ml-[50px]",
                currentPage === totalPages
                  ? "text-[#d1d5db] " + disabledStyles
                  : "text-[#a3a3a3]",
              )}
            >
              <ChevronRight size={24} />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(totalPages);
              }}
              className={cn(
                baseButtonStyles,
                currentPage === totalPages
                  ? "text-[#d1d5db] " + disabledStyles
                  : "text-[#a3a3a3]",
              )}
            >
              <ChevronsRight size={24} />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
