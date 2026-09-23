"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, TrashIcon } from "@hugeicons/core-free-icons";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  Category,
  ProductRow,
  PromotionDetailRow,
  PromotionTargetRow,
} from "@/lib/schemas";
import { PageHeader } from "../../../_components/page-header";
import { getItem, listItems, createOrUpdate } from "../../../_lib/crud";
import { AdminApiError } from "../../../_lib/api";
import { PromotionForm } from "../../_components/promotion-form";

const targetTypeLabels: Record<PromotionTargetRow["targetType"], string> = {
  homepage: "Homepage",
  category: "Category",
  product: "Product",
};

const placementLabels: Record<PromotionTargetRow["placement"], string> = {
  hero: "Hero",
  banner: "Banner",
  section: "Section",
};

export default function EditPromotionPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [promotion, setPromotion] = useState<PromotionDetailRow | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingTargetId, setDeletingTargetId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    Promise.all([
      getItem<PromotionDetailRow>(`/promotions/${id}`),
      listItems<Category>("/categories", { limit: "100" }),
      listItems<ProductRow>("/products", { limit: "100" }),
    ])
      .then(([item, categoryList, productList]) => {
        if (cancelled) return;
        setPromotion(item);
        setCategories(categoryList.items);
        setProducts(productList.items);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(
          err instanceof AdminApiError
            ? err.message
            : "Failed to load promotion"
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function reloadPromotion() {
    if (!id) return;
    const item = await getItem<PromotionDetailRow>(`/promotions/${id}`);
    setPromotion(item);
  }

  async function handleDeleteTarget(target: PromotionTargetRow) {
    setDeletingTargetId(target.id);
    try {
      await createOrUpdate("/promotion-targets", {
        id: target.id,
        isDeleted: true,
      });
      toast.success("Target removed");
      await reloadPromotion();
    } catch (err) {
      toast.error(
        err instanceof AdminApiError ? err.message : "Delete failed"
      );
    } finally {
      setDeletingTargetId(null);
    }
  }

  const categoryNameById = new Map(
    categories.map((category) => [category.id, category.name])
  );
  const productNameById = new Map(
    products.map((product) => [product.id, product.name])
  );

  function targetLabel(target: PromotionTargetRow): string {
    if (target.targetType === "category") {
      return target.categoryId === null
        ? "—"
        : (categoryNameById.get(target.categoryId) ?? "—");
    }
    if (target.targetType === "product") {
      return target.productId === null
        ? "—"
        : (productNameById.get(target.productId) ?? "—");
    }
    return "Whole homepage";
  }

  return (
    <div className="grid max-w-[42rem] gap-6">
      <PageHeader
        title="Edit promotion"
        description="Update promotion details and its targets."
      />
      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      {!loading && !error && (
        <>
          <PromotionForm initial={promotion} />

          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle>Targets</CardTitle>
                <CardDescription>
                  Where this promotion is shown: categories, products, or the
                  homepage.
                </CardDescription>
              </div>
              <Button asChild size="icon" title="Add target">
                <Link
                  href={`/admin/promotion-targets/new?promotionId=${promotion?.id}`}
                >
                  <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {promotion && promotion.targets.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No targets yet. Add one to point this promotion at a category
                  or product.
                </p>
              ) : (
                <ul className="divide-y">
                  {promotion?.targets.map((target) => (
                    <li
                      key={target.id}
                      className="flex items-center gap-3 py-2.5"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {targetTypeLabels[target.targetType]} ·{" "}
                          {targetLabel(target)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {placementLabels[target.placement]} · sort{" "}
                          {target.sortOrder}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" asChild title="Edit target">
                        <Link href={`/admin/promotion-targets/${target.id}/edit`}>
                          Target
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Delete target"
                        disabled={deletingTargetId === target.id}
                        onClick={() => void handleDeleteTarget(target)}
                      >
                        <HugeiconsIcon icon={TrashIcon} strokeWidth={2} />
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