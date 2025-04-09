import { cn } from "@/lib/utils";
import { useKBar } from "kbar";

export default function KBarButton() {
  const { query } = useKBar();

  return (
    <div className="flex items-center gap-2">
      <button
        className={cn(
          "flex cursor-pointer items-center rounded-lg p-1 text-xs",
          "bg-secondary hover:bg-tertiary transition-colors",
          "search__button bg-[#1a1a1a] dark:bg-[#ececec]",
          "transition-all hover:-translate-y-1 hover:bg-neutral-50 hover:ring-4 hover:ring-amber-200 active:bg-neutral-100 dark:ring-gray-700",
        )}
        onClick={query?.toggle}
      >
        <i className="ri-search-2-line search__icon text-[#ececec] dark:text-[#1a1a1a]"></i>
      </button>

      <div
        className={cn(
          "maxSm:hidden",
          "ml-auto rounded-lg px-2 py-1",
          "bg-primary border transition-colors dark:border-neutral-700",
          "dark:bg-[#ececec]",
        )}
      >
        ⌘ K
      </div>
    </div>
  );
}
