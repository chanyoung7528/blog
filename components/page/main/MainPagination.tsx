"use client";
import { useAllWritings } from "@/contexts/AllWritingsContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const MainPagination = () => {
  const { currentPage, totalPages, setCurrentPage } = useAllWritings();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToTarget = () => {
    const element = document.getElementById("target-section");
    if (element) {
      if (isMobile) {
        window.scrollTo({ top: 0 });
      } else {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  };

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      scrollToTarget();
    }
  };

  const getVisiblePages = () => {
    if (!isMobile) return Array.from({ length: totalPages }, (_, i) => i + 1);

    let start = currentPage - 1;
    let end = currentPage + 1;

    if (start < 1) {
      start = 1;
      end = Math.min(3, totalPages);
    } else if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - 2);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const baseButtonStyles = isMobile
    ? "h-[40px] w-[40px] mt-[10px] bg-[#f3f4f6] text-[24px] flex items-center justify-center"
    : "h-[50px] w-[50px] mt-[10px] bg-[#f3f4f6] text-[30px] flex items-center justify-center";
  const disabledStyles = "pointer-events-none opacity-50";
  const numberButtonStyles = isMobile
    ? "min-w-[40px] text-[15px] rounded-[5px] cursor-pointer flex items-center justify-center no-underline"
    : "min-w-[50px] text-[17px] rounded-[5px] cursor-pointer flex items-center justify-center no-underline";

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
                "hidden lg:flex",
                currentPage === 1
                  ? "text-[#d1d5db] " + disabledStyles
                  : "text-[#a3a3a3]",
              )}
            >
              <ChevronLeft size={24} />
            </PaginationLink>
          </PaginationItem>
          {getVisiblePages().map((page) => (
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
                "hidden lg:flex",
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
