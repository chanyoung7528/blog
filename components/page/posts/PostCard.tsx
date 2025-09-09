import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import styles from "@/styles/layout/post.module.css";
import { Tag } from "@/components/ui/Tag";

export default function PostCard({
  slug,
  image,
  title,
  date,
  tags,
}: {
  slug: string;
  image: string;
  title: string;
  date: string;
  tags: string[];
}) {
  return (
    <li>
      <Link
        prefetch={true}
        href={`/posts/${slug}`}
        className="flex h-full flex-col"
      >
        <div className="relative aspect-[128/72] w-full overflow-hidden rounded-md transition-transform duration-300 hover:scale-105">
          <Image
            src={image || "/default-thumbnail.jpg"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="mt-[1.57rem]">
          <h4
            className={`${styles.tit_post} overflow-hidden text-ellipsis whitespace-nowrap`}
          >
            {title}
          </h4>

          <dl className={styles.dl_info}>
            <dd className="flex items-center gap-2">
              <time className={styles.dl_info_time}>
                {format(new Date(date), "yyyy년 MM월 dd일")}
              </time>
            </dd>

            <div className="flex items-center  gap-2">
              {tags?.map((tag: string, index: number) => (
                <Tag key={`tag${index}`} tag={tag} />
              ))}
            </div>
          </dl>
        </div>
      </Link>
    </li>
  );
}
