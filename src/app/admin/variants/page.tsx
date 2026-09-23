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
import type { ProductRow, VariantRow } from "@/lib/schemas";
import { DataTable } from "../_components/data-table";
import { PageHeader } from "../_components/page-header";
import { listItems, createOrUpdate } from "../_lib/crud";
import { AdminApiError } from "../_lib/api";
import { formatDateTime, formatPrice } from "../_lib/format";

export default function VariantsPage() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [productFilter, setProductFilter] = useState("");
  const [variants, setVariants] = useState<VariantRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<VariantRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    listItems<ProductRow>("/products", { limit: "100" })
      .then((data) => {
        if (!cancelled) setProducts(data.items);
      })
      .catch(() => {
        // Product filter dropdown is optional; silence failures here.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const params: Record<string, string> = { limit: "100" };
    if (productFilter) {
      params.productId = productFilter;
    }
    listItems<VariantRow>("/variants", params)
      .then((data) => {
        if (!cancelled) {
          setVariants(data.items);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof AdminApiError ? err.message : "Failed to load variants"
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey, productFilter]);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await createOrUpdate("/variants", {
        id: deleteTarget.id,
        isDeleted: true,
      });
      toast.success(`Deleted variant "${deleteTarget.name}"`);
      setDeleteTarget(null);
      const params: Record<string, string> = { limit: "100" };
      if (productFilter) {
        params.productId = productFilter;
      }
      const data = await listItems<VariantRow>("/variants", params);
      setVariants(data.items);
    } catch (err) {
      toast.error(
        err instanceof AdminApiError ? err.message : "Delete failed"
      );
    } finally {
      setDeleting(false);
    }
  }

  const columns: LegacyColumnDef<VariantRow, unknown>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <Link
          href={`/admin/variants/${row.original.id}/edit`}
          className="font-medium text-primary hover:underline"
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ getValue }) => formatPrice(getValue() as number),
    },
    {
      accessorKey: "sortOrder",
      header: "Sort",
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ getValue }) => {
        const active = Boolean(getValue());
        return (
          <span
            data-active={active}
            className="rounded-full border px-2 py-0.5 text-xs font-medium data-[active=true]:border-emerald-600/30 data-[active=true]:bg-emerald-600/10 data-[active=true]:text-emerald-700 data-[active=false]:border-muted-foreground/30 data-[active=false]:bg-muted/50 data-[active=false]:text-muted-foreground"
          >
            {active ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Updated",
      cell: ({ getValue }) => formatDateTime(getValue() as string),
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
              <Link href={`/admin/variants/${row.original.id}/edit`}>
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
        title="Variants"
        description="Size, finish, or color options across products."
        action={
          <Button asChild>
            <Link href="/admin/variants/new">New variant</Link>
          </Button>
        }
      />

      <div className="flex max-w-xl items-center gap-3">
        <label className="text-sm font-medium" htmlFor="product-filter">
          Product
        </label>
        <Select value={productFilter} onValueChange={setProductFilter}>
          <SelectTrigger id="product-filter" className="w-full">
            <SelectValue placeholder="All products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All products</SelectItem>
            {products.map((product) => (
              <SelectItem key={product.id} value={String(product.id)}>
                {product.name}
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
          data={variants}
          emptyState={loading ? "Loading…" : "No variants yet."}
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
            <DialogTitle>Delete variant?</DialogTitle>
            <DialogDescription>
              {deleteTarget && (
                <>
                  <span className="font-medium text-foreground">
                    “{deleteTarget.name}”
                  </span>{" "}
                  will be hidden from the catalogue. This cannot be undone.
                </>
              )}
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