import Link from "next/link";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const SHOP_LINKS = [
  { label: "Seating", href: "/seating" },
  { label: "Dining", href: "/dining" },
  { label: "Lighting", href: "/lighting" },
  { label: "Storage", href: "/storage" },
  { label: "Home Decor", href: "/decor" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Room Inspiration", href: "/room-inspiration" },
  { label: "Fresh Finds", href: "/fresh-finds" },
  { label: "Deals", href: "/deals" },
  { label: "Contact", href: "/contact" },
];

const HELP_LINKS = [
  { label: "Track Order", href: "/track-order" },
  { label: "Shipping & Returns", href: "/shipping" },
  { label: "FAQs", href: "/faqs" },
  { label: "Care Guide", href: "/care-guide" },
];

type FooterProps = {
  className?: string;
};

function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("mt-8 border-t border-border bg-surface-canvas", className)}>
      <div className="mx-auto w-[94%] max-w-[1920px] md:w-[90%] xl:w-[88%]">
        <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Logo className="text-2xl" />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Curated furniture and home decor to help you design spaces you love —
              thoughtfully sourced and delivered to your door.
            </p>
          </div>

          {/* Shop */}
          <FooterColumn title="Shop" links={SHOP_LINKS} />

          {/* Company */}
          <FooterColumn title="Company" links={COMPANY_LINKS} />

          {/* Help */}
          <FooterColumn title="Help" links={HELP_LINKS} />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-5 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Empower Interiors. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="/sitemap" className="transition-colors hover:text-foreground">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-semibold tracking-wide text-foreground uppercase">
        {title}
      </h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label + link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Footer };
