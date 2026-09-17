"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import type { ProductFeatureItem } from "@/lib/schemas"

type ProductFeaturesProps = {
  features: ProductFeatureItem[]
  className?: string
}

function ProductFeatures({ features, className }: ProductFeaturesProps) {
  return (
    <section className={cn("bg-plum-5", className)}>
      <div className="mx-auto w-[94%] max-w-[1280px] py-16 md:w-[90%] lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-12 lg:mb-16"
        >
          <p className="text-[0.6875rem] font-semibold tracking-[0.32em] text-brand-magenta uppercase">
            Why This Piece
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-semibold text-foreground lg:text-4xl">
            Built to last.
            <br />
            Designed to impress.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-x-20 lg:gap-y-14">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                className="flex flex-col gap-3"
              >
                <Icon className="size-6 text-brand-magenta" strokeWidth={1.3} />
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="max-w-md leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { ProductFeatures }