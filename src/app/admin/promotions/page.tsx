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
import type { PromotionRow } from "@/lib/schemas";
import { DataTable } from "../_components/data-table";
import { PageHeader } from "../_components/page-header";
import { listItems, createOrUpdate } from "../_lib/crud";
import { AdminApiError } from "../_lib/api";
import { formatDateTime } from "../_lib/format";

async function fetchPromotions(): Promise<PromotionRow[]> {
  const data = await listItems<PromotionRow>("/promotions", { limit: "100" });
  return data.items;
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<PromotionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<PromotionRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchPromotions()
      .then((items) => {
        if (!cancelled) setPromotions(items);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof AdminApiError
              ? err.message
              : "Failed to load promotions"
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
      await createOrUpdate("/promotions", {
        id: deleteTarget.id,
        isDeleted: true,
      });
      toast.success(`Deleted "${deleteTarget.name}"`);
      setDeleteTarget(null);
      const items = await fetchPromotions();
      setPromotions(items);
    } catch (err) {
      toast.error(
        err instanceof AdminApiError ? err.message : "Delete failed"
      );
    } finally {
      setDeleting(false);
    }
  }

  const columns: LegacyColumnDef<PromotionRow, unknown>[] = [
    {
      accessorKey: "image",
      header: "",
      cell: ({ row }) =>
        row.original.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.original.image}
            alt=""
            className="size-10 rounded-md border object-cover"
          />
        ) : (
          <div className="grid size-10 place-items-center rounded-md border bg-muted text-xs text-muted-foreground">
            —
          </div>
        ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <Link
          href={`/admin/promotions/${row.original.id}/edit`}
          className="font-medium text-primary hover:underline"
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ getValue }) => {
        const value = getValue() as string | null;
        return value ?? "—";
      },
    },
    {
      accessorKey: "startsAt",
      header: "Starts",
      cell: ({ getValue }) => {
        const value = getValue() as string | null;
        return value ? formatDateTime(value) : "—";
      },
    },
    {
      accessorKey: "endsAt",
      header: "Ends",
      cell: ({ getValue }) => {
        const value = getValue() as string | null;
        return value ? formatDateTime(value) : "—";
      },
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
              <Link href={`/admin/promotions/${row.original.id}/edit`}>
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
        title="Promotions"
        description="Schedule banners and marketing campaigns."
        action={
          <Button asChild>
            <Link href="/admin/promotions/new">New promotion</Link>
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
          data={promotions}
          emptyState={loading ? "Loading…" : "No promotions yet."}
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
            <DialogTitle>Delete promotion?</DialogTitle>
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