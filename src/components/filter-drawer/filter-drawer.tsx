"use client";

import { useEffect, useMemo, useState } from "react";

import type { FilterGroup, FilterSelections } from "@/lib/schemas";
import { filterService } from "@/lib/services/filter.service";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchInput } from "@/components/ui/search-input";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory?: string;
  selectedFilters: Record<string, string[]>;
  onApply: (filters: Record<string, string[]>) => void;
  onClearAll: () => void;
}

function FilterOptionRow({
  option,
  checked,
  onToggle,
}: {
  option: FilterGroup["options"][number];
  checked: boolean;
  onToggle: (checked: boolean) => void;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-md py-2 pr-2 transition-colors hover:bg-muted">
      <Checkbox
        checked={checked}
        onCheckedChange={(next) => onToggle(Boolean(next))}
        className="shrink-0"
      />
      {option.swatch ? (
        <span
          aria-hidden
          className="size-4 shrink-0 rounded-full border border-black/10"
          style={{ backgroundColor: option.swatch }}
        />
      ) : null}
      <span className="flex-1 truncate text-sm text-foreground group-hover:text-brand">
        {option.label}
      </span>
      <span className="shrink-0 text-xs text-muted-foreground">
        ({option.count})
      </span>
    </label>
  );
}

function FilterDrawerBody({
  groups,
  initialSelections,
  activeCategory,
  onApply,
  onClearAll,
}: {
  groups: FilterGroup[];
  initialSelections: FilterSelections;
  activeCategory?: string;
  onApply: (filters: Record<string, string[]>) => void;
  onClearAll: () => void;
}) {
  const [draft, setDraft] = useState<FilterSelections>(initialSelections);
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});
  const [accordionValue, setAccordionValue] = useState<string[]>(
    activeCategory ? [activeCategory] : groups.map((group) => group.key),
  );

  function toggleOption(groupKey: string, value: string, checked: boolean) {
    setDraft((prev) => {
      const current = prev[groupKey] ?? [];
      const next = checked
        ? Array.from(new Set([...current, value]))
        : current.filter((item) => item !== value);
      return next.length > 0 ? { ...prev, [groupKey]: next } : { ...prev, [groupKey]: [] };
    });
  }

  const visibleOptions = useMemo(() => {
    return (group: FilterGroup) => {
      const query = (searchQueries[group.key] ?? "").trim().toLowerCase();
      if (!query) return group.options;
      return group.options.filter((option) =>
        option.label.toLowerCase().includes(query),
      );
    };
  }, [searchQueries]);

  function handleClearAll() {
    setDraft({});
    onClearAll();
  }

  function handleApply() {
    onApply(draft);
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-3 pb-6">
        {groups.length === 0 ? (
          <p className="px-3 py-6 text-sm text-muted-foreground">
            Loading filters…
          </p>
        ) : (
          <Accordion
            type="multiple"
            value={accordionValue}
            onValueChange={setAccordionValue}
            className="w-full"
          >
            {groups.map((group) => {
              const options = visibleOptions(group);
              const selected = draft[group.key] ?? [];

              return (
                <AccordionItem key={group.key} value={group.key}>
                  <AccordionTrigger className="px-3 font-semibold">
                    <span className="flex w-full items-center justify-between gap-2">
                      <span>{group.label}</span>
                      {selected.length > 0 ? (
                        <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand">
                          {selected.length}
                        </span>
                      ) : null}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {group.searchable ? (
                      <div className="px-3 pb-2">
                        <SearchInput
                          placeholder={`Search ${group.label.toLowerCase()}`}
                          value={searchQueries[group.key] ?? ""}
                          onChange={(event) =>
                            setSearchQueries((prev) => ({
                              ...prev,
                              [group.key]: event.target.value,
                            }))
                          }
                          className="mb-1 rounded-md border border-input"
                        />
                      </div>
                    ) : null}
                    {options.length > 0 ? (
                      <div className="px-3">
                        {options.map((option) => (
                          <FilterOptionRow
                            key={option.value}
                            option={option}
                            checked={selected.includes(option.value)}
                            onToggle={(checked) =>
                              toggleOption(group.key, option.value, checked)
                            }
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="px-3 py-2 text-sm text-muted-foreground">
                        No options match “{searchQueries[group.key]?.trim()}”.
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>

      <SheetFooter className="flex-row items-center gap-3 border-t border-border px-5 py-4 shadow-[0_-2px_12px_rgba(87,0,84,0.08)]">
        <Button variant="outline" className="flex-1" onClick={handleClearAll}>
          Clear All
        </Button>
        <Button variant="default" className="flex-1" onClick={handleApply}>
          Apply
        </Button>
      </SheetFooter>
    </>
  );
}

function FilterDrawer({
  isOpen,
  onClose,
  activeCategory,
  selectedFilters,
  onApply,
  onClearAll,
}: FilterDrawerProps) {
  const [groups, setGroups] = useState<FilterGroup[]>([]);

  useEffect(() => {
    let cancelled = false;
    filterService
      .getFilterGroups()
      .then((data) => {
        if (!cancelled) setGroups(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? undefined : onClose())}>
      <SheetContent
          side="left"
          showCloseButton
          className="flex h-full w-full max-w-[20rem] flex-col gap-0 bg-white p-0 shadow-2xl sm:max-w-[28rem]"
        >
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="text-base font-bold">Apply Filters</SheetTitle>
        </SheetHeader>

        <FilterDrawerBody
          key={activeCategory ?? ""}
          groups={groups}
          initialSelections={selectedFilters}
          activeCategory={activeCategory}
          onApply={onApply}
          onClearAll={onClearAll}
        />
      </SheetContent>
    </Sheet>
  );
}

export { FilterDrawer };
export type { FilterDrawerProps };