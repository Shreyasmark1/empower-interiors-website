"use client"

import * as React from "react"
import { ChevronDown, MapPin, CircleCheck, CircleX } from "lucide-react"

import { productDetailService } from "./product-detail.service"
import { cn } from "@/lib/utils"

type CheckAvailabilityProps = {
  className?: string
}

type Status = "idle" | "checking" | "ok" | "error"

function CheckAvailability({ className }: CheckAvailabilityProps) {
  const [expanded, setExpanded] = React.useState(false)
  const [pincode, setPincode] = React.useState("")
  const [status, setStatus] = React.useState<Status>("idle")
  const [message, setMessage] = React.useState("")

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setStatus("checking")
    const result = await productDetailService.checkPincode(pincode)
    setStatus(result.ok ? "ok" : "error")
    setMessage(result.message)
  }

  const form = (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <label htmlFor="pincode" className="sr-only">
        Delivery pincode
      </label>
      <input
        id="pincode"
        type="text"
        inputMode="numeric"
        value={pincode}
        onChange={(event) => setPincode(event.target.value.replace(/[^\d]/g, ""))}
        maxLength={6}
        placeholder="Enter pincode"
        className="h-11 w-full rounded-lg border border-input bg-surface-alt px-3 text-sm outline-none transition-colors focus:border-2 focus:border-brand-magenta"
      />
      <button
        type="submit"
        disabled={pincode.length !== 6 || status === "checking"}
        className="h-11 shrink-0 rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-hover disabled:opacity-40"
      >
        {status === "checking" ? "Checking…" : "Check"}
      </button>
    </form>
  )

  const messageMarkup =
    status === "ok" || status === "error" ? (
      <p
        className={cn(
          "flex items-center gap-1.5 text-xs",
          status === "ok" ? "text-[var(--success-text)]" : "text-brand-coral"
        )}
      >
        {status === "ok" ? (
          <CircleCheck className="size-3.5" />
        ) : (
          <CircleX className="size-3.5" />
        )}
        {message}
      </p>
    ) : null

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Mobile: collapsed tappable row */}
      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((open) => !open)}
          className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2.5 text-left"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            <MapPin className="size-4 text-brand-magenta" />
            Delivering to your area
          </span>
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-300",
              expanded && "rotate-180"
            )}
          />
        </button>
        {expanded && (
          <div className="mt-2 flex flex-col gap-2">
            {form}
            {messageMarkup}
          </div>
        )}
      </div>

      {/* Desktop: always visible */}
      <div className="hidden flex-col gap-2 lg:flex">
        <p className="text-[0.6875rem] font-semibold tracking-[0.32em] text-muted-foreground uppercase">
          Check Delivery Pincode
        </p>
        {form}
        {messageMarkup}
      </div>
    </div>
  )
}

export { CheckAvailability }