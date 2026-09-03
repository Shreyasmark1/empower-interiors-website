import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-md border border-border bg-card shadow-sm",
        className
      )}
    >
      <div className="aspect-[4/5] w-full">
        <Skeleton className="h-full w-full rounded-none border-0" />
      </div>
      <div className="flex flex-col gap-2.5 p-4">
        <Skeleton className="h-5 w-20 rounded-[6px]" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-[26px] w-16" />
        <Skeleton className="h-11 w-full rounded-md" />
      </div>
    </div>
  )
}

export { SkeletonCard }