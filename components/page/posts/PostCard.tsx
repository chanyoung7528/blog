import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import styles from "@/styles/layout/post.module.css";
import { DateIcon } from "@/components/ui/icons/date-icon";
import { Tag } from "@/components/ui/Tag";

export default function PostCard({
  id,
  slug,
  image,
  title,
  date,
  tags,
}: {
  id: string;
  slug: string;
  image: string;
  title: string;
  date: string;
  tags: string[];
}) {
  return (
    <li key={id}>
      <Link href={`/posts/${slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[400/207] w-full overflow-hidden rounded-md transition-transform duration-300 hover:scale-105">
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
              <DateIcon />
              <time className={styles.dl_info_time}>
                {format(new Date(date), "yyyy-MM-dd")}
              </time>
            </dd>

            <div className="flex items-center  gap-2">
              {tags?.slice(0, 2).map((tag: string, index: number) => (
                <Tag key={`tag${index}`} tag={tag} />
              ))}
            </div>
          </dl>
        </div>
      </Link>
    </li>
  );
}
