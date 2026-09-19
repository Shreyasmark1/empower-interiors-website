"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown } from "lucide-react"

import { useMediaQuery } from "@/lib/use-media-query"
import type { ProductDetailInfo } from "@/lib/schemas"
import { cn } from "@/lib/utils"
import { FEATURE_ICONS } from "./product-detail.constants"

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"

type TabId =
  | "features"
  | "description"
  | "specifications"
  | "dimensions"
  | "materials"
  | "care"
  | "delivery"
  | "installation"

type TabDef = {
  id: TabId
  title: string
}

function SpecTable({ specs }: { specs: ProductDetailInfo["specifications"] }) {
  return (
    <dl className="w-full">
      {specs.map((row) => (
        <div
          key={row.label}
          className="flex items-start justify-between gap-6 border-t border-border py-3 first:border-t-0"
        >
          <dt className="shrink-0 text-sm text-muted-foreground">{row.label}</dt>
          <dd className="text-right text-sm font-medium text-foreground">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
          <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-plum-20" aria-hidden="true" />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function DimensionGrid({
  dimensions,
}: {
  dimensions: NonNullable<ProductDetailInfo["dimensions"]>
}) {
  const cells = [
    { label: "Width", value: dimensions.width },
    { label: "Depth", value: dimensions.depth },
    { label: "Height", value: dimensions.height },
    { label: "Weight", value: dimensions.weight },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {cells.map((cell) => (
        <div key={cell.label} className="flex flex-col gap-1 rounded-md border border-border p-3">
          <span className="text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            {cell.label}
          </span>
          <span className="text-sm font-medium text-foreground">{cell.value}</span>
        </div>
      ))}
    </div>
  )
}

function FeatureGrid({ features }: { features: ProductDetailInfo["features"] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
      {features.map((feature) => {
        const Icon = FEATURE_ICONS[feature.iconKey]
        return (
          <div key={feature.title} className="flex flex-col gap-2">
            <Icon className="size-6 text-brand-magenta" strokeWidth={1.3} />
            <h3 className="text-[0.9375rem] font-medium text-foreground">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}

type ProductTabsProps = {
  product: ProductDetailInfo
  className?: string
}

function ProductTabs({ product, className }: ProductTabsProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const tabs = React.useMemo<TabDef[]>(
    () => [
      { id: "features", title: "Features" },
      { id: "description", title: "Description" },
      { id: "specifications", title: "Specifications" },
      ...(product.dimensions ? [{ id: "dimensions" as const, title: "Dimensions" }] : []),
      { id: "materials", title: "Materials" },
      { id: "care", title: "Care Instructions" },
      { id: "delivery", title: "Delivery" },
      { id: "installation", title: "Installation" },
    ],
    [product.dimensions]
  )

  const [activeId, setActiveId] = React.useState<TabId | null>(tabs[0].id)
  const active = activeId ?? tabs[0].id

  const renderTab = (id: TabId) => {
    switch (id) {
      case "features":
        return <FeatureGrid features={product.features} />
      case "description":
        return (
          <div className="flex flex-col gap-4">
            {product.descriptionParagraphs.map((paragraph) => (
              <p key={paragraph} className="leading-[1.8] text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        )
      case "specifications":
        return <SpecTable specs={product.specifications} />
      case "dimensions":
        return <DimensionGrid dimensions={product.dimensions!} />
      case "materials":
        return <BulletList items={product.materials} />
      case "care":
        return <BulletList items={product.careInstructions} />
      case "delivery":
        return <BulletList items={product.deliveryInfo} />
      case "installation":
        return <BulletList items={product.installationInfo} />
    }
  }

  if (isDesktop) {
    return (
      <div className={cn("flex flex-col", className)}>
        {/* Tab bar */}
        <div
          role="tablist"
          aria-label="Product details"
          className="no-scrollbar flex gap-1 overflow-x-auto rounded-xl bg-plum-5 p-1"
        >
          {tabs.map((tab) => {
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(tab.id)}
                className={cn(
                  "shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-brand-magenta text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.title}
              </button>
            )
          })}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            role="tabpanel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pt-8"
          >
            {renderTab(active)}
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col border-t border-border", className)}>
      {tabs.map((tab) => {
        const isOpen = activeId === tab.id
        return (
          <section key={tab.id} className="border-b border-border">
            <button
              type="button"
              onClick={() => setActiveId(isOpen ? null : tab.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-6 text-left"
            >
              <span
                className={cn(
                  "text-base font-medium transition-colors duration-200",
                  isOpen ? "text-brand-magenta" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.title}
              </span>
              <ChevronDown
                className={cn(
                  "size-5 text-muted-foreground transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn("overflow-hidden")}
              style={{
                maxHeight: isOpen ? "2000px" : "0px",
                opacity: isOpen ? 1 : 0,
                transition: `max-height ${isOpen ? "0.55s" : "0.35s"} ${EASE}, opacity 0.3s ${EASE}`,
              }}
            >
              <div className="pb-6">{renderTab(tab.id)}</div>
            </div>
          </section>
        )
      })}
    </div>
  )
}

export { ProductTabs }