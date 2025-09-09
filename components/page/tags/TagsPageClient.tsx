"use client";
import { Tag } from "@/components/ui/Tag";
import styles from "@/styles/layout/main.module.css";
import Link from "next/link";
import { usePostsStore } from "@/stores/usePostsStore";

export default function TagsPageClient() {
  const { posts } = usePostsStore();

  const uniqueTags = [
    ...new Set(
      (posts.flatMap((p) => p.tags || []) as string[]).filter(Boolean),
    ),
  ];

  const tagCategoryMap = posts.reduce((map, post) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        if (tag && !map.has(tag)) {
          map.set(tag, post.category);
        }
      });
    }
    return map;
  }, new Map<string, string>());

  return (
    <main
      id="target-section"
      className={`${styles.main} mx-auto my-12 min-h-[calc(100vh-200px)] max-w-[1280px]`}
    >
      <article>
        <div className="flex flex-col items-center gap-[3rem]">
          <h1 className="text-[3.43rem] font-bold leading-none">Tags</h1>
          <h2 className="text-[1.29rem]">
            모든 글들을 태그로 쉽게 찾아볼 수 있습니다.
          </h2>
        </div>
        <div className="mt-[3.28rem] flex flex-wrap gap-2">
          <ul className="flex flex-wrap gap-[1rem]">
            {uniqueTags.map((tag) => {
              const category = tagCategoryMap.get(tag);
              if (!category || !tag) return null;

              return (
                <li key={tag}>
                  <Link href={`/category/${category}?tag=${tag}`}>
                    <Tag tag={tag} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </main>
  );
}
