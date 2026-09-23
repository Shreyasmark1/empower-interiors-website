"use client"

import { useEffect, useState } from "react";
import type { Category, ProductRow, PromotionRow } from "@/lib/schemas";
import { PageHeader } from "../../_components/page-header";
import { listItems } from "../../_lib/crud";
import { AdminApiError } from "../../_lib/api";
import { PromotionTargetForm } from "../_components/promotion-target-form";

export default function NewPromotionTargetPage() {
  const [promotions, setPromotions] = useState<PromotionRow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      listItems<PromotionRow>("/promotions", { limit: "100" }),
      listItems<Category>("/categories", { limit: "100" }),
      listItems<ProductRow>("/products", { limit: "100" }),
    ])
      .then(([promotionList, categoryList, productList]) => {
        if (cancelled) return;
        setPromotions(promotionList.items);
        setCategories(categoryList.items);
        setProducts(productList.items);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof AdminApiError
              ? err.message
              : "Failed to load data"
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="grid max-w-[42rem] gap-6">
      <PageHeader
        title="New target"
        description="Point a promotion at a category, product, or the homepage."
      />
      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      {(promotions.length > 0 || error) && (
        <PromotionTargetForm
          promotions={promotions}
          categories={categories}
          products={products}
        />
      )}
    </div>
  );
}