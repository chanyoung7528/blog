"use client";

// { title: 'About', location: `/about` },
const nav: { title: string; location: string }[] = [
  { title: "Tags", location: "/tags" },
  // { title: "Archives", location: "/archives" },
];

interface NavProps {
  type: "toggle" | "normal";
  onClick?: (location: string) => void;
}

export default function Navbar({ type, onClick }: NavProps) {
  const defaultStyleString =
    "dark:text-white dark:hover:text-green-500 text-center transition duration-250 hover:scale-125 hover:text-green-500 cursor-pointer";
  return (
    <div className="flex flex-1 flex-col items-center sm:flex-row">
      <h1
        className={
          type === "normal"
            ? defaultStyleString
            : defaultStyleString + " text-lg py-4"
        }
        onClick={() => onClick && onClick("/")}
      >
        Chans tech
      </h1>

      <div className="flex flex-1 items-center justify-end gap-[1rem]">
        {nav.map((item) => {
          const { title, location } = item;
          return (
            <h1
              onClick={() => onClick && onClick(location)}
              key={title}
              className={
                type === "normal"
                  ? defaultStyleString
                  : defaultStyleString + " text-lg py-4"
              }
            >
              {title}
            </h1>
          );
        })}
      </div>
    </div>
  );
}
