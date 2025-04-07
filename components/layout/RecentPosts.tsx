// components/RecentPosts.js
import Link from "next/link";
import Blog from "../blog";

const posts = [
  {
    id: 1,
    title: "포스트 제목 1",
    summary: "이것은 첫 번째 포스트의 요약입니다.",
    thumbnail: "/path/to/thumbnail1.jpg",
  },
  {
    id: 2,
    title: "포스트 제목 2",
    summary: "이것은 두 번째 포스트의 요약입니다.",
    thumbnail: "/path/to/thumbnail2.jpg",
  },
  // 추가 포스트 데이터
];

const RecentPosts = () => (
  <section className="my-12">
    <h2 className="text-2xl font-bold mb-4">최근 게시물</h2>
    <Blog />
    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded-lg">
          <img src={post.thumbnail} alt={post.title} className="mb-4 rounded" />
          <h3 className="text-xl font-semibold">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </h3>
          <p>{post.summary}</p>
        </div>
      ))}
    </div> */}
  </section>
);

export default RecentPosts;
