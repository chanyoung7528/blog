import React from "react";
import Image from "next/image";

export type CateogryInfoType = {
  name: string;
  value: string;
  src: string;
};

type BadgeType = {
  category: CateogryInfoType;
  index?: number;
  isSubName?: boolean;
};

export function Badge({ category, index, isSubName = true }: BadgeType) {
  return (
    <div key={index || 0} className="group relative flex">
      <div className="badgebox duration-250 hover:translate-z-0 relative h-14 w-14 cursor-pointer overflow-hidden rounded-full border-2 border-white bg-white opacity-100 shadow-md transition-transform hover:scale-[1.2] md:h-16 md:w-16">
        <Image
          src={category.src}
          alt={category.value}
          fill
          className="overflow-hidden object-cover"
          sizes="(max-width: 768px) 56px, 64px"
        />
      </div>

      {isSubName && (
        <span
          className="bg-gray-800 text-gray-100 tool-tip text-sm absolute left-1/2 top-[30px] m-4 mx-auto -translate-x-1/2 
    translate-y-full rounded-md px-1 opacity-0 transition-opacity group-hover:opacity-100"
        >
          {category.name}
        </span>
      )}
    </div>
  );
}
