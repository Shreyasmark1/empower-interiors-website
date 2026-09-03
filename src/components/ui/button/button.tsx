import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex h-11 min-w-[120px] shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-[15px] font-semibold whitespace-nowrap transition-[background-color] duration-200 ease-out select-none outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:border-transparent disabled:bg-[var(--disabled-bg-strong)] disabled:text-[var(--disabled-text)] [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary px-6 text-primary-foreground hover:bg-brand-hover",
        outline:
          "border-[1.5px] border-primary bg-transparent px-[23px] text-primary hover:bg-[rgba(87,0,84,0.06)]",
        accent: "bg-brand-coral px-6 text-white hover:bg-brand-accent-hover",
        ghost:
          "bg-transparent px-6 text-primary hover:bg-[rgba(87,0,84,0.06)]",
        destructive:
          "bg-destructive/10 px-6 text-destructive hover:bg-destructive/20",
      },
      size: {
        default: "",
        icon: "size-11 min-w-0 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }