import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type PromoTileSize = "sm" | "md";

type PromoTileProps = {
  image: string;
  headline: string;
  ctaText: string;
  ctaLink: string;
  size?: PromoTileSize;
  className?: string;
};

export type { PromoTileSize, PromoTileProps };

const ASPECT: Record<PromoTileSize, string> = {
  sm: "aspect-[550/159]",
  md: "aspect-[831/263]",
};

function PromoTile({
  image,
  headline,
  ctaText,
  ctaLink,
  size = "sm",
  className,
}: PromoTileProps) {
  return (
    <Link
      href={ctaLink}
      className={cn(
        "group relative block w-full overflow-hidden rounded-lg",
        ASPECT[size],
        className,
      )}
    >
      <Image
        src={image}
        alt={headline}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={size === "md" ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

      {/* Content — bottom-left */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 sm:p-5">
        <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
          {headline}
        </h3>
        <span className="inline-flex w-fit items-center rounded-md bg-white px-4 py-1.5 text-sm font-semibold text-brand transition-colors group-hover:bg-brand group-hover:text-white">
          {ctaText}
        </span>
      </div>
    </Link>
  );
}

export { PromoTile };
