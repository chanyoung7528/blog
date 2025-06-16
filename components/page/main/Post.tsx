"use client";

import { useAllWritings } from "@/contexts/AllWritingsContext";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import styles from "@/styles/layout/post.module.css";
export const Post = () => {
  const { currentPageWritings } = useAllWritings();

  return (
    <section className="mt-[6.78rem]">
      <h3 className={styles.tit_sub}>Posts</h3>
      <ul className="pt-[2.7rem]">
        <div className="grid grid-cols-1 gap-[64px] md:grid-cols-2 lg:grid-cols-3">
          {currentPageWritings.map((post) => (
            <li key={post._id}>
              <Link
                href={`/posts/${post._raw.flattenedPath}`}
                className="flex h-full flex-col"
              >
                <div className="relative aspect-[400/207] w-full overflow-hidden rounded-md bg-[#f2f4f7]">
                  <Image
                    src={post.image || "/default-thumbnail.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-[1.57rem]">
                  <h4 className={styles.tit_post}>{post.title}</h4>

                  <dl className={styles.dl_info}>
                    <dd className={styles.dl_info_time}>
                      {format(new Date(post.date), "yyyy-MM-dd")}
                    </dd>

                    <div className="flex items-center  gap-2">
                      {post?.tags
                        ?.slice(0, 2)
                        .map((tag: string, index: number) => (
                          <span className="tag-item" key={`tag${index}`}>
                            {tag}
                          </span>
                        ))}
                    </div>
                  </dl>
                </div>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </section>
  );
};
export default Post;
