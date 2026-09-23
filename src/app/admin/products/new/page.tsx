"use client"

import { useEffect, useState } from "react";
import type { Category } from "@/lib/schemas";
import { PageHeader } from "../../_components/page-header";
import { listItems } from "../../_lib/crud";
import { AdminApiError } from "../../_lib/api";
import { ProductForm } from "../_components/product-form";

export default function NewProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    listItems<Category>("/categories", { limit: "100" })
      .then((data) => {
        if (!cancelled) setCategories(data.items);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof AdminApiError
              ? err.message
              : "Failed to load categories"
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="grid max-w-2xl gap-6">
      <PageHeader
        title="New product"
        description="Create a new catalogue product."
      />
      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      <ProductForm categories={categories} />
    </div>
  );
}