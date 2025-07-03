export const dynamic = "force-dynamic";

import PostCard from "@/components/page/posts/PostCard";
import { Badge } from "@/components/ui/Badge";
import { categoryInfo } from "@/constant/post";
import { filterDraft, sortDateDesc } from "@/lib/mdx";
import { allWritings } from "contentlayer/generated";
import { format } from "date-fns";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { CategoryTagFilter } from "@/components/page/category/CategoryTagFilter";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ tag?: string }>;
}

export function generateStaticParams() {
  return [
    { slug: "react" },
    { slug: "vue" },
    { slug: "javascript" },
    { slug: "ts" },
    { slug: "next" },
    { slug: "vite" },
    { slug: "storybook" },
    { slug: "nuxt" },
    { slug: "webpack" },
    { slug: "algorithms" },
    { slug: "snippet" },
    { slug: "project" },
  ];
}

function getDocFromParams(slug: string) {
  const categoryId = slug;
  const categoryList = allWritings
    .filter((doc) => doc.category === categoryId)
    .map((cate) => {
      return {
        ...cate,
        date: format(new Date(cate.date), "MMMM dd. yyyy"),
      };
    });

  return {
    categoryList,
    categoryId,
  };
}

export async function generateMetadata(
  { params }: { params: PageProps["params"] },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resolvedParams = await params;
  const { categoryList } = getDocFromParams(resolvedParams.slug);

  const previousImages = (await parent).openGraph?.images || [];

  if (!categoryList) {
    return {};
  }

  return {
    title: {
      absolute: categoryList[0]?.title,
    },
    description: categoryList[0]?.description,
    openGraph: {
      title: categoryList[0]?.title,
      description: categoryList[0]?.description,
      images: [
        "https://user-images.githubusercontent.com/65283190/262063367-a7407bba-09a0-420a-ae45-2ed3e6f3e3b8.png",
        ...previousImages,
      ],
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;
  const searchParam = await searchParams;
  const { categoryList, categoryId } = getDocFromParams(resolvedParams.slug);
  const activeTag = searchParam.tag || null;

  const categoryBadgeInfo = categoryInfo.find(
    (cate) => cate.value === resolvedParams.slug,
  );

  if (!categoryList) {
    notFound();
  }

  const allUniqueTags = [
    ...new Set(categoryList.flatMap((item) => item.tags || [])),
  ];

  const filteredPosts = activeTag
    ? categoryList.filter((post) => post.tags?.includes(activeTag))
    : categoryList;

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
            {filteredPosts
              .filter(filterDraft)
              .sort(sortDateDesc)
              .map((post, i) => {
                return (
                  <PostCard
                    key={i}
                    id={post._id}
                    slug={post.slug}
                    image={post.image || ""}
                    title={post.title}
                    date={post.date}
                    tags={post.tags || []}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
