import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { GALLERY_GRADIENTS } from "./product-detail.constants"

export type RelatedProduct = {
  name: string
  brand?: string
  category: string
  price: number
  wasPrice?: number
  discountPercent?: number
  image?: string
}

type RelatedProductsProps = {
  related: RelatedProduct[]
  roomType: string
  className?: string
}

function RelatedProducts({ related, roomType, className }: RelatedProductsProps) {
  const items = related.slice(0, 3)
  if (items.length === 0) return null

  const roomHref = `/products?room=${encodeURIComponent(roomType)}`

  return (
    <section className={cn("border-t border-border", className)}>
      <div className="mx-auto w-[94%] max-w-[1280px] py-16 md:w-[90%] lg:py-24">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.6875rem] font-semibold tracking-[0.32em] text-brand-magenta uppercase">
              Inspired Selections
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground lg:text-3xl">
              Complete The Space
            </h2>
          </div>
          <Link
            href={roomHref}
            className="text-sm font-medium text-brand-magenta transition-colors hover:text-brand"
          >
            Browse {roomType} →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.name}
              className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                ) : (
                  <div
                    className="h-full w-full transition-transform duration-500 group-hover:scale-[1.05]"
                    style={{ background: GALLERY_GRADIENTS[(i + 1) % GALLERY_GRADIENTS.length] }}
                  />
                )}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-5">
                <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  {item.category}
                </p>
                <h3 className="line-clamp-1 text-base font-semibold text-foreground transition-colors duration-200 group-hover:text-brand-magenta">
                  {item.name}
                </h3>
                {item.brand && (
                  <p className="text-sm text-muted-foreground">{item.brand}</p>
                )}
                <div className="mt-auto flex items-baseline gap-2 pt-2">
                  <span className="text-lg font-bold text-brand-magenta">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  {item.wasPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{item.wasPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={roomHref}
            className="flex h-12 items-center justify-center rounded-lg bg-brand-magenta px-8 text-white transition-colors duration-200 hover:bg-brand"
          >
            Explore all {roomType} pieces
          </Link>
          <Link
            href="/products"
            className="flex h-12 items-center justify-center rounded-lg border-[1.5px] border-primary bg-transparent px-8 text-primary transition-colors duration-200 hover:bg-[rgba(87,0,84,0.06)]"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  )
}

export { RelatedProducts }