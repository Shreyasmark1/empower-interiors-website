"use client";

import { useState } from "react";

import { BedIcon, LampIcon, OfficeChairIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

import { CategoryTabs, type RoomCategory } from "./category-tabs";
import { RoomCardGrid, type RoomCardData } from "./room-card-grid";

export type { RoomCategory } from "./category-tabs";
export type { RoomCardData } from "./room-card";

const CATEGORIES: RoomCategory[] = [
  { id: "furniture", label: "Furniture", icon: OfficeChairIcon },
  { id: "mattresses", label: "Mattresses", icon: BedIcon },
  { id: "homeDecor", label: "Home Decor", icon: LampIcon },
];

type RoomInspirationProps = {
  title?: string;
  categories?: RoomCategory[];
  roomsByCategory?: Record<string, RoomCardData[]>;
  className?: string;
};

const DEFAULT_ROOMS: Record<string, RoomCardData[]> = {
  furniture: [
    { image: "https://picsum.photos/seed/room-f1/600/750", title: "Warm Minimalist Living", subtitle: "Shop the Look", href: "/collections/living" },
    { image: "https://picsum.photos/seed/room-f2/600/750", title: "Scandi Dining Room", subtitle: "24 Products", href: "/collections/dining" },
    { image: "https://picsum.photos/seed/room-f3/600/750", title: "Boho Bedroom Edit", subtitle: "Shop the Look", href: "/collections/bedroom" },
    { image: "https://picsum.photos/seed/room-f4/600/750", title: "Classic Study", subtitle: "18 Products", href: "/collections/study" },
    { image: "https://picsum.photos/seed/room-f5/600/750", title: "Urban Office Nook", subtitle: "Shop the Look", href: "/collections/office" },
    { image: "https://picsum.photos/seed/room-f6/600/750", title: "Rustic Heritage Lounge", subtitle: "30 Products", href: "/collections/lounge" },
  ],
  mattresses: [
    { image: "https://picsum.photos/seed/room-m1/600/750", title: "Cloud Comfort Master", subtitle: "Shop the Look", href: "/collections/mattresses" },
    { image: "https://picsum.photos/seed/room-m2/600/750", title: "Serene Guest Room", subtitle: "12 Products", href: "/collections/guest-bedroom" },
    { image: "https://picsum.photos/seed/room-m3/600/750", title: "Twin Bed Retreat", subtitle: "Shop the Look", href: "/collections/retreat" },
    { image: "https://picsum.photos/seed/room-m4/600/750", title: "Luxe King Suite", subtitle: "16 Products", href: "/collections/king" },
    { image: "https://picsum.photos/seed/room-m5/600/750", title: "Minimalist Mattress Room", subtitle: "Shop the Look", href: "/collections/minimalist" },
    { image: "https://picsum.photos/seed/room-m6/600/750", title: "Cozy Nursery Nook", subtitle: "8 Products", href: "/collections/nursery" },
  ],
  homeDecor: [
    { image: "https://picsum.photos/seed/room-d1/600/750", title: "Gallery Wall Vignette", subtitle: "Shop the Look", href: "/collections/decor" },
    { image: "https://picsum.photos/seed/room-d2/600/750", title: "Tabletop Styling", subtitle: "22 Products", href: "/collections/decor" },
    { image: "https://picsum.photos/seed/room-d3/600/750", title: "Ambient Lighting Edit", subtitle: "Shop the Look", href: "/collections/lighting" },
    { image: "https://picsum.photos/seed/room-d4/600/750", title: "Rug & Textile Layers", subtitle: "14 Products", href: "/collections/textiles" },
    { image: "https://picsum.photos/seed/room-d5/600/750", title: "Shelf Styling Study", subtitle: "Shop the Look", href: "/collections/decor" },
    { image: "https://picsum.photos/seed/room-d6/600/750", title: "Tropical Plant Corner", subtitle: "9 Products", href: "/collections/decor" },
  ],
};

function RoomInspiration({ title = "Room Inspiration", categories = CATEGORIES, roomsByCategory = DEFAULT_ROOMS, className }: RoomInspirationProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "furniture");
  const rooms = roomsByCategory[activeId] ?? [];

  return (
    <section className={cn("w-full", className)}>
      {/* Section title */}
      <h2 className="mb-6 text-center text-bold text-3xl bg-(image:--bg-hero-gradient) text-transparent bg-clip-text sm:text-4xl">
        {title}
      </h2>

      <CategoryTabs categories={categories} activeId={activeId} onSelect={setActiveId} className="mb-6" />

      <RoomCardGrid cards={rooms} />
    </section>
  );
}

export { RoomInspiration };
