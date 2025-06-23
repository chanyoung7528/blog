import { useKBar } from "kbar";
import { useEffect, useState } from "react";

export default function KBarButton() {
  const { query } = useKBar();
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(window.navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  return (
    <div className="hidden items-center gap-2 md:flex">
      <button
        type="button"
        className={`
        bg-gray-100 hover:bg-gray-200 text-sm flex
        h-8 cursor-pointer items-center justify-between
        gap-2 whitespace-nowrap rounded-md bg-gray-4
        px-2
        font-sans transition-colors duration-150
        ease-in-out dark:bg-[#2a2a2a] dark:text-white
        dark:hover:bg-[#3a3a3a] sm:h-[32px] sm:px-3
      `}
        onClick={query?.toggle}
      >
        <span className="hidden sm:inline">Search documentation...</span>
        <kbd
          className={`
          text-gray-500 dark:text-gray-400 dark:border-gray-700 text-pointer-events-none
          font-mono inline-flex select-none items-center gap-1 rounded border
          bg-white px-1.5
          py-0.5 shadow-sm dark:bg-[#111]
        `}
        >
          {isMac ? "⌘" : "Ctrl"} K
        </kbd>
      </button>
    </div>
  );
}
