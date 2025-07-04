"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowTopIcon } from "@/components/ui/icons/arrow-icon";
import throttle from "lodash.throttle";

export default function FloatScrollTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = throttle(() => {
      setShow(window.scrollY > window.innerHeight);
    }, 300);

    onScroll();
    window.addEventListener("scroll", onScroll, { capture: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, []);

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: "auto" });
  };

  return (
    <div
      className={cn(
        "fixed bottom-3 right-3 z-10 transition-opacity",
        !show && "pointer-events-none opacity-0",
      )}
    >
      <button
        onClick={scrollToTop}
        className="text-gray-9 hover:bg-gray-3 active:text-gray-11 rounded-full p-2 transition"
      >
        <ArrowTopIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
