"use client";

import type { ComponentType } from "react";

import { cn } from "@/lib/utils";

export type RoomCategory = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

type CategoryTabsProps = {
  categories: RoomCategory[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
};

function CategoryTabs({
  categories,
  activeId,
  onSelect,
  className,
}: CategoryTabsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-around gap-2 sm:gap-3",
        className,
      )}
    >
      {categories.map((category) => {
        const isActive = category.id === activeId;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={cn(
              "relative flex flex-col items-center justify-between gap-2 px-4 py-2 text-sm",
              isActive
                ?  "font-semibold text-brand"
                : "font-medium text-muted-foreground hover:text-foreground",
            )}
          >
            <category.icon className="size-8" />
            <span>{category.label}</span>
            {isActive ? (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export { CategoryTabs };
