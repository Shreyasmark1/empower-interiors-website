"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

import { HugeiconsIcon, toastIcons } from "@/lib/icons"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <HugeiconsIcon icon={toastIcons.success} strokeWidth={2} className="size-4" />
        ),
        info: (
          <HugeiconsIcon icon={toastIcons.info} strokeWidth={2} className="size-4" />
        ),
        warning: (
          <HugeiconsIcon icon={toastIcons.warning} strokeWidth={2} className="size-4" />
        ),
        error: (
          <HugeiconsIcon icon={toastIcons.error} strokeWidth={2} className="size-4" />
        ),
        loading: (
          <HugeiconsIcon icon={toastIcons.loading} strokeWidth={2} className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }