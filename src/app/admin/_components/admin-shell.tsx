"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BoxIcon,
  DashboardSquare02Icon,
  Layers01Icon,
  Logout01Icon,
  MarketingIcon,
  PackageIcon,
  PromotionIcon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface AdminShellUser {
  id: number;
  role: string;
  email?: string;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: DashboardSquare02Icon, exact: true },
  { href: "/admin/categories", label: "Categories", icon: Layers01Icon, exact: false },
  { href: "/admin/products", label: "Products", icon: PackageIcon, exact: false },
  { href: "/admin/variants", label: "Variants", icon: BoxIcon, exact: false },
  { href: "/admin/promotions", label: "Promotions", icon: PromotionIcon, exact: false },
  { href: "/admin/promotion-targets", label: "Promotion Targets", icon: MarketingIcon, exact: false },
] as const;

export function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: AdminShellUser | null;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    router.replace("/admin/login");
    router.refresh();
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-svh bg-muted/30 md:grid md:grid-cols-[16rem_1fr]">
      <aside className="flex flex-col gap-6 border-b border-border bg-card p-4 md:min-h-svh md:border-r md:border-b-0">
        <div className="flex items-center gap-2 px-2">
          <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <HugeiconsIcon icon={DashboardSquare02Icon} strokeWidth={2} className="size-5" />
          </div>
          <div className="leading-tight">
            <p className="font-heading text-base font-semibold text-primary">
              Empower
            </p>
            <p className="text-xs text-muted-foreground">Admin Console</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ href, label, icon, exact }) => {
            const active = exact
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                data-active={active}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  "data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                )}
              >
                <HugeiconsIcon icon={icon} strokeWidth={2} className="size-4.5" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto hidden md:block">
          <Separator className="mb-4" />
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm text-muted-foreground">
              {user?.email ?? "Admin"}
            </p>
            <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign out">
              <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} className="size-4" />
              <span className="sr-only">Sign out</span>
            </Button>
          </div>
        </div>
      </aside>

      <main className="min-w-0">
        <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3 md:hidden">
          <p className="font-heading text-sm font-semibold text-primary">
            Empower Admin
          </p>
          <Button variant="ghost" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
        <div className="px-4 py-6 md:px-8 md:py-8">{children}</div>
      </main>
    </div>
  );
}