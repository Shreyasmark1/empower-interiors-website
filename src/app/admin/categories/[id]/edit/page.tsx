"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Category } from "@/lib/schemas";
import { PageHeader } from "../../../_components/page-header";
import { getItem, listItems } from "../../../_lib/crud";
import { AdminApiError } from "../../../_lib/api";
import { CategoryForm } from "../../_components/category-form";

export default function EditCategoryPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    Promise.all([
      getItem<Category>(`/categories/${id}`),
      listItems<Category>("/categories", { limit: "100" }),
    ])
      .then(([item, list]) => {
        if (cancelled) return;
        setCategory(item);
        setCategories(list.items);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(
          err instanceof AdminApiError ? err.message : "Failed to load category"
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="grid max-w-2xl gap-6">
      <PageHeader title="Edit category" description="Update category details." />
      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      {!loading && !error && (
        <CategoryForm categories={categories} initial={category} />
      )}
    </div>
  );
}