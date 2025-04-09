import Blog from "../blog";

const RecentPosts = () => (
  <section className="my-12">
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
