import Link from "next/link";

import { cn } from "@/lib/utils";

type DealsCTAProps = {
  heading?: string;
  scriptLine1?: string;
  scriptLine2?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
};

function DealsCTA({
  heading = "Explore More Deals",
  scriptLine1 = "What the",
  scriptLine2 = "Empower deals",
  ctaText = "Shop Now",
  ctaLink = "/deals",
  className,
}: DealsCTAProps) {
  return (
    <div className={cn("flex h-full w-full flex-col", className)}>
      {/* Gradient block */}
      <div className="flex aspect-square w-full flex-col items-center justify-center rounded-md bg-(image:--bg-hero-gradient) p-4 text-center">
        <span className="font-script text-2xl italic leading-tight text-white sm:text-3xl">
          {scriptLine1}
        </span>
        <span className="font-script text-3xl italic leading-tight text-white sm:text-4xl">
          {scriptLine2}
        </span>
      </div>

      {/* Below gradient */}
      <div className="flex flex-col gap-1.5 pt-3 text-start">
        <h3 className="truncate text-sm font-semibold text-foreground">
          {heading}
        </h3>
        <Link
          href={ctaLink}
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {ctaText}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

export { DealsCTA };
