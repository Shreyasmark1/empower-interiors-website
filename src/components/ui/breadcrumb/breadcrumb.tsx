import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

type BreadcrumbLink = {
  label: string
  href: string
}

type BreadcrumbProps = {
  items: BreadcrumbLink[]
  className?: string
}

function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-2 text-[0.8125rem] font-light",
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const hideOnMobile = index < items.length - 2

        return (
          <span
            key={item.href}
            className={cn(
              "flex items-center gap-2 min-w-0",
              hideOnMobile && "hidden sm:flex"
            )}
          >
            {index > 0 ? (
              <ChevronRight className="size-3.5 text-muted-foreground" />
            ) : null}
            {isLast ? (
              <span className="min-w-0 truncate text-muted-foreground/80">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="whitespace-nowrap text-brand-magenta transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

export { Breadcrumb }
export type { BreadcrumbProps, BreadcrumbLink }