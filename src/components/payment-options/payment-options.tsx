import {
  CreditCard,
  Banknote,
  CalendarClock,
  Landmark,
  Smartphone,
  Wallet,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { PAYMENT_OPTIONS } from "@/components/product-detail/services"
import { cn } from "@/lib/utils"

export type PaymentOption = { label: string; icon: LucideIcon }

const PAYMENT_ICONS: Record<string, LucideIcon> = {
  UPI: Smartphone,
  "Net Banking": Landmark,
  "Credit Card": CreditCard,
  "Debit Card": Wallet,
  EMI: CalendarClock,
  "Pay on delivery": Banknote,
}

type PaymentOptionsProps = {
  options?: string[]
  className?: string
}

function PaymentOptions({ options = [...PAYMENT_OPTIONS], className }: PaymentOptionsProps) {
  const items: PaymentOption[] = options.map((label) => ({
    label,
    icon: PAYMENT_ICONS[label] ?? CreditCard,
  }))

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="border-t border-border pt-2">
        <p className="text-[0.6875rem] font-semibold tracking-[0.32em] text-brand-magenta uppercase">
          Payment Options
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Secure &amp; flexible payment options
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5"
            >
              <Icon className="size-4 shrink-0 text-brand-magenta" strokeWidth={1.5} />
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { PaymentOptions }