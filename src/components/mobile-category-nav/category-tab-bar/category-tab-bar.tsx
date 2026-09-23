"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import type { MainCategory } from "@/lib/schemas/navigation";

type CategoryTabBarProps = {
  categories: MainCategory[];
  activeId: string;
  onSelect: (id: string) => void;
};

function CategoryTabBar({ categories, activeId, onSelect }: CategoryTabBarProps) {
  const activeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const tab = activeRef.current;
      const left = tab.offsetLeft - container.clientWidth / 2 + tab.clientWidth / 2;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [activeId]);

  return (
    <div
      ref={scrollRef}
      className="flex items-center overflow-x-auto whitespace-nowrap scrollbar-none border-b border-border px-4 py-2 gap-6"
    >
      {categories.map((cat) => {
        const isActive = cat.id === activeId;
        return (
          <button
            key={cat.id}
            ref={isActive ? activeRef : undefined}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={cn(
              "relative shrink-0 text-sm transition-colors",
              isActive
                ? "font-semibold text-brand-magenta"
                : "font-medium text-muted-foreground",
            )}
          >
            {cat.name}
            {isActive ? (
              <span className="absolute inset-x-0 -bottom-[9px] h-0.5 bg-brand-magenta" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export { CategoryTabBar };
