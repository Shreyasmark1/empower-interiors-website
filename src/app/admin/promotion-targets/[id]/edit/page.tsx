"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type {
  Category,
  ProductRow,
  PromotionRow,
  PromotionTargetRow,
} from "@/lib/schemas";
import { PageHeader } from "../../../_components/page-header";
import { listItems } from "../../../_lib/crud";
import { AdminApiError } from "../../../_lib/api";
import { PromotionTargetForm } from "../../_components/promotion-target-form";

export default function EditPromotionTargetPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [promotions, setPromotions] = useState<PromotionRow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [target, setTarget] = useState<PromotionTargetRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    Promise.all([
      listItems<PromotionTargetRow>("/promotion-targets", { limit: "100" }),
      listItems<PromotionRow>("/promotions", { limit: "100" }),
      listItems<Category>("/categories", { limit: "100" }),
      listItems<ProductRow>("/products", { limit: "100" }),
    ])
      .then(([targetList, promotionList, categoryList, productList]) => {
        if (cancelled) return;
        const found = targetList.items.find(
          (item) => item.id === Number(id)
        );
        setTarget(found ?? null);
        setPromotions(promotionList.items);
        setCategories(categoryList.items);
        setProducts(productList.items);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(
          err instanceof AdminApiError ? err.message : "Failed to load target"
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
    <div className="grid max-w-[42rem] gap-6">
      <PageHeader
        title="Edit target"
        description="Update where this promotion is shown."
      />
      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      {!loading && !error && !target && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Target not found.
        </p>
      )}
      {!loading && !error && target && (
        <PromotionTargetForm
          promotions={promotions}
          categories={categories}
          products={products}
          initial={target}
        />
      )}
    </div>
  );
}