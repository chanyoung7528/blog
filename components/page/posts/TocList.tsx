"use client";

import { TOCSection } from "@/lib/mdx";

export default function TocList({ toc }: { toc: TOCSection[] }) {
  console.log("toc", toc);
  return (
    <ul className="sticky left-0 top-[50px] max-h-[calc(100vh-100px)] overflow-y-auto px-5 pb-[50px]">
      {toc.map((item, index) => (
        <li key={index}>
          <button className="block w-full rounded-lg p-[5px_8px] text-left leading-[22px] text-[#545b63]">
            {`${index + 1}. `}
            {item.text}
          </button>
          {item.subSections.length > 0 && (
            <ul>
              {item.subSections.map((subItem, subIndex) => (
                <li
                  key={subIndex}
                  className="ml-5 border-l-[3px] border-[#dddddf] pl-[17px]"
                >
                  <button className="block w-full rounded-lg p-[5px_8px] text-left leading-[22px] text-[#545b63]">
                    {subItem.text}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
