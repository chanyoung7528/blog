// contexts/AllWritingsContext.tsx
"use client";
import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { Writing } from "contentlayer/generated";

const ITEMS_PER_PAGE = 9;

interface AllWritingsProviderProps {
  children: ReactNode;
  writings: Writing[];
}

interface AllWritingsContextValue {
  allWritings: Writing[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  currentPageWritings: Writing[];
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

const AllWritingsContext = createContext<AllWritingsContextValue | null>(null);

export const AllWritingsProvider = ({
  children,
  writings,
}: AllWritingsProviderProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentPageWritings = useMemo(() => {
    return writings.slice(startIndex, endIndex);
  }, [writings, startIndex, endIndex]);

  const totalItems = writings.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const value: AllWritingsContextValue = {
    allWritings: writings,
    currentPage,
    setCurrentPage,
    currentPageWritings,
    totalPages,
    itemsPerPage: ITEMS_PER_PAGE,
    totalItems,
  };

  return (
    <AllWritingsContext.Provider value={value}>
      {children}
    </AllWritingsContext.Provider>
  );
};

export function useAllWritings() {
  const context = useContext(AllWritingsContext);
  if (!context)
    throw new Error("useAllWritings must be used within AllWritingsProvider");
  return context;
}
