import { cn } from "@/lib/utils";

import { AnnouncementStrip } from "@/components/announcement-strip";

type TextStripProps = {
  text: string;
  image?: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  className?: string;
};

function TextStrip({ text, image, className }: TextStripProps) {
  return (
    <div
      className={cn(
        "flex flex-col w-full items-center justify-center gap-3 bg-gradient-brand px-4 py-3",
        className,
      )}
    >
      <h1 className="text-center text-xl font-semibold bg-(image:--bg-hero-gradient) text-transparent bg-clip-text">
        {text}
      </h1>

      {image ? (
        <AnnouncementStrip
          src={image.src}
          alt={image.alt}
          width={image?.width}
          height={image?.height}
          className="w-full"
        />
      ) : null}
    </div>
  );
}

export { TextStrip };
