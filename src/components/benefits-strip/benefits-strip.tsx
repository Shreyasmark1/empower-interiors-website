import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type Benefit = { title: string; description: string; icon: LucideIcon }

const DEFAULT_BENEFITS: Benefit[] = [
  {
    title: "Free Delivery",
    description: "White-glove delivery to your door.",
    icon: Truck,
  },
  {
    title: "Warranty",
    description: "Structural repair for up to 1 year.",
    icon: ShieldCheck,
  },
  {
    title: "Easy Returns",
    description: "30-day hassle-free exchange.",
    icon: RotateCcw,
  },
  {
    title: "Expert Support",
    description: "Design help on chat and call.",
    icon: Headphones,
  },
]

type BenefitsStripProps = {
  items?: Benefit[]
  className?: string
}

function BenefitsStrip({ items = DEFAULT_BENEFITS, className }: BenefitsStripProps) {
  return (
    <div
      className={cn(
        "border-t border-border pt-2",
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1",
        className
      )}
    >
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.title} className="flex items-start gap-3">
            <Icon className="mt-0.5 size-5 shrink-0 text-brand-magenta" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { BenefitsStrip, DEFAULT_BENEFITS }