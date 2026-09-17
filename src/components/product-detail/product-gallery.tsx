"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { Maximize2, X } from "lucide-react"

import { cn } from "@/lib/utils"
import type { GalleryImage } from "@/lib/schemas"

type ProductGalleryProps = {
  images: GalleryImage[]
  productName: string
  className?: string
}

function ProductGallery({ images, productName, className }: ProductGalleryProps) {
  const [active, setActive] = React.useState(0)
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const current = images[active]

  if (!current) return null

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Main image */}
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-plum-5"
      >
        <div className="relative aspect-[4/3] w-full">
          {images.map((image, i) => (
            <div
              key={image.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                i === active ? "z-10 opacity-100" : "z-0 opacity-0"
              )}
            >
              <div className="relative h-full w-full overflow-hidden">
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                  {image.imageSrc ? (
                    <Image
                      src={image.imageSrc}
                      alt={`${productName} — ${image.label}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full" style={{ background: image.gradient }} />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/25 to-transparent" />
        </div>

        {/* Zoom hint */}
        <span className="pointer-events-none absolute right-4 bottom-4 z-30 flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
          <Maximize2 className="size-3.5" />
          Zoom
        </span>

        {/* Slide label + counter */}
        <span className="pointer-events-none absolute bottom-4 left-4 z-30 text-xs font-medium tracking-[0.18em] text-white uppercase">
          {current.label}
        </span>
        <span className="pointer-events-none absolute right-4 top-4 z-30 rounded-full bg-black/35 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {active + 1}/{images.length}
        </span>
      </button>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, i) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View ${image.label} image`}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg transition-all duration-200",
              i === active
                ? "ring-2 ring-brand-magenta ring-offset-2 ring-offset-surface-alt opacity-100"
                : "opacity-60 hover:opacity-80"
            )}
          >
            {image.imageSrc ? (
              <Image
                src={image.imageSrc}
                alt={`${productName} — ${image.label}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full" style={{ background: image.gradient }} />
            )}
          </button>
        ))}
      </div>

      {lightboxOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${productName} — ${current.label} enlarged`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            style={{ backgroundColor: "oklch(0 0 0 / 0.92)" }}
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                width: "min(88vw, 960px)",
                height: "min(82vh, 720px)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {current.imageSrc ? (
                <Image
                  src={current.imageSrc}
                  alt={`${productName} — ${current.label}`}
                  fill
                  sizes="(max-width: 1024px) 88vw, 960px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full" style={{ background: current.gradient }} />
              )}
            </div>
            <button
              type="button"
              aria-label="Close lightbox"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
          </div>,
          document.body
        )}
    </div>
  )
}

export { ProductGallery }