"use client"

import * as React from "react"
import { Send } from "lucide-react"

import { toast } from "@/lib/toasts"
import { cn } from "@/lib/utils"

const LABEL_CLASS = "text-xs font-medium text-muted-foreground"
const INPUT_CLASS =
  "h-11 w-full rounded-lg border border-input bg-surface-alt px-3 text-sm outline-none transition-colors focus:border-2 focus:border-brand-magenta"

function readQuery(key: string): string {
  if (typeof window === "undefined") return ""
  return new URLSearchParams(window.location.search).get(key) ?? ""
}

type ConsultationFormProps = {
  className?: string
}

function ConsultationForm({ className }: ConsultationFormProps) {
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    pincode: "",
    budget: "₹20K – ₹50K",
    message: "",
  })

  const product = readQuery("product")
  const room = readQuery("room")

  function update(field: keyof typeof form) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    toast.success("Thank you! Our design team will reach out within 24 hours.")
    setForm({ name: "", phone: "", pincode: "", budget: "₹20K – ₹50K", message: "" })
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-name" className={LABEL_CLASS}>
            Full name
          </label>
          <input
            id="cf-name"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Your name"
            className={INPUT_CLASS}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-phone" className={LABEL_CLASS}>
            Phone number
          </label>
          <input
            id="cf-phone"
            required
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="10-digit mobile number"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-pincode" className={LABEL_CLASS}>
            Delivery pincode
          </label>
          <input
            id="cf-pincode"
            inputMode="numeric"
            value={form.pincode}
            onChange={(event) =>
              update("pincode")(
                {
                  target: { value: event.target.value.replace(/[^\d]/g, "") },
                } as React.ChangeEvent<HTMLInputElement>
              )
            }
            maxLength={6}
            placeholder="e.g. 560001"
            className={INPUT_CLASS}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-budget" className={LABEL_CLASS}>
            Budget range
          </label>
          <select
            id="cf-budget"
            value={form.budget}
            onChange={update("budget")}
            className={INPUT_CLASS}
          >
            <option>Under ₹20K</option>
            <option>₹20K – ₹50K</option>
            <option>₹50K – ₹1L</option>
            <option>₹1L+</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className={LABEL_CLASS}>
          Tell us about the piece you need
        </label>
        <textarea
          id="cf-message"
          value={form.message}
          onChange={update("message")}
          placeholder="Room, style, dimensions, colours…"
          rows={4}
          className="w-full resize-none rounded-lg border border-input bg-surface-alt p-3 text-sm outline-none transition-colors focus:border-2 focus:border-brand-magenta"
        />
        {room || product ? (
          <p className="text-xs text-muted-foreground">
            {product ? `Product: ${product}` : null}
            {room ? ` · Room: ${decodeURIComponent(room)}` : null}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-magenta text-white shadow-[0_10px_30px_rgba(87,0,84,0.28)] transition-all duration-200 hover:bg-brand"
      >
        <Send className="size-4" strokeWidth={1.5} />
        Request Consultation
      </button>
    </form>
  )
}

export { ConsultationForm }