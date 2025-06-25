import { format, compareAsc } from "date-fns";
import { allDocuments, DocumentTypes } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import { Mdx } from "@/components/page/posts/Mdx";
import TocList from "@/components/page/posts/TocList";
import { parseToc } from "@/lib/mdx";

type PageProps = {
  params: { slug?: string[] };
};

export async function generateMetadata(
  { params }: { params: Promise<PageProps["params"]> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getDocFromParams(resolvedParams.slug);

  if (!post) {
    return {};
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        "https://user-images.githubusercontent.com/65283190/262063367-a7407bba-09a0-420a-ae45-2ed3e6f3e3b8.png",
        ...previousImages,
      ],
      locale: "ko_KR",
      type: "website",
    },
  };
}

async function getDocFromParams(slugArray: string[] | undefined) {
  if (!slugArray) {
    return null;
  }
  const slug = slugArray.join("/");
  const post = allDocuments.find((doc) => doc.slug === slug);
  if (post) {
    const postClone = { ...post };
    postClone.date = format(new Date(postClone.date), "MMMM dd, yyyy");
    return postClone;
  }
  return null;
}

function getRelatedInfo(currentPost: DocumentTypes) {
  const sortedDocuments = allDocuments
    .filter((doc) => doc.type === currentPost.type)
    .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)));
  const currentIndex = sortedDocuments.findIndex(
    (doc) => doc.slug === currentPost.slug,
  );
  const prevPost =
    currentIndex > 0 ? sortedDocuments[currentIndex - 1] : undefined;
  const nextPost =
    currentIndex < sortedDocuments.length - 1
      ? sortedDocuments[currentIndex + 1]
      : undefined;
  return {
    prevPost: prevPost
      ? { title: prevPost.title, href: prevPost.href }
      : undefined,
    nextPost: nextPost
      ? { title: nextPost.title, href: nextPost.href }
      : undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<PageProps["params"]>;
}) {
  const resolvedParams = await params;
  const post = await getDocFromParams(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const toc = parseToc(post.body.raw);
  const { prevPost, nextPost } = getRelatedInfo(post);

  return (
    <main className="mx-auto box-border w-full flex-grow px-[30px] xl:mx-0">
      <div className="py-[69px] pb-[88px]">
        <div className="mx-auto max-w-[800px] text-center">
          <h1 className="block pt-2 text-[2.5rem] font-bold leading-tight">
            {post.title}
          </h1>
          <div className="text-slate-400 flex flex-wrap items-center justify-center gap-x-2 pt-[0.86rem] leading-[1.43]">
            <span>{post.date}</span>
            <div className="flex flex-wrap justify-center">
              {post.tags?.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`} className="mr-2">
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex max-w-[800px] gap-[25px]">
          <aside className="absolute right-[-425px] top-0 mt-[78px] hidden h-full w-[400px] bg-white dark:bg-[#1d1d1d] xl:block">
            <TocList toc={toc} />
          </aside>

          <div className="inner_content mx-auto mt-[50px] w-full max-w-[768px] break-words maxMd:w-full">
            <Mdx code={post.body.code} />
            <div className="my-[86px] mb-[77px] flex justify-center">
              <Link
                href="/blog"
                className="bg-gray-500 block w-fit rounded-[0.43rem] p-[0.71rem_1.43rem] text-[1.14rem] text-white"
              >
                Back to Blog
              </Link>
            </div>

            <div className="bg-gray-100 border-neutral-400 flex justify-between rounded border p-[10px]">
              <div>
                {prevPost && (
                  <Link href={prevPost.href}>← {prevPost.title}</Link>
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
