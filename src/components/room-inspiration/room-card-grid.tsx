import { cn } from "@/lib/utils";

import { RoomCard, type RoomCardData } from "./room-card";

export type { RoomCardData } from "./room-card";

type RoomCardGridProps = {
  cards: RoomCardData[];
  className?: string;
};

function RoomCardGrid({ cards, className }: RoomCardGridProps) {
  return (
    <div
      className={cn(
        "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:snap-none lg:grid-cols-6 lg:gap-x-4 lg:overflow-visible lg:pb-0",
        className,
      )}
    >
      {cards.map((card, i) => (
        <RoomCard
          key={card.title + i}
          card={card}
          className="w-40 shrink-0 snap-start sm:w-48 lg:w-full"
        />
      ))}
    </div>
  );
}

export { RoomCardGrid };
