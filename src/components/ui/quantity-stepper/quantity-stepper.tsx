"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { iconConfig, MinusIcon, PlusIcon } from "@/lib/icons"

function QuantityStepper({
  value,
  onValueChange,
  min = 1,
  max = 99,
  className,
}: {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}) {
  const decrement = () => {
    if (value > min) onValueChange(value - 1)
  }

  const increment = () => {
    if (value < max) onValueChange(value + 1)
  }

  return (
    <div
      className={cn(
        "flex h-11 w-[140px] items-stretch overflow-hidden rounded-md border border-input bg-white",
        className
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={decrement}
        disabled={value <= min}
        className="flex flex-1 items-center justify-center bg-primary text-primary-foreground transition-colors duration-200 hover:bg-brand-hover disabled:pointer-events-none disabled:opacity-40"
      >
        <MinusIcon {...iconConfig.standard} />
      </button>
      <div
        role="status"
        aria-live="polite"
        className="flex flex-1 items-center justify-center border-x border-input text-sm font-medium text-foreground"
      >
        {value}
      </div>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={increment}
        disabled={value >= max}
        className="flex flex-1 items-center justify-center bg-primary text-primary-foreground transition-colors duration-200 hover:bg-brand-hover disabled:pointer-events-none disabled:opacity-40"
      >
        <PlusIcon {...iconConfig.standard} />
      </button>
    </div>
  )
}

export { QuantityStepper }