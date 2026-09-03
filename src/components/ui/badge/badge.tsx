import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 px-2 py-0.5 whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        category: "bg-[var(--category-tag-bg)] text-primary rounded-[6px] text-xs font-medium",
        discount:
          "bg-brand-coral text-white rounded-full text-[11px] font-bold",
        inStock:
          "bg-[var(--success-bg)] text-[var(--success-text)] rounded-[6px] text-[11px] font-semibold",
        soldOut:
          "bg-[var(--soldout-bg)] text-brand-coral rounded-[6px] text-[11px] font-semibold",
        newArrival:
          "bg-gradient-brand text-white rounded-full text-[11px] font-semibold",
        secondary: "bg-secondary text-secondary-foreground rounded-[6px]",
        outline: "border border-border text-foreground rounded-[6px]",
        default: "bg-primary text-primary-foreground rounded-[6px]",
      },
    },
    defaultVariants: {
      variant: "category",
    },
  }
)

function Badge({
  className,
  variant = "category",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }