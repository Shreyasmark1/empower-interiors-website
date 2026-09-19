"use client"

import * as React from "react"
import { Rotate3d } from "lucide-react"

import { cn } from "@/lib/utils"

type View360Props = {
  frames: string[]
  productName: string
  className?: string
}

function View360({ frames, productName, className }: View360Props) {
  const [index, setIndex] = React.useState(0)
  const dragStart = React.useRef<{ x: number; index: number } | null>(null)
  const [dragging, setDragging] = React.useState(false)

  if (frames.length === 0) {
    return (
      <div
        className={cn(
          "relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-xl bg-plum-5",
          className
        )}
      >
        <Rotate3d className="size-12 text-brand-magenta" strokeWidth={1.3} />
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">360° view coming soon</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Drag to spin {productName} once we publish the frames
          </p>
        </div>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-plum-20">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-brand-magenta" />
        </div>
      </div>
    )
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    dragStart.current = { x: event.clientX, index }
    setDragging(true)
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragStart.current) return
    const delta = event.clientX - dragStart.current.x
    const step = Math.round(delta / 48)
    const next = (dragStart.current.index + step) % frames.length
    setIndex(next >= 0 ? next : next + frames.length)
  }

  function onPointerUp() {
    dragStart.current = null
    setDragging(false)
  }

  return (
    <div
      className={cn("relative w-full select-none", className)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      role="img"
      aria-label={`360 view of ${productName}`}
    >
      <div
        className={cn("relative aspect-[4/5] w-full overflow-hidden rounded-xl", dragging && "cursor-grabbing")}
      >
        <img
          src={frames[index]}
          alt={`${productName} 360 frame ${index + 1}`}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/25 to-transparent" />
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-plum-5">
        <div
          className="h-full rounded-full bg-brand-magenta transition-[width] duration-150"
          style={{ width: `${((index + 1) / frames.length) * 100}%` }}
        />
      </div>
      <div className="mt-2 flex justify-center gap-1.5">
        {frames.map((_, i) => (
          <span
            key={i}
            className={cn(
              "size-1.5 rounded-full transition-colors duration-200",
              i === index ? "bg-brand-magenta" : "bg-plum-20"
            )}
          />
        ))}
      </div>
    </div>
  )
}

export { View360 }