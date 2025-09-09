"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalPrefetch() {
  const router = useRouter();

  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll("a[href^='/']"));
    const prefetched = new Set<string>();
    console.log("anchors", anchors);
    // Prefetch 함수
    const prefetchLink = (href: string) => {
      if (prefetched.has(href)) return;
      try {
        // router.prefetch는 Promise를 반환하지 않으므로 catch를 사용할 수 없음
        router.prefetch(href);
      } catch (e) {
        console.error(e);
      }
      prefetched.add(href);
    };

    // IntersectionObserver 설정
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const href = (entry.target as HTMLAnchorElement).getAttribute(
              "href",
            );
            if (href) prefetchLink(href);
            observer.unobserve(entry.target); // 한 번 프리패치 후 관찰 해제
          }
        });
      },
      { rootMargin: "200px" }, // 뷰포트 + 200px 영역에서 미리 prefetch
    );

    anchors.forEach((anchor) => observer.observe(anchor));

    return () => observer.disconnect();
  }, [router]);

  return null;
}
