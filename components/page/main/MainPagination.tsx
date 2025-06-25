"use client";
import { useAllWritings } from "@/contexts/AllWritingsContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/Pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const MainPagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentPage, totalPages, setCurrentPage } = useAllWritings();
  const [isMobile, setIsMobile] = useState(false);

  const baseButtonStyles = isMobile
    ? "h-[40px] w-[40px] mt-[10px] bg-[#f3f4f6] text-[24px] flex items-center justify-center"
    : "h-[50px] w-[50px] mt-[10px] bg-[#f3f4f6] text-[30px] flex items-center justify-center";
  const disabledStyles = "pointer-events-none opacity-50";
  const numberButtonStyles = isMobile
    ? "min-w-[40px] text-[15px] rounded-[5px] cursor-pointer flex items-center justify-center no-underline"
    : "min-w-[50px] text-[17px] rounded-[5px] cursor-pointer flex items-center justify-center no-underline";

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
      const params = new URLSearchParams(window.location.search);
      params.set("page", page.toString());
      router.push(`?${params.toString()}`, { scroll: false });
      scrollToTarget();
    }
  };

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = currentPage - 2;
    let end = currentPage + 2;

    if (start < 1) {
      start = 1;
      end = 5;
    } else if (end > totalPages) {
      end = totalPages;
      start = totalPages - 4;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      const pageNum = parseInt(page);
      if (pageNum >= 1 && pageNum <= totalPages) {
        setCurrentPage(pageNum);
      }
    }
  }, [searchParams, totalPages, setCurrentPage]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="mt-[90px] w-full text-center">
      <Pagination>
        <PaginationContent className="gap-2">
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
                  ? "text-gray7 " + disabledStyles
                  : "text-gray9",
              )}
            >
              <ChevronsLeft size={24} />
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
                  page === currentPage ? "text-black1" : "text-gray9",
                  "mx-1",
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
                handlePageChange(totalPages);
              }}
              className={cn(
                baseButtonStyles,
                currentPage === totalPages
                  ? "text-gray7 " + disabledStyles
                  : "text-gray9",
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
