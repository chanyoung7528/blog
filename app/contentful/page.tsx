import client from "@/lib/apollo-client";
import { GET_ALL_POSTS } from "@/lib/queries";
import Link from "next/link";

type BlogPost = {
  sys: { id: string };
  title: string;
  slug: string;
  publishedDate: string;
};

type ResponseData = {
  pageBlogPostCollection: {
    items: BlogPost[];
  };
};

export default async function Home() {
  const { data } = await client.query<ResponseData>({
    query: GET_ALL_POSTS,
    variables: { limit: 10, skip: 0 },
  });

  const posts = data?.pageBlogPostCollection.items;
  console.log("posts", posts);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6 font-bold">블로그 포스트</h1>
      <ul className="space-y-4">
        {posts?.map((post) => (
          <li key={post.sys.id} className="rounded border p-4 shadow">
            <Link href={`/contentful/${post.slug}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">
                {new Date(post.publishedDate).toLocaleDateString("ko-KR")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
