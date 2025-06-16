// contexts/AllWritingsContext.tsx
"use client";
import { createContext, useContext } from "react";
import { Writing } from "contentlayer/generated";

export const AllWritingsContext = createContext<Writing[] | null>(null);

export function useAllWritings() {
  const context = useContext(AllWritingsContext);
  if (!context) throw new Error("AllWritingsContext not found");
  return context;
}
