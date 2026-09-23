"use client"

import * as React from "react"
import { Box } from "lucide-react"

import { cn } from "@/lib/utils"

type View3DProps = {
  modelUrl?: string
  productName: string
  className?: string
}

declare global {
  interface Window {
    modelViewerLoaded?: boolean
  }
}

function View3D({ modelUrl, productName, className }: View3DProps) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    if (!modelUrl || window.modelViewerLoaded) return

    const script = document.createElement("script")
    script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
    script.async = true
    script.onload = () => {
      window.modelViewerLoaded = true
      setReady(true)
    }
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [modelUrl])

  if (!modelUrl) {
    return (
      <div
        className={cn(
          "relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-xl bg-plum-5",
          className
        )}
      >
        <div className="relative">
          <div className="absolute inset-0 -m-6 rounded-2xl bg-gradient-to-tr from-brand-magenta/30 to-transparent" />
          <div className="relative grid size-24 place-items-center rounded-xl border border-brand-magenta/30 bg-surface-alt shadow-md">
            <Box className="size-10 text-brand-magenta" strokeWidth={1.3} />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">3D preview coming soon</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Rotate {productName} in full detail once the model is ready
          </p>
        </div>
      </div>
    )
  }

  const model = React.createElement(
    "model-viewer",
    {
      src: modelUrl,
      alt: `${productName} 3D model`,
      "auto-rotate": "",
      "camera-controls": "",
      style: { width: "100%", height: "100%" },
    } as React.HTMLAttributes<HTMLElement> & Record<string, unknown>,
    null
  )

  return (
    <div className={cn("aspect-[4/5] w-full overflow-hidden rounded-xl bg-plum-5", className)}>
      {ready ? model : null}
    </div>
  )
}

export { View3D }