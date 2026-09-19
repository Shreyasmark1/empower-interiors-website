"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, FilterIcon, GridIcon, SortIcon } from "@/lib/icons";

interface MobileFilterBarProps {
  appliedCount: number;
  currentSort: string;
  onOpenSort: () => void;
  onOpenFilter: () => void;
  onOpenCategories?: () => void;
}

function MobileFilterBar({
  appliedCount,
  currentSort,
  onOpenSort,
  onOpenFilter,
  onOpenCategories,
}: MobileFilterBarProps) {
  const filterLabel =
    appliedCount === 1 ? "1 Filter Applied" : `${appliedCount} Filters Applied`;

  return (
    <div className="flex border-b border-border bg-megamenu-bg md:hidden">
      <div className="grid w-full grid-cols-3 divide-x divide-border">
        <button
          type="button"
          onClick={onOpenCategories}
          className="flex min-w-0 flex-col items-center justify-center gap-1 px-2 py-2.5 text-foreground transition-colors outline-none hover:text-brand focus-visible:inset-ring-2 focus-visible:inset-ring-brand/30"
        >
          <span className="flex items-center gap-1">
            <GridIcon className="size-4" />
            <ChevronDownIcon className="size-3" />
          </span>
          <span className="text-[11px] font-medium">Categories</span>
        </button>

        <button
          type="button"
          onClick={onOpenSort}
          className="flex min-w-0 flex-col items-center justify-center gap-1 px-2 py-2.5 text-foreground transition-colors outline-none hover:text-brand focus-visible:inset-ring-2 focus-visible:inset-ring-brand/30"
        >
          <SortIcon className="size-4" />
          <span className="max-w-full truncate text-[11px] font-medium">
            {currentSort}
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenFilter}
          className="flex min-w-0 flex-col items-center justify-center gap-1 px-2 py-2.5 text-foreground transition-colors outline-none hover:text-brand focus-visible:inset-ring-2 focus-visible:inset-ring-brand/30"
        >
          <FilterIcon className="size-4" />
          <span className={cn("max-w-full truncate text-[11px] font-medium", appliedCount > 0 && "text-brand")}>
            {filterLabel}
          </span>
        </button>
      </div>
    </div>
  );
}

export { MobileFilterBar };
export type { MobileFilterBarProps };