import { Award, Palette, ShieldCheck, Sparkles } from "lucide-react"

import type { AvailabilityTone } from "@/lib/schemas"

export const NAVBAR_HEIGHT = "72px"

export const GALLERY_LABELS = ["Main", "Side", "Detail", "Lifestyle"] as const

export const GALLERY_GRADIENTS = [
  "linear-gradient(135deg, oklch(0.7 0.18 310) 0%, oklch(0.46 0.14 330) 100%)",
  "linear-gradient(135deg, oklch(0.82 0.12 320) 0%, oklch(0.55 0.16 330) 100%)",
  "linear-gradient(135deg, oklch(0.62 0.17 310) 0%, oklch(0.85 0.14 70) 100%)",
  "linear-gradient(135deg, oklch(0.78 0.13 330) 0%, oklch(0.52 0.17 305) 100%)",
] as const

export const SHARED_FEATURES = [
  {
    title: "Premium Materials",
    description: "Kiln-dried hardwood frames and stain-resistant fabrics that keep their shape and colour for years.",
    iconKey: "sparkles",
  },
  {
    title: "Customisable Finish",
    description: "Pick the fabric, weave and leg finish that suits your space — personalisation at no extra cost.",
    iconKey: "award",
  },
  {
    title: "Expert Installation",
    description: "Certified craftsmen assemble, align and position every piece, then clear the packing away.",
    iconKey: "shieldCheck",
  },
  {
    title: "1 Year Warranty",
    description: "Any structural or comfort defect within the first 12 months is repaired or replaced free of charge.",
    iconKey: "palette",
  },
] as const

export const FEATURE_ICONS = {
  sparkles: Sparkles,
  award: Award,
  shieldCheck: ShieldCheck,
  palette: Palette,
} as const

export const AVAILABILITY_META: Record<
  "inStock" | "lowStock",
  { label: string; tone: AvailabilityTone }
> = {
  inStock: { label: "In Stock", tone: "green" },
  lowStock: { label: "Only few left", tone: "amber" },
}

export const TRUST_POINTS = [
  "Premium Materials",
  "Customisable Finish",
  "Expert Installation",
  "1 Year Warranty",
] as const

export const VIEW_MODES = ["gallery", "360", "3d"] as const
export type ViewMode = (typeof VIEW_MODES)[number]

export const VIEW_MODE_LABELS: Record<ViewMode, string> = {
  gallery: "Gallery",
  360: "360°",
  "3d": "3D",
}

export const DEFAULT_TAXES_TEXT = "Inclusive of all taxes"

export const PAYMENT_OPTIONS = [
  "UPI",
  "Net Banking",
  "Credit Card",
  "Debit Card",
  "EMI",
  "Pay on delivery",
] as const

export const CONTACT = {
  phoneDisplay: "(080) 7123 4567",
  telHref: "tel:+918071234567",
  waNumber: "918071234567",
} as const

export function buildWhatsAppHref(productName: string, roomType: string): string {
  const text = encodeURIComponent(
    `Hi Empower Interiors! I'd like to know more about the ${productName} for my ${roomType}.`
  )
  return `https://wa.me/${CONTACT.waNumber}?text=${text}`
}

export function buildConsultationHref(productSlug: string, roomType: string): string {
  return `/consultation?product=${productSlug}&room=${encodeURIComponent(roomType)}`
}

export const pageMotion = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.32, ease: "easeOut" },
} as const

export const WHITE_BG = "oklch(1 0 0)"
export const PAGE_GUTTER = "mx-auto w-[94%] max-w-[1280px] md:w-[90%]"

export const CTA_PRIMARY =
  "flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 text-white transition-all duration-200 hover:bg-brand-hover"

export const CTA_OUTLINE =
  "flex h-12 items-center justify-center rounded-lg border-[1.5px] border-primary bg-transparent px-8 text-primary transition-colors duration-200 hover:bg-[rgba(87,0,84,0.06)]"

export const ICON_BUTTON = "grid size-10 shrink-0 place-items-center rounded-full"