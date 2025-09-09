import { format, compareAsc } from "date-fns";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import TocList from "@/components/page/posts/TocList";
import { parseToc } from "@/lib/mdx";
import MarkdownRenderer from "@/components/page/posts/MarkdownRenderer";
import { getAllPosts, getPostBySlug } from "@/lib/contentful";
import type { BlogPost, ResponseData } from "@/app/types/query";

type PageProps = {
  params: { slug?: string[] };
};

export async function generateMetadata(
  { params }: { params: Promise<PageProps["params"]> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams.slug);

  if (!post) {
    return {};
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.shortDescription,
    openGraph: {
      title: post.title,
      description: post.shortDescription,
      images: post.featuredImage?.url
        ? [post.featuredImage.url, ...previousImages]
        : [
            "https://user-images.githubusercontent.com/65283190/262063367-a7407bba-09a0-420a-ae45-2ed3e6f3e3b8.png",
            ...previousImages,
          ],
      locale: "ko_KR",
      type: "website",
    },
  };
}

async function getPostFromParams(slugArray: string[] | undefined) {
  if (!slugArray) {
    return null;
  }
  const slug = slugArray.join("/");
  // on-demand revalidate 방식: tag 추가
  const data: ResponseData = await getPostBySlug(slug, {
    tags: [`post:${slug}`], // slug별 태그 설정
  });
  const post = data?.pageBlogPostCollection?.items?.[0];
  return post ?? null;
}

async function getRelatedInfo(currentPost: BlogPost) {
  //  on-demand revalidate 방식: posts 태그 추가
  const data: ResponseData = await getAllPosts({
    tags: ["posts"],
  });

  const posts = (data?.pageBlogPostCollection?.items ?? []) as BlogPost[];
  const sorted = posts.sort((a: BlogPost, b: BlogPost) =>
    compareAsc(new Date(a.publishedDate), new Date(b.publishedDate)),
  );
  const currentIndex = sorted.findIndex(
    (p: BlogPost) => p.slug === currentPost.slug,
  );

  const prevPost = currentIndex > 0 ? sorted[currentIndex - 1] : undefined;
  const nextPost =
    currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : undefined;

  return {
    prevPost: prevPost
      ? { title: prevPost.title, href: `/posts/${prevPost.slug}` }
      : undefined,
    nextPost: nextPost
      ? { title: nextPost.title, href: `/posts/${nextPost.slug}` }
      : undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<PageProps["params"]>;
}) {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const toc = parseToc(post.content ?? "");
  const { prevPost, nextPost } = await getRelatedInfo(post);
  return (
    <main className="mx-auto box-border w-full flex-grow px-[30px] xl:mx-0">
      <div className="py-[69px] pb-[88px]">
        <div className="mx-auto max-w-[800px] text-center">
          <h1 className="block pt-2 text-[2.5rem] font-bold leading-tight">
            {post.title}
          </h1>
          <div className="text-slate-400 flex flex-wrap items-center justify-center gap-x-2 pt-[0.86rem] leading-[1.43]">
            <span>{format(new Date(post.publishedDate), "MMMM dd, yyyy")}</span>
            <div className="flex flex-wrap justify-center">
              {post.tags?.map((tag: string) => (
                <Link
                  prefetch={true}
                  key={tag}
                  href={`/tags/${tag}`}
                  className="mr-2"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex max-w-[800px] gap-[25px]">
          <aside className="absolute right-[-425px] top-0 mt-[78px] hidden h-full w-[400px] bg-white dark:bg-black3 lg:block">
            <TocList toc={toc} />
          </aside>

          <div className="inner_content mx-auto mt-[50px] w-full max-w-[768px] break-words maxMd:w-full">
            <MarkdownRenderer markdown={post.content} />
            <div className="my-[86px] mb-[77px] flex justify-center">
              <Link
                prefetch={true}
                href="/blog"
                className="bg-gray-500 block w-fit rounded-[0.43rem] p-[0.71rem_1.43rem] text-[1.14rem] text-white"
              >
                Back to Blog
              </Link>
            </div>

            <div className="bg-gray-100 border-neutral-400 flex justify-between rounded border p-[10px]">
              <div>
                {prevPost && (
                  <Link prefetch={true} href={prevPost.href}>
                    ← {prevPost.title}
                  </Link>
                )}
              </div>
              <div>
                {nextPost && (
                  <Link href={nextPost.href}>{nextPost.title} →</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
