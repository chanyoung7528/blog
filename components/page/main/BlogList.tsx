// components/BlogList.tsx (새로 만들기)
"use client";

import { AllWritingsProvider } from "@/contexts/AllWritingsContext"; // 기존 Context 로직
import { Writing } from "contentlayer/generated";
import Post from "./Post";
import { MainPagination } from "./MainPagination";

// 페이지네이션 UI (별도 컴포넌트)

// Provider와 클라이언트 로직을 함께 묶는 Wrapper 컴포넌트
function BlogList({ writings }: { writings: Writing[] }) {
  return (
    <AllWritingsProvider writings={writings}>
      <Post /> {/* 이 컴포넌트는 내부적으로 useAllWritings()를 사용 */}
      <MainPagination />
    </AllWritingsProvider>
  );
}

export default BlogList;
