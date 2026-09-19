import Link from "next/link"

import { cn } from "@/lib/utils"

type SuggestProductProps = {
  className?: string
}

function SuggestProduct({ className }: SuggestProductProps) {
  return (
    <section className={cn("border-t border-border", className)}>
      <div className="mx-auto flex w-[94%] max-w-[1280px] flex-col items-center gap-4 py-14 text-center md:w-[90%] lg:py-16">
        <p className="text-[0.6875rem] font-semibold tracking-[0.32em] text-brand-magenta uppercase">
          Didn&apos;t Find It?
        </p>
        <h2 className="text-2xl font-extralight text-foreground lg:text-3xl">
          Let our design team source something just for you
        </h2>
        <p className="max-w-xl leading-relaxed text-muted-foreground">
          Tell us the space, the style and the budget — we&apos;ll find the perfect piece or build
          a custom one to match.
        </p>
        <Link
          href="/consultation"
          className="mt-2 flex h-12 items-center justify-center rounded-lg bg-brand-magenta px-10 text-white shadow-[0_10px_30px_rgba(87,0,84,0.28)] transition-all duration-200 hover:bg-brand"
        >
          Request a Custom Product
        </Link>
      </div>
    </section>
  )
}

export { SuggestProduct }