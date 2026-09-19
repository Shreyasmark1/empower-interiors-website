"use client"

import * as React from "react"
import Image from "next/image"
import { Maximize2 } from "lucide-react"

import { useMediaQuery } from "@/lib/use-media-query"
import type { GalleryImage } from "@/lib/schemas"
import { cn } from "@/lib/utils"
import type { ViewMode } from "./product-detail.constants"
import { Lightbox } from "./lightbox"
import { ShareButton } from "./share-button"
import { View360 } from "./view-360"
import { View3D } from "./view-3d"
import { ViewToggle } from "./view-toggle"

type ProductGalleryProps = {
  images: GalleryImage[]
  productName: string
  has360?: boolean
  has3d?: boolean
  frames?: string[]
  modelUrl?: string
  className?: string
}

function ProductGallery({
  images,
  productName,
  has360 = true,
  has3d = true,
  frames = [],
  modelUrl,
  className,
}: ProductGalleryProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [mode, setMode] = React.useState<ViewMode>("gallery")
  const [active, setActive] = React.useState(0)
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [zoom, setZoom] = React.useState({ on: false, x: 50, y: 50 })
  const current = images[active]

  if (!current) return null

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    setZoom({
      on: true,
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {has360 || has3d ? (
        <ViewToggle mode={mode} onChange={setMode} className="self-start" />
      ) : null}

      {mode === "gallery" ? (
        <>
          {/* Main stage */}
          <div
            role="button"
            tabIndex={0}
            aria-label={`${productName} — ${current.label}. Open enlarged view`}
            onClick={() => setLightboxOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                setLightboxOpen(true)
              }
            }}
            className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-plum-5 focus-visible:ring-2 focus-visible:ring-brand-magenta"
          >
            <div className="relative aspect-[4/5] w-full">
              {images.map((image, i) => (
                <div
                  key={image.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-out",
                    i === active ? "z-10 opacity-100" : "z-0 opacity-0"
                  )}
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <div
                      className="h-full w-full transition-transform duration-500 ease-out"
                      style={{
                        transformOrigin: `${zoom.x}% ${zoom.y}%`,
                        transform: isDesktop
                          ? zoom.on
                            ? "scale(2.2)"
                            : "scale(1)"
                          : "scale(1)",
                      }}
                    >
                      {image.imageSrc ? (
                        <Image
                          src={image.imageSrc}
                          alt={`${productName} — ${image.label}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover"
                        />
                      ) : (
                        <div
                          className="h-full w-full"
                          style={{ background: image.gradient }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/25 to-transparent" />

              {/* Zoom hint */}
              <span className="pointer-events-none absolute right-4 bottom-4 z-30 hidden items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 lg:flex">
                <Maximize2 className="size-3.5" />
                Zoom
              </span>

              {/* Slide label + counter */}
              <span className="pointer-events-none absolute bottom-4 left-4 z-30 text-xs font-medium tracking-[0.18em] text-white uppercase">
                {current.label}
              </span>
              <span className="pointer-events-none absolute top-4 right-4 z-30 rounded-full bg-black/35 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {active + 1}/{images.length}
              </span>

              <ShareButton
                productName={productName}
                className="absolute top-4 left-4 z-30"
              />
            </div>

            <div
              className="absolute inset-0 z-20 hidden lg:block"
              onMouseMove={onMouseMove}
              onMouseEnter={() => setZoom((z) => ({ ...z, on: true }))}
              onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, i) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View ${image.label} image`}
                  aria-current={i === active}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-lg transition-all duration-200",
                    i === active
                      ? "ring-2 ring-brand-magenta ring-offset-2 ring-offset-surface-alt opacity-100"
                      : "opacity-52 hover:opacity-80"
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
                    <div
                      className="h-full w-full"
                      style={{ background: image.gradient }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </>
      ) : mode === "360" ? (
        <View360 frames={frames} productName={productName} />
      ) : (
        <View3D modelUrl={modelUrl} productName={productName} />
      )}

      {lightboxOpen && (
        <Lightbox
          images={images}
          index={active}
          productName={productName}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}

export { ProductGallery }