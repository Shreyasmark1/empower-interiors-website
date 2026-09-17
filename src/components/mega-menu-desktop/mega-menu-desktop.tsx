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
      className="group relative block h-[340px] w-full overflow-hidden rounded-lg"
      onClick={() => {}}
    >
      <Image
        src={banner.imageUrl}
        alt={banner.title}
        fill
        className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
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
  const promoBanners = (activeCategory?.promoBanners ?? []).slice(0, 2);
  const listColClass =
    promoBanners.length === 0
      ? "col-span-9"
      : promoBanners.length === 1
        ? "col-span-7"
        : "col-span-5";

  if (categories.length === 0) return null;

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative hidden w-full border-b border-border bg-background md:block",
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

      {/* Dropdown drawer — full height below the nav trigger */}
      {isOpen && activeCategory ? (
        <div
          className="fixed inset-x-0 z-40"
          style={{ top: drawerTop, bottom: 0 }}
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handlePanelLeave}
        >
          {/* Blurred, dimmed backdrop over the viewport below the nav bar */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Panel constrained to the site container width */}
          <Container className="relative h-full">
            <div className="box-border grid h-full w-full max-w-full grid-cols-9 grid-rows-1 gap-8 overflow-y-auto bg-background shadow-2xl">
              {/* Link columns — 9/7/5 columns; fixed 5 tracks per row, excess wraps */}
              <div className={`${listColClass} grid grid-rows-1 grid-cols-5 gap-5`}>
                {activeCategory.groups.map((group) => (
                  <div key={group.id} className="min-w-0 p-5 odd:bg-muted">
                    <Link
                      href={
                        group.href ??
                        `/${activeCategory.slug}/${group.title.toLowerCase().replace(/\s+/g, "-")}`
                      }
                      className="mb-3 block"
                      onClick={() => {
                        setIsOpen(false);
                        setActiveId(null);
                      }}
                    >
                      <h3 className="text-sm font-bold text-foreground transition-colors hover:text-brand">
                        {group.title}
                      </h3>
                    </Link>
                    <ul className="flex flex-col gap-2">
                      {group.items.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            className="flex w-full items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
                            onClick={() => {
                              setIsOpen(false);
                              setActiveId(null);
                            }}
                          >
                            {item.label}
                            {/* {item.badge ? (
                              <span className="inline-flex items-center rounded-full bg-brand/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand">
                                {item.badge}
                              </span>
                            ) : null} */}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Promo cards — each spans 2 of the 9 grid columns */}
              {promoBanners.map((banner, i) => (
                <div
                  key={`${activeCategory.id}-promo-${i}`}
                  className="col-span-2 pr-8 pt-6"
                >
                  <PromoCard banner={banner} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      ) : null}
    </div>
  );
}

export { MegaMenuDesktop };
