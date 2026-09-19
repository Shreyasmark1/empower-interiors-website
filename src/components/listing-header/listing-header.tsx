import { cn } from "@/lib/utils";

type ListingHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

function ListingHeader({ title, description, className }: ListingHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2 items-center justify-center ", className)}>
      <h1 className="text-2xl italic bg-(image:--bg-logo-gradient) text-transparent bg-clip-text sm:text-3xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-5xl mx-auto text-sm leading-relaxed text-center text-muted-foreground mb-4">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export { ListingHeader };
export type { ListingHeaderProps };
