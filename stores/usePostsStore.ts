"use client";
import { create } from "zustand";
import type { BlogPost } from "@/app/types/query";

type PostsState = {
  posts: BlogPost[];
  currentPage: number;
  itemsPerPage: number;
  setPosts: (posts: BlogPost[]) => void;
  setCurrentPage: (page: number) => void;
};

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  currentPage: 1,
  itemsPerPage: 9,
  setPosts: (posts) => set({ posts }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));
