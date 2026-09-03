import Image from "next/image";

import { cn } from "@/lib/utils";

type AnnouncementStripProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

function AnnouncementStrip({ src, alt = "", width, height, className }: AnnouncementStripProps) {
  const hasDimensions = typeof width === "number" && typeof height === "number";
  return (
    <div className={cn("w-full", className)}>
      <Image
        src={src}
        alt={alt}
        sizes="100vw"
        width={hasDimensions ? width : undefined}
        height={hasDimensions ? height : undefined}
        className="h-auto w-full"
      />
    </div>
  );
}

export { AnnouncementStrip };
