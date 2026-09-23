import { cn } from "@/lib/utils"

type ResultCountProps = {
  start: number
  end: number
  total: number
  title: string
  className?: string
}

function ResultCount({ start, end, total, title, className }: ResultCountProps) {
  const range = start === end ? `${start}` : `${start}\u2013${end}`

  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      aria-live="polite"
    >
      Showing{" "}
      <span className="font-medium text-foreground">{range}</span> of{" "}
      <span className="font-medium text-foreground">{total}</span>{" "}
      {total === 1 ? "option" : "options"} in{" "}
      <span className="font-medium text-foreground">{title}</span>
    </p>
  )
}

export { ResultCount }
export type { ResultCountProps }