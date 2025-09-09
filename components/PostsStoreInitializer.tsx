"use client";
import { useEffect } from "react";
import { usePostsStore } from "@/stores/usePostsStore";
import type { ResponseData } from "@/app/types/query";
import { getAllPosts } from "@/lib/contentful";

export default function PostsStoreInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setPosts } = usePostsStore();

  useEffect(() => {
    async function fetchPosts() {
      const data: ResponseData = await getAllPosts({
        tags: ["posts"],
      });
      setPosts(data.pageBlogPostCollection.items);
    }

    fetchPosts();
  }, [setPosts]);

  return <>{children}</>;
}
