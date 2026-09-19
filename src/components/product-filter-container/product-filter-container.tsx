"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { CheckIcon } from "@/lib/icons";
import type { FilterSelections, MainCategory, SortOption } from "@/lib/schemas";
import { filterService, countSelectedSelections } from "@/lib/services/filter.service";
import { navigationService } from "@/lib/services/navigation.service";
import { FilterDrawer } from "@/components/filter-drawer";
import { DesktopFilterBar } from "@/components/desktop-filter-bar";
import { MobileFilterBar } from "@/components/mobile-filter-bar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface ProductFilterContainerProps {
  className?: string;
  initialFilters?: FilterSelections;
  initialSort?: string;
  initialAssuredOnly?: boolean;
}

function SortSheet({
  open,
  options,
  value,
  onOpenChange,
  onSelect,
}: {
  open: boolean;
  options: SortOption[];
  value: string;
  onOpenChange: (open: boolean) => void;
  onSelect: (value: string) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[70vh] gap-0 p-0">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="text-base font-bold">Sort By</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col overflow-y-auto pb-4">
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSelect(option.value);
                  onOpenChange(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left text-sm transition-colors outline-none hover:bg-muted focus-visible:bg-muted",
                  selected ? "font-semibold text-brand" : "font-normal",
                )}
              >
                <span>{option.label}</span>
                {selected ? (
                  <CheckIcon className="size-4 shrink-0 text-brand" />
                ) : null}
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function CategoriesSheet({
  open,
  categories,
  onOpenChange,
}: {
  open: boolean;
  categories: MainCategory[];
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[70vh] gap-0 p-0">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="text-base font-bold">All Categories</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col overflow-y-auto pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left text-sm transition-colors outline-none hover:bg-muted focus-visible:bg-muted"
            >
              <span>{category.name}</span>
              <span className="text-xs text-muted-foreground">
                {category.groups.length} categories
              </span>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ProductFilterContainer({
  className,
  initialFilters = {},
  initialSort = "relevance",
  initialAssuredOnly = false,
}: ProductFilterContainerProps) {
  const [selectedFilters, setSelectedFilters] = useState<FilterSelections>(initialFilters);
  const [currentSort, setCurrentSort] = useState(initialSort);
  const [sortLabel, setSortLabel] = useState(initialSort);
  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);
  const [categories, setCategories] = useState<MainCategory[]>([]);
  const [isAssuredOnly, setIsAssuredOnly] = useState(initialAssuredOnly);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | undefined>();
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      filterService.getSortOptions(),
      filterService.getSortLabel(initialSort),
      navigationService.getNavigation(),
    ])
      .then(([options, label, navCategories]) => {
        if (cancelled) return;
        setSortOptions(options);
        setSortLabel(label);
        setCategories(navCategories);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [initialSort]);

  function handleOpenFilterCategory(categoryKey: string) {
    const key = categoryKey || undefined;
    if (isDrawerOpen && activeCategory === key) {
      setIsDrawerOpen(false);
      setActiveCategory(undefined);
      return;
    }
    setActiveCategory(key);
    setIsDrawerOpen(true);
  }

  function handleOpenFilter() {
    setActiveCategory(undefined);
    setIsDrawerOpen(true);
  }

  function handleApply(filters: FilterSelections) {
    setSelectedFilters(filters);
  }

  function handleClearAll() {
    setSelectedFilters({});
  }

  function handleSortChange(value: string) {
    setCurrentSort(value);
    filterService.getSortLabel(value).then(setSortLabel).catch(() => {});
  }

  const appliedCount = countSelectedSelections(selectedFilters);

  return (
    <div className={cn("w-full", className)}>
      <DesktopFilterBar
        sortValue={currentSort}
        onSortChange={handleSortChange}
        isAssuredOnly={isAssuredOnly}
        onToggleAssured={setIsAssuredOnly}
        onOpenFilterCategory={handleOpenFilterCategory}
      />

      <MobileFilterBar
        appliedCount={appliedCount}
        currentSort={sortLabel}
        onOpenSort={() => setIsSortSheetOpen(true)}
        onOpenFilter={handleOpenFilter}
        onOpenCategories={() => setIsCategoriesOpen(true)}
      />

      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeCategory={activeCategory}
        selectedFilters={selectedFilters}
        onApply={handleApply}
        onClearAll={handleClearAll}
      />

      <SortSheet
        open={isSortSheetOpen}
        options={sortOptions}
        value={currentSort}
        onOpenChange={setIsSortSheetOpen}
        onSelect={handleSortChange}
      />

      <CategoriesSheet
        open={isCategoriesOpen}
        categories={categories}
        onOpenChange={setIsCategoriesOpen}
      />
    </div>
  );
}

export { ProductFilterContainer };
export type { ProductFilterContainerProps };