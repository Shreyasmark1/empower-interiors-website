import Link from "next/link"
import { Phone, Mail } from "lucide-react"

import { cn } from "@/lib/utils"

const BRAND_NAME = "Empower Interiors"
const BRAND_TAGLINE = "Crafting spaces that inspire comfort and elegance."

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/empowerinteriors", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/empowerinteriors", icon: "facebook" },
  { label: "Twitter", href: "https://twitter.com/empowerinteriors", icon: "twitter" },
  { label: "YouTube", href: "https://youtube.com/@empowerinteriors", icon: "youtube" },
  { label: "LinkedIn", href: "https://linkedin.com/company/empowerinteriors", icon: "linkedin" },
] as const

const LINK_COLUMNS = [
  {
    title: "Corporate",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    title: "Useful Links",
    links: [
      { label: "Track Order", href: "/track-order" },
      { label: "Store Locator", href: "/stores" },
      { label: "Gift Cards", href: "/gift-cards" },
      { label: "Design Services", href: "/design-services" },
      { label: "Corporate Gifting", href: "/corporate-gifting" },
    ],
  },
  {
    title: "Partner With Us",
    links: [
      { label: "Sell on Empower", href: "/sell-on-empower" },
      { label: "Franchise Enquiry", href: "/franchise" },
      { label: "Interior Designer", href: "/interior-designer" },
      { label: "Affiliate Program", href: "/affiliates" },
    ],
  },
  {
    title: "Need Help?",
    links: [
      { label: "Customer Service", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Warranty", href: "/warranty" },
    ],
  },
  {
    title: "Built Safe",
    links: [
      { label: "Safety Standards", href: "/safety-standards" },
      { label: "Material Certifications", href: "/certifications" },
      { label: "Quality Assurance", href: "/quality" },
      { label: "Child Safety", href: "/child-safety" },
    ],
  },
] as const

const POPULAR_TAGS = [
  "Sofas", "Beds", "Wardrobes", "Dining Tables", "Shoe Racks",
  "Study Tables", "TV Units", "Bookshelves", "Recliners", "Coffee Tables",
] as const

const CITY_TAGS = ["Mangalore", "Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad"] as const

const CONTACT = {
  phone: "+91 80 4567 8900",
  email: "hello@empowerinteriors.com",
} as const

const PAYMENT_METHODS = ["Visa", "Mastercard", "UPI", "Net Banking"] as const

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refunds" },
] as const

const COPYRIGHT_TEXT = `© ${new Date().getFullYear()} Empower Interiors. All rights reserved.`

function SocialIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    instagram:
      "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm4.25 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.25-3.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z",
    facebook:
      "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    twitter:
      "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    youtube:
      "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z",
    linkedin:
      "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d={paths[icon] ?? ""} />
    </svg>
  )
}

type FooterColumnProps = {
  title: string
  links: readonly { label: string; href: string }[]
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-semibold tracking-wide text-foreground uppercase">
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
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
  )
}

type FooterProps = {
  className?: string
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-border bg-surface-canvas text-muted-foreground",
        className
      )}
    >
      <div className="mx-auto w-[94%] max-w-[1920px] md:w-[90%] xl:w-[88%]">
        {/* Row 1: Brand + Socials | Link Columns */}
        <div className="grid grid-cols-1 gap-8 py-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                {BRAND_NAME}
              </h2>
              <p className="max-w-[20rem] text-sm leading-relaxed text-muted-foreground">
                {BRAND_TAGLINE}
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-full bg-plum-5 text-muted-foreground transition-colors hover:bg-brand hover:text-white"
                  >
                    <SocialIcon icon={social.icon} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
              {LINK_COLUMNS.map((col) => (
                <FooterColumn key={col.title} title={col.title} links={col.links} />
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Popular Tags + City Tags */}
        <div className="flex flex-col gap-3 border-t border-border py-6 sm:flex-row sm:items-baseline sm:gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-foreground">Popular:</span>
            {POPULAR_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-plum-5 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-brand hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-foreground">Cities:</span>
            {CITY_TAGS.map((city) => (
              <span
                key={city}
                className="rounded-full bg-plum-5 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-brand hover:text-white"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Row 3: Contact Info + Payment Methods */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-border py-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
            >
              <Phone className="size-4" />
              {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
            >
              <Mail className="size-4" />
              {CONTACT.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-foreground">We accept</span>
            <div className="flex items-center gap-2">
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method}
                  className="rounded bg-plum-5 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4: Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-t border-border py-5 text-sm text-muted-foreground">
          {LEGAL_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-2">
              <Link href={link.href} className="transition-colors hover:text-foreground">
                {link.label}
              </Link>
              {i < LEGAL_LINKS.length - 1 && (
                <span className="text-border">|</span>
              )}
            </span>
          ))}
        </div>

        {/* Row 5: Copyright */}
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          {COPYRIGHT_TEXT}
        </div>
      </div>
    </footer>
  )
}
