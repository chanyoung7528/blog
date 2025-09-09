"use client";

import styles from "@/styles/layout/post.module.css";
import PostCard from "./PostCard";
import { usePostsStore } from "@/stores/usePostsStore";
export const Post = () => {
  const { posts, currentPage, itemsPerPage } = usePostsStore();
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const sorted = [...posts].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  );
  const currentPageWritings = sorted.slice(start, end);

  return (
    <section className="mt-[6.78rem]">
      <h3 className={styles.tit_sub}>Posts</h3>
      <ul className="grid grid-cols-1 gap-[64px] pt-[2.7rem] md:grid-cols-2 lg:grid-cols-3">
        {currentPageWritings.map((post) => (
          <PostCard
            key={post.sys.id}
            slug={post.slug}
            image={post.featuredImage?.url || ""}
            title={post.title}
            date={post.publishedDate}
            tags={post.tags || []}
          />
        ))}
      </ul>
    </section>
  );
};
export default Post;
