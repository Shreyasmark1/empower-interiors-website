"use client"

import { Share2 } from "lucide-react"

import { toast } from "@/lib/toasts"
import { useMediaQuery } from "@/lib/use-media-query"
import { cn } from "@/lib/utils"

type ShareButtonProps = {
  productName: string
  className?: string
}

function ShareButton({ productName, className }: ShareButtonProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  async function handleShare() {
    const url = window.location.href
    const payload: ShareData = {
      title: productName,
      text: `Check out the ${productName} at Empower Interiors`,
      url,
    }

    if (!isDesktop && typeof navigator.share === "function") {
      try {
        await navigator.share(payload)
        return
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return
      }
    }

    if (typeof navigator.clipboard?.writeText === "function") {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard")
    } else {
      toast.success("Sharing is not supported on this device")
    }
  }

  return (
    <button
      type="button"
      aria-label="Share this product"
      onClick={handleShare}
      className={cn(
        "grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/25",
        className
      )}
    >
      <Share2 className="size-4" strokeWidth={1.5} />
    </button>
  )
}

export { ShareButton }