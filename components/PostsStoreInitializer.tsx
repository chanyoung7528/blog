"use client";
import { useEffect } from "react";
import { usePostsStore } from "@/stores/usePostsStore";
import type { BlogPost } from "@/app/types/query";

export default function PostsStoreInitializer({
  posts,
  children,
}: {
  posts: BlogPost[];
  children: React.ReactNode;
}) {
  const { setPosts } = usePostsStore();

  useEffect(() => {
    setPosts(posts);
  }, [posts, setPosts]);

  return <>{children}</>;
}
