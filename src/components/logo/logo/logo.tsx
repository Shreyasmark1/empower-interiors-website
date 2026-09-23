import { cn } from "@/lib/utils"

function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex justify-center bg-(image:--bg-logo-gradient) bg-clip-text font-bold tracking-tight text-transparent",
        className,
      )}
    >
      Empower Interiors
    </span>
  )
}

export { Logo }
