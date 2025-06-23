import "@/styles/mdx.css";
import TocList from "@/components/page/posts/TocList";
import { parseToc } from "@/lib/mdx";
import { allDocuments, type DocumentTypes } from "contentlayer/generated";
import { compareAsc, format } from "date-fns";
import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/page/posts/Mdx";

interface PageProps {
  params: { slug: string[] };
}

// ✅ 정적 경로 생성
export function generateStaticParams() {
  return allDocuments.map(({ slug }) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getDocFromParams(params);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        "https://user-images.githubusercontent.com/65283190/262063367-a7407bba-09a0-420a-ae45-2ed3e6f3e3b8.png",
      ],
      locale: "ko_KR",
      type: "website",
    },
  };
}

// ✅ Post 데이터 조회
async function getDocFromParams(params: { slug: string[] }) {
  const slugArray = await params.slug;
  const slug = (slugArray ?? []).join("/");
  const post = allDocuments.find((doc) => doc.slug === slug);

  if (post) {
    post.date = format(new Date(post.date), "MMMM dd, yyyy");
  }

  return post;
}

// ✅ 이전/다음 글 정보 생성
function getRelatedInfo(post: DocumentTypes) {
  return allDocuments
    .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
    .reduce<{
      prevPost?: { title: string; href: string };
      nextPost?: { title: string; href: string };
    }>((ac, v, idx, list) => {
      if (v.slug === post.slug) {
        const prev = [...list.slice(0, idx)]
          .reverse()
          .find((doc) => doc.type === post.type);
        if (prev) ac.prevPost = { title: prev.title, href: prev.href };

        const next = list.slice(idx + 1).find((doc) => doc.type === post.type);
        if (next) ac.nextPost = { title: next.title, href: next.href };
      }
      return ac;
    }, {});
}

// ✅ 메인 페이지 컴포넌트
export default async function PostPage({ params }: PageProps) {
  const post = await getDocFromParams(params);

  if (!post) notFound();

  const toc = parseToc(post.body.raw);
  const { prevPost, nextPost } = getRelatedInfo(post);

  return (
    <main className="mx-auto box-border w-full max-w-[1280px] flex-grow px-5">
      <article className="py-[69px] pb-[88px]">
        <div className="mx-auto max-w-[800px] text-center">
          <h1 className="block pt-2 text-[2.5rem] font-bold leading-tight">
            {post.title}
          </h1>
          <div className="text-slate-400 flex flex-wrap justify-center pt-[0.86rem] leading-[1.43]">
            {post.tags?.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`} className="mr-2">
                #{tag}
              </Link>
            ))}
            <span>{post.date}</span>
          </div>
        </div>

        <div className="relative mx-auto flex max-w-[800px] gap-[25px]">
          <aside className="absolute right-[-425px] top-0 mt-[50px] h-full w-[400px] bg-white">
            <TocList toc={toc} />
          </aside>

          <div className="inner_content mx-auto mt-[50px] max-w-[768px] break-words">
            <Mdx code={post.body.code} />
            <div className="my-[86px] mb-[77px] flex justify-center">
              <Link
                href="/blog"
                className="bg-gray-500 block w-fit rounded-[0.43rem] p-[0.71rem_1.43rem] text-[1.14rem]"
              >
                Back to Blog
              </Link>
            </div>

            <div className="bg-gray-100 border-neutral-400 flex justify-between rounded border p-[10px]">
              {prevPost && <Link href={prevPost.href}>← {prevPost.title}</Link>}
              {nextPost && <Link href={nextPost.href}>{nextPost.title} →</Link>}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
