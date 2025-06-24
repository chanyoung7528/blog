"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoryTagFilterProps {
  tags: string[];
  categoryId: string;
}

export const CategoryTagFilter = ({
  tags,
  categoryId,
}: CategoryTagFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    const currentTag = searchParams.get("tag");
    if (currentTag === tag) {
      router.push(`/category/${categoryId}`);
    } else {
      router.push(`/category/${categoryId}?tag=${tag}`);
    }
  };

  useEffect(() => {
    const tagQuery = searchParams.get("tag");
    if (tagQuery) {
      setActiveTag(tagQuery);
    } else {
      setActiveTag(null);
    }
  }, [searchParams]);

  return (
    <div className="mt-[3.28rem] flex flex-wrap justify-center gap-2">
      {tags.map((tag, i) => (
        <span
          key={i}
          onClick={() => handleTagClick(tag)}
          className={`tag-item cursor-pointer transition-colors duration-200 hover:bg-[#60a5fa] hover:text-white ${activeTag === tag ? "bg-[#60a5fa] text-white" : "text-[#60a5fa]"}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
