import type { Metadata } from "next"

import { WishlistPage } from "@/components/wishlist-page"

export const metadata: Metadata = {
  title: "My Wishlist | Empower Interiors",
  description: "See the pieces you have saved for later.",
}

export default function WishlistRoute() {
  return <WishlistPage />
}