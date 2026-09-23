"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import type { LegacyColumnDef } from "@tanstack/react-table/legacy";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  Category,
  ProductRow,
  PromotionRow,
  PromotionTargetRow,
} from "@/lib/schemas";
import { DataTable } from "../_components/data-table";
import { PageHeader } from "../_components/page-header";
import { listItems, createOrUpdate } from "../_lib/crud";
import { AdminApiError } from "../_lib/api";

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

export default function PromotionTargetsPage() {
  const [promotions, setPromotions] = useState<PromotionRow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [promotionFilter, setPromotionFilter] = useState("");
  const [targets, setTargets] = useState<PromotionTargetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<PromotionTargetRow | null>(
    null
  );
  const [deleting, setDeleting] = useState(false);

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
      .catch(() => {
        // Reference lists are optional; the table load surfaces real errors.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const params: Record<string, string> = { limit: "100" };
    if (promotionFilter) {
      params.promotionId = promotionFilter;
    }
    listItems<PromotionTargetRow>("/promotion-targets", params)
      .then((data) => {
        if (!cancelled) {
          setTargets(data.items);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof AdminApiError
              ? err.message
              : "Failed to load targets"
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey, promotionFilter]);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await createOrUpdate("/promotion-targets", {
        id: deleteTarget.id,
        isDeleted: true,
      });
      toast.success("Target deleted");
      setDeleteTarget(null);
      const params: Record<string, string> = { limit: "100" };
      if (promotionFilter) {
        params.promotionId = promotionFilter;
      }
      const data = await listItems<PromotionTargetRow>(
        "/promotion-targets",
        params
      );
      setTargets(data.items);
    } catch (err) {
      toast.error(
        err instanceof AdminApiError ? err.message : "Delete failed"
      );
    } finally {
      setDeleting(false);
    }
  }

  const promotionNameById = new Map(
    promotions.map((promotion) => [
      promotion.id,
      promotion.title || promotion.name,
    ])
  );
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

  const columns: LegacyColumnDef<PromotionTargetRow, unknown>[] = [
    {
      accessorFn: (row) => row.promotionId,
      header: "Promotion",
      cell: ({ getValue }) =>
        promotionNameById.get(getValue() as number) ?? "—",
    },
    {
      accessorKey: "targetType",
      header: "Type",
      cell: ({ getValue }) =>
        targetTypeLabels[(getValue() as PromotionTargetRow["targetType"])] ??
        "—",
    },
    {
      accessorFn: (row) => row,
      header: "Target",
      cell: ({ row }) => targetLabel(row.original),
    },
    {
      accessorKey: "placement",
      header: "Placement",
      cell: ({ getValue }) =>
        placementLabels[(getValue() as PromotionTargetRow["placement"])] ??
        "—",
    },
    {
      accessorKey: "sortOrder",
      header: "Sort",
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" title="Actions">
              <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/promotion-targets/${row.original.id}/edit`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setDeleteTarget(row.original)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Promotion Targets"
        description="Point promotions at categories, products, or the homepage."
        action={
          <Button asChild>
            <Link href="/admin/promotion-targets/new">New target</Link>
          </Button>
        }
      />

      <div className="flex max-w-[36rem] items-center gap-3">
        <label className="text-sm font-medium" htmlFor="promotion-filter">
          Promotion
        </label>
        <Select value={promotionFilter} onValueChange={setPromotionFilter}>
          <SelectTrigger id="promotion-filter" className="w-full">
            <SelectValue placeholder="All promotions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All promotions</SelectItem>
            {promotions.map((promotion) => (
              <SelectItem key={promotion.id} value={String(promotion.id)}>
                {promotion.title || promotion.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <div className="grid gap-3">
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
          <Button
            variant="outline"
            onClick={() => setReloadKey((key) => key + 1)}
            className="w-fit"
          >
            Retry
          </Button>
        </div>
      )}

      {!error && (
        <DataTable
          columns={columns}
          data={targets}
          emptyState={loading ? "Loading…" : "No targets yet."}
        />
      )}

      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) setDeleteTarget(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete target?</DialogTitle>
            <DialogDescription>
              This will stop the promotion from being shown in this spot. This
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button onClick={() => void handleDelete()} disabled={deleting}>
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}