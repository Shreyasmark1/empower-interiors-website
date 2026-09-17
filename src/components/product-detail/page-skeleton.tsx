import { cn } from "@/lib/utils"

type PageSkeletonProps = {
  variant?: "detail" | "generic"
  className?: string
}

function PageSkeleton({ variant = "detail", className }: PageSkeletonProps) {
  return (
    <div
      className={cn("mx-auto w-[94%] max-w-[1280px] md:w-[90%]", className)}
      style={{ paddingTop: "72px" }}
      aria-hidden="true"
    >
      {variant === "detail" ? (
        <div className="flex flex-col gap-12 pb-24 lg:pb-12">
          {/* Breadcrumb bar */}
          <div className="flex items-center gap-3 py-5">
            <div className="h-4 w-16 animate-pulse rounded bg-plum-10" />
            <div className="h-4 w-3 animate-pulse rounded bg-plum-10" />
            <div className="h-4 w-24 animate-pulse rounded bg-plum-10" />
            <div className="h-4 w-3 animate-pulse rounded bg-plum-10" />
            <div className="h-4 w-40 animate-pulse rounded bg-plum-10" />
          </div>

          {/* Hero band */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[58fr_42fr] lg:gap-16">
            <div className="flex flex-col gap-4">
              <div className="aspect-[4/3] w-full animate-pulse rounded-xl bg-plum-10" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square w-full animate-pulse rounded-lg bg-plum-10"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="h-3 w-20 animate-pulse rounded bg-plum-10" />
              <div className="h-8 w-full animate-pulse rounded bg-plum-10" />
              <div className="h-8 w-3/4 animate-pulse rounded bg-plum-10" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-plum-10" />
              <div className="h-28 w-full animate-pulse rounded-xl bg-plum-10" />
              <div className="h-12 w-full animate-pulse rounded-lg bg-plum-10" />
              <div className="h-12 w-full animate-pulse rounded-lg bg-plum-10" />
              <div className="h-12 w-full animate-pulse rounded-lg bg-plum-10" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-col gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="h-5 w-44 animate-pulse rounded bg-plum-10" />
                <div className="h-4 w-full animate-pulse rounded bg-plum-10" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-plum-10" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 py-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-full animate-pulse rounded bg-plum-10"
              style={{ width: `${100 - i * 8}%` }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { PageSkeleton }