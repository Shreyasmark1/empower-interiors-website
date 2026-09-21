"use client"

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BoxIcon,
  Layers01Icon,
  MarketingIcon,
  PackageIcon,
  PromotionIcon,
} from "@hugeicons/core-free-icons";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const entityCards = [
  {
    href: "/admin/categories",
    title: "Categories",
    description: "Organize products into browsable categories.",
    icon: Layers01Icon,
  },
  {
    href: "/admin/products",
    title: "Products",
    description: "Create and manage catalogue products.",
    icon: PackageIcon,
  },
  {
    href: "/admin/variants",
    title: "Variants",
    description: "Manage product variants and pricing.",
    icon: BoxIcon,
  },
  {
    href: "/admin/promotions",
    title: "Promotions",
    description: "Schedule banners and marketing campaigns.",
    icon: PromotionIcon,
  },
  {
    href: "/admin/promotion-targets",
    title: "Promotion Targets",
    description: "Point promotions at categories or products.",
    icon: MarketingIcon,
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-6">
      <header className="grid gap-1">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your Empower catalogue from here.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entityCards.map(({ href, title, description, icon }) => (
          <Link key={href} href={href} className="group/card">
            <Card className="h-full transition-colors hover:border-primary/40 hover:bg-card">
              <CardHeader>
                <span className="mb-1 flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <HugeiconsIcon icon={icon} strokeWidth={2} className="size-5" />
                </span>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}

        <Link href="/admin/categories/new" className="group/card">
          <Card className="flex h-full flex-col items-start justify-center border-dashed hover:border-primary/40">
            <CardDescription className="font-medium text-primary">
              Create a new category →
            </CardDescription>
          </Card>
        </Link>
      </div>
    </div>
  );
}