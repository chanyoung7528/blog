"use client";

import { useAllWritings } from "@/contexts/AllWritingsContext";
import styles from "@/styles/layout/post.module.css";
import PostCard from "./PostCard";
export const Post = () => {
  const { currentPageWritings } = useAllWritings();

  return (
    <section className="mt-[6.78rem]">
      <h3 className={styles.tit_sub}>Posts</h3>
      <ul className="pt-[2.7rem]">
        <div className="grid grid-cols-1 gap-[64px] md:grid-cols-2 lg:grid-cols-3">
          {currentPageWritings.map((post) => (
            <PostCard
              key={post._id}
              id={post._id}
              slug={post.slug}
              image={post.image || ""}
              title={post.title}
              date={post.date}
              tags={post.tags || []}
            />
          ))}
        </div>
      </ul>
    </section>
  );
};
export default Post;
