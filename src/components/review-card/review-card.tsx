import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Review } from "@/lib/schemas"
import { CheckCircleIcon, StarIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"

function ReviewCard({
  review,
  className,
}: {
  review: Review
  className?: string
}) {
  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="flex flex-col gap-2.5">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon
              key={index}
              size={16}
              strokeWidth={1.5}
              className={cn(
                index < review.rating
                  ? "fill-current text-brand-coral"
                  : "text-muted-foreground/40"
              )}
            />
          ))}
          <span className="ml-1.5 text-sm font-medium text-foreground">
            {review.rating}.0
          </span>
        </div>
        <p className="text-sm leading-[22px] text-foreground">{review.body}</p>
        <div className="flex items-center gap-2 text-xs leading-[18px] text-muted-foreground">
          <span className="font-medium text-foreground">{review.reviewer}</span>
          <span aria-hidden="true">·</span>
          <span>{review.date}</span>
        </div>
        {review.verified && (
          <Badge variant="inStock" className="w-fit">
            <CheckCircleIcon size={12} />
            Verified Purchase
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}

export { ReviewCard }