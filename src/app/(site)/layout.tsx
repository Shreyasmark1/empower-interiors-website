import React from "react";

import { Header } from "@/components/header";
import { PromoBanner } from "@/components/promo-banner";
import { Footer } from "@/components/footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PromoBanner className="hidden md:flex" />
      <Header />
      {children}
      <Footer />
    </>
  );
}