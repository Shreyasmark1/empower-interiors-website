"use client";

import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore, useState } from "react";

import { HeaderActions } from "@/components/header-actions";
import { Logo, MobileLogo } from "@/components/logo";
import { MegaMenuDesktop } from "@/components/mega-menu-desktop";
import { MobileCategoryNav } from "@/components/mobile-category-nav";
import { MobileMenu } from "@/components/mobile-menu";
import { SearchBar } from "@/components/search-bar";
import {
  CartIcon,
  HugeiconsIcon,
  MenuIcon,
  WishlistIcon,
} from "@/lib/icons";
import { cartService } from "@/lib/services/cart.service";
import { cn } from "@/lib/utils";

type HeaderProps = {
  className?: string;
  onLogin?: () => void;
  onContact?: () => void;
  onWishlist?: () => void;
  onCart?: () => void;
};

function MobileIconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {children}
    </button>
  );
}

function Header({
  className,
  onLogin,
  onContact,
  onWishlist,
  onCart,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const cartCount = useSyncExternalStore(
    cartService.subscribe,
    cartService.getCartCount,
    () => 0,
  );
  const wishlistCount = useSyncExternalStore(
    cartService.subscribe,
    cartService.getWishlistCount,
    () => 0,
  );

  const handleWishlist = onWishlist ?? (() => router.push("/wishlist"));
  const handleCart = onCart ?? (() => router.push("/cart"));

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile layout */}
      <div className="flex w-full flex-col border-b border-border bg-background md:hidden">
        <div className="w-full bg-gradient-to-r from-brand to-brand-magenta py-1.5 text-center text-xs font-bold text-white">
          Free shipping on orders over ₹999
        </div>

        <div className="flex w-full items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <MobileIconButton
              label="Open menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <HugeiconsIcon
                icon={MenuIcon}
                strokeWidth={2}
                className="size-6 shrink-0"
              />
            </MobileIconButton>
            <MobileLogo className="h-8 w-8" />
          </div>

          <div className="flex items-center gap-4">
            <MobileIconButton label="Wishlist" onClick={handleWishlist}>
              <HugeiconsIcon
                icon={WishlistIcon}
                strokeWidth={2}
                className="size-6 shrink-0"
              />
            </MobileIconButton>
            <MobileIconButton label="Cart" onClick={handleCart}>
              <CartIcon className="size-6 shrink-0" />
            </MobileIconButton>
          </div>
        </div>

        <div className="px-4 pt-1 pb-3">
          <SearchBar className="w-full" />
        </div>

        <MobileCategoryNav />
      </div>

      {/* Mobile slide-in menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogin={onLogin}
      />

      {/* Desktop layout */}
      <div className="relative hidden w-full md:block sticky top-0 z-30 bg-background">
        <header
          className={cn(
            "w-full grid-cols-3 items-center border-b border-border bg-background px-4 py-4 sm:px-6 lg:px-8 md:grid",
            className,
          )}
        >
         

          <div className="min-w-0 px-4">
            <SearchBar />
          </div>

           <Logo className="shrink-0 text-2xl" />

          <HeaderActions
            className="justify-self-end"
            onLogin={onLogin}
            onContact={onContact}
            onWishlist={handleWishlist}
            onCart={handleCart}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
          />
        </header>

        <MegaMenuDesktop />
      </div>
    </>
  );
}

export { Header };
