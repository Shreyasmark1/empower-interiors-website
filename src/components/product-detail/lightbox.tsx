"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { X } from "lucide-react"

import type { GalleryImage } from "@/lib/schemas"

type LightboxProps = {
  images: GalleryImage[]
  index: number
  productName: string
  onClose: () => void
}

function Lightbox({ images, index, productName, onClose }: LightboxProps) {
  const [current, setCurrent] = React.useState(index)
  const image = images[current]

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowRight") setCurrent((i) => (i + 1) % images.length)
      if (event.key === "ArrowLeft") setCurrent((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [images.length, onClose])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${productName} — ${image.label} enlarged`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "oklch(0 0 0 / 0.92)" }}
      onClick={onClose}
    >
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          width: "min(88vw, 960px)",
          height: "min(82vh, 720px)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {image.imageSrc ? (
          <Image
            src={image.imageSrc}
            alt={`${productName} — ${image.label}`}
            fill
            sizes="(max-width: 1024px) 88vw, 960px"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full" style={{ background: image.gradient }} />
        )}
        {images.length > 1 && (
          <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {current + 1} / {images.length}
          </span>
        )}
      </div>
      <button
        type="button"
        aria-label="Close lightbox"
        onClick={onClose}
        className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
      >
        <X className="size-5" />
      </button>
    </div>,
    document.body
  )
}

export { Lightbox }