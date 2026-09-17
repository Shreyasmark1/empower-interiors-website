"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

type PageItem = number | "ellipsis-start" | "ellipsis-end"

function buildPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const items: PageItem[] = [1]
  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  if (start > 2) items.push("ellipsis-start")
  for (let page = start; page <= end; page += 1) items.push(page)
  if (end < totalPages - 1) items.push("ellipsis-end")

  items.push(totalPages)
  return items
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const items = buildPageItems(currentPage, totalPages)

  const baseButton =
    "inline-flex size-9 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40"

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          baseButton,
          "border border-border text-foreground hover:border-brand hover:text-brand",
        )}
      >
        <ChevronLeft className="size-4" />
      </button>

      {items.map((item) => {
        if (item === "ellipsis-start" || item === "ellipsis-end") {
          return (
            <span
              key={item}
              aria-hidden="true"
              className="inline-flex size-9 items-center justify-center text-sm text-muted-foreground"
            >
              &hellip;
            </span>
          )
        }

        const isActive = item === currentPage
        return (
          <button
            key={item}
            type="button"
            aria-label={`Page ${item}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onPageChange(item)}
            className={cn(
              baseButton,
              isActive
                ? "bg-brand text-white"
                : "border border-border text-foreground hover:border-brand hover:text-brand",
            )}
          >
            {item}
          </button>
        )
      })}

      <button
        type="button"
        aria-label="Next page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          baseButton,
          "border border-border text-foreground hover:border-brand hover:text-brand",
        )}
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}

export { Pagination }
export type { PaginationProps }