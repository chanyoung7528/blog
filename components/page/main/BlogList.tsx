"use client";

import Post from "../posts/Post";
import { MainPagination } from "./MainPagination";
import { Suspense } from "react";

function BlogList() {
  return (
    <>
      <Post />
      <Suspense fallback={null}>
        <MainPagination />
      </Suspense>
    </>
  );
}

export default BlogList;
