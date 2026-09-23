"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { ProductRow, VariantRow } from "@/lib/schemas";
import { PageHeader } from "../../../_components/page-header";
import { getItem, listItems } from "../../../_lib/crud";
import { AdminApiError } from "../../../_lib/api";
import { VariantForm } from "../../_components/variant-form";

export default function EditVariantPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [variant, setVariant] = useState<VariantRow | null>(null);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    Promise.all([
      getItem<VariantRow>(`/variants/${id}`),
      listItems<ProductRow>("/products", { limit: "100" }),
    ])
      .then(([item, list]) => {
        if (cancelled) return;
        setVariant(item);
        setProducts(list.items);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(
          err instanceof AdminApiError ? err.message : "Failed to load variant"
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
      <PageHeader title="Edit variant" description="Update variant details." />
      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      {!loading && !error && (
        <VariantForm products={products} initial={variant} />
      )}
    </div>
  );
}