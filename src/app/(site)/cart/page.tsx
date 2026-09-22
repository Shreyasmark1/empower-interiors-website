import type { Metadata } from "next"

import { CartPage } from "@/components/cart-page"

export const metadata: Metadata = {
  title: "My Cart | Empower Interiors",
  description: "Review the pieces in your cart before you check out.",
}

export default function CartRoute() {
  return <CartPage />
}