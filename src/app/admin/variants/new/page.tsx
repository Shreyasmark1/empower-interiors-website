"use client"

import { useEffect, useState } from "react";
import type { ProductRow } from "@/lib/schemas";
import { PageHeader } from "../../_components/page-header";
import { listItems } from "../../_lib/crud";
import { AdminApiError } from "../../_lib/api";
import { VariantForm } from "../_components/variant-form";

export default function NewVariantPage() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [defaultProductId, setDefaultProductId] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    listItems<ProductRow>("/products", { limit: "100" })
      .then((data) => {
        if (!cancelled) setProducts(data.items);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof AdminApiError ? err.message : "Failed to load products"
          );
        }
      });

    const search = new URLSearchParams(window.location.search);
    const productId = search.get("productId");
    if (productId) {
      setDefaultProductId(productId);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="grid max-w-2xl gap-6">
      <PageHeader
        title="New variant"
        description="Add a size, finish, or color option to a product."
      />
      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      {(products.length > 0 || error) && (
        <VariantForm
          products={products}
          defaultProductId={defaultProductId ?? undefined}
        />
      )}
    </div>
  );
}