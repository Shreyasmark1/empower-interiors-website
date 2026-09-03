"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

function PromoBanner({
  texts = [
    "Free shipping on orders over ₹999",
    "Monsoon Sale — Flat 20% off lighting",
    "New arrivals every week",
  ],
  interval = 10_000,
  className,
}: {
  texts?: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % texts.length),
      interval,
    );
    return () => clearInterval(id);
  }, [texts.length, interval]);

  return (
    <div
      role="banner"
      className={cn(
        "bg-(image:--bg-banner-gradient) flex items-center justify-center py-3 text-xm font-medium tracking-wide text-white",
        className,
      )}
    >
      <span key={index} className="animate-in fade-in fill-mode-forwards">
        {texts[index]}
      </span>
    </div>
  );
}

export { PromoBanner };
