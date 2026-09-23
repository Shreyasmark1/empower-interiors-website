"use client"

import { PageHeader } from "../../_components/page-header";
import { PromotionForm } from "../_components/promotion-form";

export default function NewPromotionPage() {
  return (
    <div className="grid max-w-[42rem] gap-6">
      <PageHeader
        title="New promotion"
        description="Create a banner or marketing campaign."
      />
      <PromotionForm />
    </div>
  );
}