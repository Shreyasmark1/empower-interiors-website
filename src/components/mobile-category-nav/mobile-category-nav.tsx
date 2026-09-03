"use client";

import { useEffect, useState } from "react";

import { CategoryTabBar } from "./category-tab-bar";
import { SubcategoryScrollRow } from "./subcategory-scroll-row";
import type { MainCategory } from "@/lib/schemas/navigation";

function MobileCategoryNav() {
  const [categories, setCategories] = useState<MainCategory[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/navigation")
      .then((r) => r.json())
      .then((data: MainCategory[]) => {
        if (!cancelled) {
          setCategories(data);
          if (data.length > 0) setActiveTabId(data[0].id);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const activeCategory = categories.find((c) => c.id === activeTabId);

  if (categories.length === 0) return null;

  return (
    <div className="w-full md:hidden">
      <CategoryTabBar
        categories={categories}
        activeId={activeTabId}
        onSelect={setActiveTabId}
      />

      {activeCategory ? (
        <SubcategoryScrollRow
          key={activeCategory.id}
          groups={activeCategory.groups}
          categorySlug={activeCategory.slug}
        />
      ) : null}
    </div>
  );
}

export { MobileCategoryNav };
