"use client";

import { TOCSection } from "@/lib/mdx";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import throttle from "lodash.throttle";

const useTocScroll = (tableOfContents: TOCSection[]) => {
  const [currentSectionSlug, setCurrentSectionSlug] = useState<string>();

  useEffect(() => {
    if (tableOfContents.length === 0) return;

    let headings: { id: string; top: number }[];
    let pageTop = 0;

    const onResize = () => {
      headings = Array.from(
        document.querySelectorAll<HTMLElement>(".mdx h2"),
      ).map((element) => ({
        id: element.id,
        top: element.offsetTop,
      }));

      pageTop = parseFloat(
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--page-top")
          .match(/[\d.]+/)?.[0] ?? "0",
      );
    };

    const onScroll = throttle(() => {
      if (!headings) return;

      let current: typeof currentSectionSlug = undefined;
      const top = window.scrollY + pageTop;

      for (let i = 0; i < headings.length; i++) {
        if (top >= headings[i].top) {
          current = headings[i].id;
        }
      }
      setCurrentSectionSlug(current);
    }, 300);

    onResize();
    onScroll();
    window.addEventListener("scroll", onScroll, { capture: true });
    window.addEventListener("resize", onResize, { capture: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onResize, { capture: true });
    };
  }, [tableOfContents]);

  return { currentSectionSlug };
};

export default function TocList({ toc }: { toc: TOCSection[] }) {
  const { currentSectionSlug } = useTocScroll(toc);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = document.querySelector("header")?.offsetHeight ?? 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset - 10;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <ul className="sticky left-0 top-[60px] max-h-[calc(100vh-100px)] overflow-y-auto px-5 pb-[50px]">
      {toc.map((item, index) => (
        <li key={index}>
          <button
            onClick={() => scrollToSection(item.slug)}
            className={cn(
              "block w-full rounded-lg p-[5px_8px] text-left leading-[22px]",
              currentSectionSlug === item.slug
                ? "bg-gray-100 text-gray-900"
                : "text-[#545b63]",
            )}
          >
            {`${index + 1}. `}
            {item.text}
          </button>
          {item.subSections.length > 0 && (
            <ul>
              {item.subSections.map((subItem, subIndex) => (
                <li
                  key={subIndex}
                  className="ml-5 border-l-[3px] border-[#dddddf] pl-[10px]"
                >
                  <button
                    onClick={() => scrollToSection(subItem.slug)}
                    className={cn(
                      "block w-full rounded-lg p-[5px_8px] text-left leading-[22px]",
                      currentSectionSlug === item.slug
                        ? "bg-gray-100 text-gray-900"
                        : "text-[#545b63]",
                    )}
                  >
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
