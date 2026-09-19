import type { Metadata } from "next"

import { ConsultationForm } from "@/components/consultation-form"

export const metadata: Metadata = {
  title: "Free Design Consultation | Empower Interiors",
  description:
    "Talk to our design team about a custom product, full interiors or a specific piece for your space.",
}

export default function ConsultationPage() {
  return (
    <main className="mx-auto w-[94%] max-w-[720px] px-6 py-14 md:w-[90%] lg:py-16">
      <p className="text-[0.6875rem] font-semibold tracking-[0.32em] text-brand-magenta uppercase">
        Free Design Consultation
      </p>
      <h1 className="mt-2 text-3xl font-extralight text-foreground lg:text-4xl">
        Let&apos;s design your space together
      </h1>
      <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
        Share a few details and our design team will call you back within 24 hours —
        no obligations, no pressure.
      </p>
      <ConsultationForm className="mt-8" />
    </main>
  )
}