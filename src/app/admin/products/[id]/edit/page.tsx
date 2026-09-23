"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Plus01Icon, Trash01Icon } from "@hugeicons/core-free-icons";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Category, ProductDetailRow, VariantRow } from "@/lib/schemas";
import { PageHeader } from "../../../_components/page-header";
import { getItem, listItems, createOrUpdate } from "../../../_lib/crud";
import { AdminApiError } from "../../../_lib/api";
import { formatPrice } from "../../../_lib/format";
import { ProductForm } from "../../_components/product-form";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [product, setProduct] = useState<ProductDetailRow | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingVariantId, setDeletingVariantId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    Promise.all([
      getItem<ProductDetailRow>(`/products/${id}`),
      listItems<Category>("/categories", { limit: "100" }),
    ])
      .then(([item, list]) => {
        if (cancelled) return;
        setProduct(item);
        setCategories(list.items);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(
          err instanceof AdminApiError ? err.message : "Failed to load product"
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function reloadProduct() {
    if (!id) return;
    const item = await getItem<ProductDetailRow>(`/products/${id}`);
    setProduct(item);
  }

  async function handleDeleteVariant(variant: VariantRow) {
    setDeletingVariantId(variant.id);
    try {
      await createOrUpdate("/variants", {
        id: variant.id,
        isDeleted: true,
      });
      toast.success(`Deleted variant "${variant.name}"`);
      await reloadProduct();
    } catch (err) {
      toast.error(
        err instanceof AdminApiError ? err.message : "Delete failed"
      );
    } finally {
      setDeletingVariantId(null);
    }
  }

  return (
    <div className="grid max-w-2xl gap-6">
      <PageHeader
        title="Edit product"
        description="Update product details, categories, and variants."
      />
      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      {!loading && !error && (
        <>
          <ProductForm categories={categories} initial={product} />

          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle>Variants</CardTitle>
                <CardDescription>
                  Sizes, finishes, or color options under this product.
                </CardDescription>
              </div>
              <Button asChild size="icon" title="Add variant">
                <Link
                  href={`/admin/variants/new?productId=${product?.id}`}
                >
                  <HugeiconsIcon icon={Plus01Icon} strokeWidth={2} />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {product && product.variants.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No variants yet. Add one to offer size or finish options.
                </p>
              ) : (
                <ul className="divide-y">
                  {product?.variants.map((variant) => (
                    <li
                      key={variant.id}
                      className="flex items-center gap-3 py-2.5"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {variant.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(variant.price)} ·{" "}
                          {variant.isActive ? "Active" : "Inactive"}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" asChild title="Edit variant">
                        <Link href={`/admin/variants/${variant.id}/edit`}>
                          Variant details
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Delete variant"
                        disabled={deletingVariantId === variant.id}
                        onClick={() => void handleDeleteVariant(variant)}
                      >
                        <HugeiconsIcon icon={Trash01Icon} strokeWidth={2} />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}