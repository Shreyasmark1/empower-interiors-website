"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "@/lib/toasts"

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ProductDetailError({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    toast.error("Couldn't load this product. Please try again.")
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-[0.6875rem] font-semibold tracking-[0.32em] text-brand-magenta uppercase">
        Empower Interiors
      </p>
      <h1 className="text-3xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="max-w-[28rem] leading-relaxed text-muted-foreground">
        We hit a snag while loading this product. Your wishlist and basket are safe.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="flex h-12 items-center justify-center rounded-lg bg-brand-magenta px-8 text-white transition-colors duration-200 hover:bg-brand"
        >
          Try again
        </button>
        <Link
          href="/products"
          className="flex h-12 items-center justify-center rounded-lg border-[1.5px] border-primary bg-transparent px-8 text-primary transition-colors duration-200 hover:bg-[rgba(87,0,84,0.06)]"
        >
          Browse all products
        </Link>
      </div>
    </div>
  )
}