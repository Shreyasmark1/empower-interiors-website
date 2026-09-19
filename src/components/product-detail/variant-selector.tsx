"use client"

import type { ProductVariant } from "@/lib/schemas"
import { cn } from "@/lib/utils"

type VariantSelectorProps = {
  variants: ProductVariant[]
  value?: string
  onChange: (id: string) => void
  className?: string
}

function VariantSelector({
  variants,
  value,
  onChange,
  className,
}: VariantSelectorProps) {
  if (variants.length === 0) return null

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        Colour
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const active = variant.id === value
          return (
            <button
              key={variant.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(variant.id)}
              className={cn(
                "flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 transition-all duration-200",
                active
                  ? "border-brand-magenta bg-plum-5"
                  : "border-border bg-surface-alt hover:border-muted-foreground/40"
              )}
            >
              <span
                aria-hidden="true"
                className="size-5 rounded-full border border-border"
                style={{ backgroundColor: variant.swatch }}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {variant.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { VariantSelector }