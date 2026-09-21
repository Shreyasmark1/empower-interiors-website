import Link from "next/link"

export default function ProductDetailNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-[0.6875rem] font-semibold tracking-[0.32em] text-brand-magenta uppercase">
        Empower Interiors
      </p>
      <h1 className="text-3xl font-semibold text-foreground">Product not found</h1>
      <p className="max-w-[28rem] leading-relaxed text-muted-foreground">
        The piece you are looking for may have been discontinued or the link is
        no longer active.
      </p>
      <Link
        href="/products"
        className="mt-2 flex h-12 items-center justify-center rounded-lg bg-brand-magenta px-8 text-white transition-colors duration-200 hover:bg-brand"
      >
        Browse all products
      </Link>
    </div>
  )
}