"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2.5">
      <Button variant="default" onClick={() => toast("Cart updated")}>
        Default
      </Button>
      <Button variant="accent" onClick={() => toast.success("Added to cart")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info("Free shipping over ₹999")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Low stock remaining")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error("Checkout failed")}>
        Error
      </Button>
    </div>
  )
}

export { ToastDemo }