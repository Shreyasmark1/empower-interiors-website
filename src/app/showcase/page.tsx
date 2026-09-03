"use client"

import { useState } from "react"
import { toast } from "sonner"

import type { Product, Review } from "@/lib/schemas"
import { Toaster } from "@/components/ui/sonner"
import { ProductCard } from "@/components/product-card"
import { cartService } from "@/components/product-card/product-card.service"
import { SkeletonCard } from "@/components/skeleton-card"
import { ToastDemo } from "@/components/toast-demo"
import { ReviewCard } from "@/components/review-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QuantityStepper } from "@/components/ui/quantity-stepper"
import { SearchInput } from "@/components/ui/search-input"

const products: Product[] = [
  { id: "1", name: "Arcadia Lounge Chair", category: "Seating", price: 18499, wasPrice: 22999, status: "inStock" },
  { id: "2", name: "Bora Oak Dining Table", category: "Dining", price: 32999, status: "newArrival" },
  { id: "3", name: "Mira Velvet Sofa", category: "Seating", price: 54999, status: "soldOut" },
  { id: "4", name: "Lumen Floor Lamp", category: "Lighting", price: 7499, status: "inStock" },
]

const reviews: Review[] = [
  {
    id: "r1",
    reviewer: "Ananya S.",
    date: "2 weeks ago",
    rating: 5,
    body: "The lounge chair is stunning in person — the plum-toned fabric ties the whole room together.",
    verified: true,
  },
  {
    id: "r2",
    reviewer: "Rahul M.",
    date: "1 month ago",
    rating: 4,
    body: "Great build quality and assembly was straightforward. Delivery was prompt.",
    verified: true,
  },
  {
    id: "r3",
    reviewer: "Divya K.",
    date: "3 months ago",
    rating: 5,
    body: "Exactly as pictured. The finish is premium and the cushions are firm but comfortable.",
    verified: false,
  },
]

export default function ShowcasePage() {
  const [quantity, setQuantity] = useState(2)

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <div className="mb-10 flex flex-col gap-2">
        <p className="text-[11px] leading-4 font-semibold tracking-[1.5px] text-brand uppercase">
          Furnish Design System
        </p>
        <h1 className="text-3xl leading-[44px] font-bold tracking-[-0.5px] text-foreground">
          Section A — Demo Components
        </h1>
      </div>

      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl leading-9 font-semibold text-foreground">
            Product Grid
          </h2>
          <span className="text-sm text-muted-foreground">
            1 / 2 / 3 / 4 columns across breakpoints
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={async (p) => {
                await cartService.addToCart({ productId: p.id })
                toast.success(`${p.name} added to cart`)
              }}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl leading-9 font-semibold text-foreground">
          Loading Skeletons
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl leading-9 font-semibold text-foreground">
          Interaction Feedback — Toasts
        </h2>
        <div className="rounded-md border border-border bg-card p-5 shadow-sm">
          <ToastDemo />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl leading-9 font-semibold text-foreground">
          Reviews
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl leading-9 font-semibold text-foreground">
          Form Elements
        </h2>
        <div className="flex flex-col gap-6 rounded-md border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-end">
          <div className="flex w-full max-w-sm flex-col gap-2">
            <Label htmlFor="search">Search</Label>
            <SearchInput id="search" placeholder="Search furniture, lighting…" />
          </div>
          <div className="flex w-full max-w-sm flex-col gap-2">
            <Label htmlFor="qty" aria-hidden>
              Quantity
            </Label>
            <QuantityStepper value={quantity} onValueChange={setQuantity} />
          </div>
        </div>
        <div className="mt-4 grid max-w-lg grid-cols-1 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="input-default">Default input</Label>
            <Input id="input-default" placeholder="Placeholder text" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="input-error" className="text-destructive">
              Invalid field
            </Label>
            <Input id="input-error" aria-invalid placeholder="Placeholder text" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="input-disabled">Disabled input</Label>
            <Input id="input-disabled" disabled placeholder="Disabled" />
          </div>
        </div>
      </section>

      <Toaster />
    </div>
  )
}