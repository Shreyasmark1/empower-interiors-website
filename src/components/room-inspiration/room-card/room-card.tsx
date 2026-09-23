import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type RoomCardData = {
  image: string;
  title: string;
  subtitle: string;
  href: string;
};

type RoomCardProps = {
  card: RoomCardData;
  className?: string;
};

function RoomCard({ card, className }: RoomCardProps) {
  return (
    <Link
      href={card.href}
      className={cn(
        "group relative block w-full overflow-hidden rounded-lg bg-surface-alt",
        className,
      )}
    >
      <div className="relative aspect-4/5 w-full">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(max-width: 768px) 50vw, 16vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Frosted glass / blur band at bottom */}
        <div className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-black/45 backdrop-blur-md">
          <div className="flex flex-col items-center gap-0.5 px-2 py-1 text-center">
            <h3 className="text-sm font-sans leading-tight text-white">
              {card.title}
            </h3>
            <span className="text-xs font-sans leading-tight text-white">
              {card.subtitle}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { RoomCard };
