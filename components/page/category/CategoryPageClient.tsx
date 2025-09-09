"use client";
import PostCard from "@/components/page/posts/PostCard";
import { Badge } from "@/components/ui/Badge";
import { categoryInfo } from "@/constant/post";
import { CategoryTagFilter } from "@/components/page/category/CategoryTagFilter";
import { usePostsStore } from "@/stores/usePostsStore";
import { useSearchParams } from "next/navigation";

export default function CategoryPageClient({
  categoryId,
}: {
  categoryId: string;
}) {
  const searchParams = useSearchParams();
  const { posts } = usePostsStore();

  const activeTag = searchParams.get("tag");

  const categoryBadgeInfo = categoryInfo.find(
    (cate) => cate.value === categoryId,
  );

  const categoryPosts = posts.filter((p) => p.category === categoryId);
  const allUniqueTags = [
    ...new Set(categoryPosts.flatMap((item) => item.tags || [])),
  ];

  const filteredPosts = activeTag
    ? categoryPosts.filter((post) => post.tags?.includes(activeTag))
    : categoryPosts;

  return (
    <main className="mx-auto box-border w-full max-w-[1280px] flex-grow px-[30px] py-[69px] pb-[88px]">
      <div className="flex flex-col gap-8">
        <div
          data-animate
          data-animate-stage={1}
          className="flex flex-col items-center gap-4"
        >
          {categoryBadgeInfo && (
            <Badge category={categoryBadgeInfo} isSubName={false} />
          )}
          <CategoryTagFilter tags={allUniqueTags} categoryId={categoryId} />
        </div>

        <div className="mt-[6.78rem] w-full">
          <div
            data-animate
            data-animate-stage={2}
            className="grid grid-cols-1 gap-[64px] md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPosts.map((post) => (
              <PostCard
                key={post.sys.id}
                slug={post.slug}
                image={post.featuredImage?.url || ""}
                title={post.title}
                date={post.publishedDate}
                tags={post.tags || []}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
