"use client";

import { useEffect, useState } from "react";

import type { FilterGroup, SortOption } from "@/lib/schemas";
import { filterService } from "@/lib/services/filter.service";
import { Container } from "@/components/ui/container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface DesktopFilterBarProps {
  onOpenFilterCategory: (categoryKey: string) => void;
  sortValue: string;
  onSortChange: (value: string) => void;
  isAssuredOnly: boolean;
  onToggleAssured: (enabled: boolean) => void;
}

function DesktopFilterBar({
  onOpenFilterCategory,
  sortValue,
  onSortChange,
  isAssuredOnly,
  onToggleAssured,
}: DesktopFilterBarProps) {
  const [groups, setGroups] = useState<FilterGroup[]>([]);
  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      filterService.getFilterGroups(),
      filterService.getSortOptions(),
    ])
      .then(([filterGroups, options]) => {
        if (cancelled) return;
        setGroups(filterGroups);
        setSortOptions(options);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="hidden border-b border-border bg-accent md:block">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="text-sm font-semibold text-foreground">
            Filter By
          </span>

          {groups.map((group) => (
            <button
              key={group.key}
              type="button"
              onClick={() => onOpenFilterCategory(group.key)}
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-border bg-white px-3.5 text-[13px] font-medium text-foreground transition-colors outline-none hover:border-brand hover:text-brand focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/30"
            >
              {group.label}
            </button>
          ))}

          <label className="flex shrink-0 cursor-pointer items-center gap-2">
            <Switch
              checked={isAssuredOnly}
              onCheckedChange={onToggleAssured}
              aria-label="Assured only"
            />
            <span className="text-[13px] font-medium text-foreground">
              Assured
            </span>
          </label>

          <button
            type="button"
            onClick={() => onOpenFilterCategory("")}
            className="inline-flex h-8 shrink-0 items-center gap-1 rounded-md bg-transparent px-1.5 text-[13px] font-semibold text-brand transition-colors outline-none hover:text-brand-hover focus-visible:ring-3 focus-visible:ring-brand/30"
          >
            More Filters
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="text-sm font-semibold text-foreground">Sort By</span>
          <Select value={sortValue} onValueChange={onSortChange}>
            <SelectTrigger
              aria-label="Sort by"
              className="h-8 min-w-[180px] border-border bg-white"
            >
              <SelectValue placeholder="Relevance" />
            </SelectTrigger>
            <SelectContent align="end">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Container>
    </div>
  );
}

export { DesktopFilterBar };
export type { DesktopFilterBarProps };
