import Image from "next/image";
import Link from "next/link";

import type { NavGroup } from "@/lib/schemas/navigation";

type SubcategoryCardProps = {
  group: NavGroup;
  categorySlug: string;
};

function SubcategoryCard({ group, categorySlug }: SubcategoryCardProps) {
  const href = group.href ?? `/${categorySlug}/${group.title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <Link
      href={href}
      className="flex-none w-20 sm:w-24 snap-start cursor-pointer active:scale-95 transition-transform"
    >
      <div className="aspect-square w-full rounded-2xl overflow-hidden bg-muted relative">
        {group.imageUrl ? (
          <Image
            src={group.imageUrl}
            alt={group.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/10 to-brand-magenta/10 text-xs font-bold text-brand">
            {group.title.charAt(0)}
          </div>
        )}
      </div>
      <p className="mt-1.5 px-0.5 text-xs text-center font-medium text-foreground line-clamp-2">
        {group.title}
      </p>
    </Link>
  );
}

export { SubcategoryCard };
