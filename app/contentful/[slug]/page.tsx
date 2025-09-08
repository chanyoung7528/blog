import client from "@/lib/apollo-client";
import { GET_POST_BY_SLUG, GET_ALL_POSTS } from "@/lib/queries";
import { notFound } from "next/navigation";
import PrettyCodeDemo from "@/components/ui/PrettyCodeDemo";
import { ResponseData } from "@/app/types/query";

/**
 * Generate route parameters for all blog post pages.
 *
 * Queries the CMS for up to 100 posts and returns an array of objects suitable
 * for Next.js static route generation, e.g. `{ slug: "post-slug" }`.
 *
 * If no posts are returned, an empty array is returned.
 *
 * @returns An array of route parameter objects with a `slug` property.
 */
export async function generateStaticParams() {
  const { data } = await client.query<ResponseData>({
    query: GET_ALL_POSTS,
    variables: { limit: 100, skip: 0 },
    fetchPolicy: "no-cache",
  });

  return (
    data?.pageBlogPostCollection?.items?.map((post) => ({
      slug: post.slug,
    })) ?? []
  );
}

/**
 * Renders a blog post page for the given slug by fetching the post from Contentful.
 *
 * Fetches the post matching `params.slug`; if no post is found, triggers a 404 via `notFound()`.
 *
 * @param params.slug - The slug identifying the post to render.
 * @returns The server-rendered React element for the post page.
 */
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const { data } = await client.query<ResponseData>({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  });

  const post = data?.pageBlogPostCollection?.items?.[0];

  if (!post) {
    notFound();
  }
  console.log("post", post);
  return (
    <main className="mx-auto box-border w-full flex-grow px-[30px] xl:mx-0">
      {" "}
      <div className="py-[69px] pb-[88px]">
        <div className="mx-auto max-w-[800px] text-center">
          <h1 className="block pt-2 text-[2.5rem] font-bold leading-tight">
            {post.title}
          </h1>
        </div>
        <div className="inner_content mx-auto mt-[50px] w-full max-w-[768px] break-words maxMd:w-full">
          <PrettyCodeDemo markdown={post.content} />
          {/* <PrettyCodeDemo /> */}
        </div>
      </div>
    </main>
  );
}
