"use client";

import { Tag } from "@/components/ui/Tag";
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
        <Tag
          key={i}
          tag={tag}
          onClick={handleTagClick}
          isActive={activeTag === tag}
        />
      ))}
    </div>
  );
};
