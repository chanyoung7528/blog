"use client";
import { DateIcon } from "@/components/ui/icons/date-icon";
import { Writing } from "contentlayer/generated";
import { format } from "date-fns";

export function CategoryList({ post, type }: { post: Writing; type?: string }) {
  console.log("post", post);
  return (
    <article className="ring-gray-200 hover:bg-neutral-50 hover:ring-amber-200 active:bg-neutral-100 dark:ring-gray-700 mb-5 flex w-full cursor-pointer flex-col rounded-md p-4 shadow-sm ring-1 transition-all hover:-translate-y-1 hover:ring-4 md:flex-row md:items-center md:justify-between md:space-x-2">
      <div className="grow-1 order-1 overflow-hidden rounded-lg shadow-md md:order-2 md:w-60 md:grow-0 md:basis-auto">
        <div className="relative">
          {/* {post.image && (
            <img
              alt="post-thumbnail"
              src={post.image}
              decoding="async"
              data-nimg="1"
            />
          )} */}
        </div>
      </div>
      <div className="order-2 mt-4 flex grow basis-0 flex-col space-y-2 p-2 md:order-1 md:mt-0">
        <div className="flex flex-wrap items-center gap-2">
          <div className="w-8 overflow-hidden rounded-full">
            {post?.subImage && (
              <img
                alt="profile_image"
                src={post?.subImage}
                decoding="async"
                data-nimg="1"
                loading="lazy"
              />
            )}
          </div>
          <h2 className="maxSm:text-2xl text-3xl text-ellipsis">
            {post.title}
          </h2>
        </div>

        <div className="md:mr-6">
          <p className="mb-1 max-h-20 overflow-hidden text-ellipsis">
            {post.description}
          </p>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <time className="text-sm text-gray-400 flex items-center gap-2 font-light">
                <DateIcon width="20px" heigth="20px" />
                {format(new Date(post.date), "yyyy-MM-dd")}
              </time>

              {post?.tags?.map((tag: string, index: number) => (
                <span className="tag-item maxSm:hidden" key={`tag${index}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
