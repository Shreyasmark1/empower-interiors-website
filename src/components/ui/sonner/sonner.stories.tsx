import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { toast } from "@/lib/toasts"

import { Button } from "@/components/ui/button"
import { Toaster } from "./sonner"

function ToastTriggerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default" onClick={() => toast.success("Changes saved successfully")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info("New deals drop every Friday")}>
        Info
      </Button>
      <Button variant="accent" onClick={() => toast.warning("Only 2 pieces left in stock")}>
        Warning
      </Button>
      <Button
        variant="destructive"
        onClick={() => toast.error("Something went wrong. Please try again")}
      >
        Error
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          const id = toast.loading("Adding to cart…")
          setTimeout(() => toast.success("Added to cart", { id }), 1200)
        }}
      >
        Loading
      </Button>
    </div>
  )
}

const meta = {
  title: "Furnish/Toast",
  component: ToastTriggerDemo,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof ToastTriggerDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {}

export const TriggerSuccess: Story = {
  name: "Trigger a success toast",
  render: () => <ToastTriggerDemo />,
}