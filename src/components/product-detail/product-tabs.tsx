"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import type { ProductDetailInfo } from "@/lib/schemas"

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)"

type TabId =
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

type ProductTabsProps = {
  product: ProductDetailInfo
  className?: string
}

function ProductTabs({ product, className }: ProductTabsProps) {
  const tabs: TabDef[] = [
    { id: "description", title: "Description" },
    { id: "specifications", title: "Specifications" },
    ...(product.dimensions ? [{ id: "dimensions" as const, title: "Dimensions" }] : []),
    { id: "materials", title: "Materials" },
    { id: "care", title: "Care Instructions" },
    { id: "delivery", title: "Delivery" },
    { id: "installation", title: "Installation" },
  ]

  const [openId, setOpenId] = React.useState<TabId>(tabs[0].id)

  const renderTab = (id: TabId) => {
    switch (id) {
      case "description":
        return (
          <div className="flex flex-col gap-4">
            {product.descriptionParagraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-muted-foreground">
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

  return (
    <div className={cn("flex flex-col border-t border-border", className)}>
      {tabs.map((tab) => {
        const isOpen = openId === tab.id
        return (
          <section key={tab.id} className="border-b border-border">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? "description" : tab.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span
                className={cn(
                  "text-base font-semibold transition-colors duration-200",
                  isOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"
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
                maxHeight: isOpen ? "700px" : "0px",
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