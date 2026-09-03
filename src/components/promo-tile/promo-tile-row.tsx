import { cn } from "@/lib/utils";

import { PromoTile, type PromoTileProps } from "./promo-tile";

type PromoTileRowProps = {
  tiles: PromoTileProps[];
  className?: string;
};

function PromoTileRow({ tiles, className }: PromoTileRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {tiles.map((tile, i) => (
        <PromoTile key={i} {...tile} size="sm" />
      ))}
    </div>
  );
}

export { PromoTileRow };
