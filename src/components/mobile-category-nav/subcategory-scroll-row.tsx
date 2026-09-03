import { SubcategoryCard } from "./subcategory-card";
import type { NavGroup } from "@/lib/schemas/navigation";

type SubcategoryScrollRowProps = {
  groups: NavGroup[];
  categorySlug: string;
};

function SubcategoryScrollRow({ groups, categorySlug }: SubcategoryScrollRowProps) {
  return (
    <div className="grid grid-rows-2 grid-flow-col auto-cols-[80px] sm:auto-cols-[96px] gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory px-4 py-3">
      {groups.map((group) => (
        <SubcategoryCard
          key={group.id}
          group={group}
          categorySlug={categorySlug}
        />
      ))}
    </div>
  );
}

export { SubcategoryScrollRow };
