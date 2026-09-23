"use client"

import { cn } from "@/lib/utils"
import { VIEW_MODE_LABELS, type ViewMode } from "../services/product-detail.constants"

type ViewToggleProps = {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
  className?: string
}

function ViewToggle({ mode, onChange, className }: ViewToggleProps) {
  const modes: ViewMode[] = ["gallery", "360", "3d"]

  return (
    <div
      className={cn(
        "flex w-fit items-center gap-1 rounded-full bg-plum-5 p-1",
        className
      )}
    >
      {modes.map((view) => (
        <button
          key={view}
          type="button"
          onClick={() => onChange(view)}
          aria-pressed={mode === view}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200",
            mode === view
              ? "bg-brand-magenta text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {VIEW_MODE_LABELS[view]}
        </button>
      ))}
    </div>
  )
}

export { ViewToggle }