"use client";

import { AllWritingsProvider } from "@/contexts/AllWritingsContext"; // 기존 Context 로직
import { Writing } from "contentlayer/generated";
import Post from "../posts/Post";
import { MainPagination } from "./MainPagination";

function BlogList({ writings }: { writings: Writing[] }) {
  return (
    <AllWritingsProvider writings={writings}>
      <Post />
      <MainPagination />
    </AllWritingsProvider>
  );
}

export default BlogList;
