"use client";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { AddToCart } from "./add-to-cart";
import {
  buildConsultationHref,
  buildWhatsAppHref,
  CONTACT,
  CTA_OUTLINE,
  CTA_PRIMARY,
} from "./product-detail.constants";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

type ProductCTAProps = {
  name: string;
  roomType: string;
  slug: string;
  image: string;
  price: number;
  wasPrice?: number;
  className?: string;
};

function ProductCTA({
  name,
  roomType,
  slug,
  image,
  price,
  wasPrice,
  className,
}: ProductCTAProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 px-6 py-3 lg:flex-row",
        "sticky bottom-0 z-20 -mx-6 border-t bg-white/92 backdrop-blur-lg",
        "lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none",
        className,
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <AddToCart
        product={{ name, image, price, wasPrice }}
        className="lg:flex-1"
      />
      <a
        href={buildWhatsAppHref(name, roomType)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#22c55e] text-white transition-all duration-200 hover:bg-[#16a34a] lg:w-auto lg:flex-1"
      >
        <WhatsAppIcon className="size-5" />
        Chat on WhatsApp
      </a>
      <div className="flex gap-1 lg:flex-1">
        <Link
          href={buildConsultationHref(slug, roomType)}
          className={cn(CTA_PRIMARY, "flex-1 p-2")}
        >
          <MessageCircle className="size-5" strokeWidth={1.5} />
          Enquire
        </Link>
        <a
          href={CONTACT.telHref}
          aria-label={`Call us at ${CONTACT.phoneDisplay}`}
          className={cn(CTA_OUTLINE, "min-w-12")}
        >
          <Phone className="size-5" strokeWidth={1.5} />
        </a>
      </div>
    </div>
  );
}

export { ProductCTA };
