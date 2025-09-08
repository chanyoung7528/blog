import { Tag } from "@/components/ui/Tag";
import styles from "@/styles/layout/main.module.css";
import { allWritings } from "contentlayer/generated";
import Link from "next/link";

const MainSection = () => {
  const uniqueTags = [
    ...new Set(
      allWritings
        .map((writing) => writing.tags || [])
        .flat()
        .filter(Boolean),
    ),
  ];

  // 태그와 카테고리 매핑 생성
  const tagCategoryMap = allWritings.reduce((map, writing) => {
    if (Array.isArray(writing.tags)) {
      writing.tags.forEach((tag) => {
        if (tag && !map.has(tag)) {
          map.set(tag, writing.category);
        }
      });
    }
    return map;
  }, new Map<string, string>());

  return (
    <main
      id="target-section"
      className={`${styles.main} mx-auto my-12 min-h-[calc(100vh-200px)] max-w-[1280px]`}
    >
      <article>
        <div className="flex flex-col items-center gap-[3rem]">
          <h1 className="text-[3.43rem] font-bold leading-none">Tags</h1>
          <h2 className="text-[1.29rem]">
            모든 글들을 태그로 쉽게 찾아볼 수 있습니다.
          </h2>
        </div>
        <div className="mt-[3.28rem] flex flex-wrap gap-2">
          <ul className="flex flex-wrap gap-[1rem]">
            {uniqueTags.map((tag) => {
              const category = tagCategoryMap.get(tag);

              return (
                <li key={tag}>
                  <Link href={`/category/${category}?tag=${tag}`}>
                    <Tag tag={tag} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </main>
  );
};

export default MainSection;
