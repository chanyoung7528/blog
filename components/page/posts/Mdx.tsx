"use client";
import "@/styles/mdx.css";
import { cn } from "@/lib/utils";
import { useMDXComponent } from "next-contentlayer/hooks";
import { useEffect } from "react";
import mediumZoom from "medium-zoom";

const components = {
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr aria-orientation="horizontal" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
};

export function Mdx({ code, ...props }: { code: string }) {
  const MDXContent = useMDXComponent(code);

  useEffect(() => {
    const zoom = mediumZoom(".mdx img", {
      background: "var(--bg)",
    });

    return () => {
      zoom.detach();
    };
  }, []);

  return (
    <article className="mdx" {...props}>
      <MDXContent components={components} />
    </article>
  );
}
