"use client";

import { rootUrl } from "@/lib/utils";

const nav: { title: string; location: string }[] = [
  { title: "Home", location: rootUrl() },
  // { title: 'About', location: `${rootUrl()}/about` },
  { title: "Tag", location: `${rootUrl()}/tag` },
  { title: "Archives", location: `${rootUrl()}/archives` },
];

interface NavProps {
  type: "toggle" | "normal";
  onClick?: (location: string) => void;
}

export default function Navbar({ type, onClick }: NavProps) {
  const defaultStyleString =
    "dark:text-white dark:hover:text-green-500 text-center transition duration-250 hover:scale-125 hover:text-green-500 cursor-pointer";
  return (
    <>
      {nav.map((item) => {
        const { title, location } = item;
        return (
          <div
            style={{ fontFamily: "Tmon", fontSize: "1.3rem" }}
            onClick={() => onClick && onClick(location)}
            key={title}
            className={
              type === "normal"
                ? defaultStyleString
                : defaultStyleString + " py-4 text-lg"
            }
          >
            {title}
          </div>
        );
      })}
    </>
  );
}
