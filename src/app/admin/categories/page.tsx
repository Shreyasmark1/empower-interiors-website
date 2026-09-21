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
import type { Category } from "@/lib/schemas";
import { DataTable } from "../_components/data-table";
import { PageHeader } from "../_components/page-header";
import { listItems, createOrUpdate } from "../_lib/crud";
import { AdminApiError } from "../_lib/api";
import { formatDateTime } from "../_lib/format";

async function fetchCategories(): Promise<Category[]> {
  const data = await listItems<Category>("/categories", { limit: "100" });
  return data.items;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchCategories()
      .then((items) => {
        if (!cancelled) setCategories(items);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof AdminApiError
              ? err.message
              : "Failed to load categories"
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await createOrUpdate("/categories", {
        id: deleteTarget.id,
        isDeleted: true,
      });
      toast.success(`Deleted "${deleteTarget.name}"`);
      setDeleteTarget(null);
      const items = await fetchCategories();
      setCategories(items);
    } catch (err) {
      toast.error(
        err instanceof AdminApiError ? err.message : "Delete failed"
      );
    } finally {
      setDeleting(false);
    }
  }

  const parentNameById = new Map(
    categories.map((category) => [category.id, category.name])
  );

  const columns: LegacyColumnDef<Category, unknown>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <Link
          href={`/admin/categories/${row.original.id}/edit`}
          className="font-medium text-primary hover:underline"
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorFn: (row) =>
        row.parentId === null
          ? "—"
          : (parentNameById.get(row.parentId) ?? "—"),
      header: "Parent",
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
      header: "Created",
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
              <Link href={`/admin/categories/${row.original.id}/edit`}>
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
        title="Categories"
        description="Organize products into browsable categories."
        action={
          <Button asChild>
            <Link href="/admin/categories/new">New category</Link>
          </Button>
        }
      />

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
          data={categories}
          emptyState={loading ? "Loading…" : "No categories yet."}
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
            <DialogTitle>Delete category?</DialogTitle>
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