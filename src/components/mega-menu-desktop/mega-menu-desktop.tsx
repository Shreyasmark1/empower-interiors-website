"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import type { MainCategory, PromoBanner } from "@/lib/schemas/navigation";

const HOVER_OPEN_DELAY = 80;
const HOVER_CLOSE_DELAY = 180;

function PromoCard({ banner }: { banner: PromoBanner }) {
  return (
    <Link
      href={banner.ctaUrl}
      className="group relative block aspect-2/3 w-full overflow-hidden rounded-lg"
      onClick={() => {}}
    >
      <Image
        src={banner.imageUrl}
        alt={banner.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {banner.subtitle ? (
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/80">
            {banner.subtitle}
          </p>
        ) : null}
        <h4 className="mb-3 text-lg font-bold text-white">{banner.title}</h4>
        <span className="inline-flex w-fit items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-white/90">
          {banner.ctaText}
        </span>
      </div>
    </Link>
  );
}

function groupGridCols(count: number): string {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-2";
  return "grid-cols-3";
}

function MegaMenuDesktop({ className }: { className?: string }) {
  const [categories, setCategories] = useState<MainCategory[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [drawerTop, setDrawerTop] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/navigation")
      .then((r) => r.json())
      .then((data: MainCategory[]) => {
        if (!cancelled) setCategories(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !rootRef.current) return;
    const updateTop = () => {
      const rect = rootRef.current?.getBoundingClientRect();
      if (rect) setDrawerTop(rect.bottom);
    };
    updateTop();
    window.addEventListener("resize", updateTop);
    window.addEventListener("scroll", updateTop, { passive: true });
    return () => {
      window.removeEventListener("resize", updateTop);
      window.removeEventListener("scroll", updateTop);
    };
  }, [isOpen, activeId]);

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  function handleCategoryEnter(id: string) {
    clearTimers();
    openTimer.current = setTimeout(() => {
      setActiveId(id);
      setIsOpen(true);
    }, HOVER_OPEN_DELAY);
  }

  function handleCategoryLeave() {
    clearTimers();
    closeTimer.current = setTimeout(() => {
      setIsOpen(false);
      setActiveId(null);
    }, HOVER_CLOSE_DELAY);
  }

  function handlePanelEnter() {
    clearTimers();
  }

  function handlePanelLeave() {
    closeTimer.current = setTimeout(() => {
      setIsOpen(false);
      setActiveId(null);
    }, HOVER_CLOSE_DELAY);
  }

  const activeCategory = categories.find((c) => c.id === activeId);

  if (categories.length === 0) return null;

  return (
    <div
      ref={rootRef}
      className={cn(
        "hidden w-full border-b border-border bg-background md:block",
        className,
      )}
      onMouseLeave={handlePanelLeave}
    >
      {/* Nav bar */}
      <Container>
        <nav className="flex w-full items-center justify-center gap-0 px-4 sm:px-6 lg:px-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="relative"
            onMouseEnter={() => handleCategoryEnter(cat.id)}
            onMouseLeave={handleCategoryLeave}
          >
            <Link
              href={`/${cat.slug}`}
              className={cn(
                "relative px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center",
                activeId === cat.id
                  ? "text-brand"
                  : "text-foreground hover:text-brand",
              )}
              onClick={() => {
                setIsOpen(false);
                setActiveId(null);
              }}
            >
              {cat.name}
              {activeId === cat.id && isOpen ? (
                <span className="absolute inset-x-4 -bottom-[1px] h-0.5 bg-brand" />
              ) : null}
            </Link>
          </div>
        ))}
      </nav>
      </Container>

      {/* Dropdown drawer */}
      {isOpen && activeCategory ? (
        <div
          className="fixed inset-x-0 z-40"
          style={{ top: drawerTop, bottom: 0 }}
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handlePanelLeave}
        >
          {/* Gray backdrop over full viewport */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Drawer panel constrained inside the container */}
          <Container className="relative h-full">
            <div className="h-full bg-background shadow-2xl">
              <div className="grid h-full w-full grid-cols-3 gap-8 px-4 py-8 sm:px-6 lg:px-8">
            {/* Categories — 2/3 width */}
            <div
              className={cn(
                "col-span-2 grid gap-8",
                groupGridCols(activeCategory.groups.length),
              )}
            >
              {activeCategory.groups.map((group) => (
                <div key={group.id}>
                  <h3 className="mb-3 text-sm font-bold text-foreground">
                    {group.title}
                  </h3>
                  <ul className="flex flex-col gap-1.5">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
                          onClick={() => {
                            setIsOpen(false);
                            setActiveId(null);
                          }}
                        >
                          {item.label}
                          {item.badge ? (
                            <span className="inline-flex items-center rounded-full bg-brand/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand">
                              {item.badge}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Promo banners — 1/3 width */}
            {activeCategory.promoBanners.length > 0 ? (
              <div
                className={cn(
                  "col-span-1",
                  activeCategory.promoBanners.length >= 2
                    ? "grid grid-cols-2 gap-4"
                    : "",
                )}
              >
                {activeCategory.promoBanners.map((banner, i) => (
                  <PromoCard key={`${activeCategory.id}-promo-${i}`} banner={banner} />
                ))}
              </div>
            ) : null}
              </div>
              </div>
            </Container>
        </div>
      ) : null}
    </div>
  );
}

export { MegaMenuDesktop };
