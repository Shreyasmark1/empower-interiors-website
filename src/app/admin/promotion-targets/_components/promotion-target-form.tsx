"use client"

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type {
  Category,
  ProductRow,
  PromotionRow,
  PromotionTargetRow,
} from "@/lib/schemas";
import { createOrUpdate } from "../../_lib/crud";
import { AdminApiError } from "../../_lib/api";

const targetTypeLabels: Record<
  "homepage" | "category" | "product",
  string
> = {
  homepage: "Homepage",
  category: "Category",
  product: "Product",
};

const formSchema = z
  .object({
    promotionId: z
      .string()
      .refine((value) => value !== "none", "Select a promotion"),
    targetType: z.enum(["homepage", "category", "product"]),
    categoryId: z.string(),
    productId: z.string(),
    placement: z.enum(["hero", "banner", "section"]),
    sortOrder: z.coerce.number().int().min(0).default(0),
  })
  .superRefine((values, ctx) => {
    if (
      values.targetType === "category" &&
      values.categoryId === "none"
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["categoryId"],
        message: "Select a category",
      });
    }
    if (
      values.targetType === "product" &&
      values.productId === "none"
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["productId"],
        message: "Select a product",
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

const emptyValues: FormValues = {
  promotionId: "none",
  targetType: "homepage",
  categoryId: "none",
  productId: "none",
  placement: "banner",
  sortOrder: 0,
};

function toFormValues(target: PromotionTargetRow): FormValues {
  return {
    promotionId: String(target.promotionId),
    targetType: target.targetType,
    categoryId:
      target.categoryId === null ? "none" : String(target.categoryId),
    productId: target.productId === null ? "none" : String(target.productId),
    placement: target.placement,
    sortOrder: target.sortOrder,
  };
}

interface PromotionTargetFormProps {
  promotions: PromotionRow[];
  categories: Category[];
  products: ProductRow[];
  initial?: PromotionTargetRow | null;
}

export function PromotionTargetForm({
  promotions,
  categories,
  products,
  initial,
}: PromotionTargetFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: emptyValues,
  });

  const targetType = useWatch({ control: form.control, name: "targetType" });

  useEffect(() => {
    if (initial) {
      form.reset(toFormValues(initial));
      return;
    }
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const promotionId = params.get("promotionId");
      if (promotionId) {
        form.setValue("promotionId", promotionId);
      }
    }
  }, [initial, form]);

  async function onSubmit(values: FormValues) {
    const payload: Record<string, unknown> = {
      promotionId: Number(values.promotionId),
      targetType: values.targetType,
      categoryId:
        values.targetType === "category" && values.categoryId !== "none"
          ? Number(values.categoryId)
          : null,
      productId:
        values.targetType === "product" && values.productId !== "none"
          ? Number(values.productId)
          : null,
      placement: values.placement,
      sortOrder: values.sortOrder,
    };
    if (isEdit && initial) {
      payload.id = initial.id;
    }

    try {
      await createOrUpdate("/promotion-targets", payload);
      toast.success(isEdit ? "Target updated" : "Target created");
      router.push("/admin/promotion-targets");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof AdminApiError ? error.message : "Save failed"
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid max-w-[36rem] gap-4"
      >
        <FormField
          control={form.control}
          name="promotionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Promotion</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a promotion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none" disabled>
                    Select a promotion
                  </SelectItem>
                  {promotions.map((promotion) => (
                    <SelectItem
                      key={promotion.id}
                      value={String(promotion.id)}
                    >
                      {promotion.title || promotion.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="targetType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target type</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(
                      ["homepage", "category", "product"] as const
                    ).map((type) => (
                      <SelectItem key={type} value={type}>
                        {targetTypeLabels[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="placement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placement</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hero">Hero</SelectItem>
                    <SelectItem value="banner">Banner</SelectItem>
                    <SelectItem value="section">Section</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {targetType === "category" && (
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none" disabled>
                      Select a category
                    </SelectItem>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={String(category.id)}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {targetType === "product" && (
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none" disabled>
                      Select a product
                    </SelectItem>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={String(product.id)}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {targetType === "homepage" && (
          <p className="text-sm text-muted-foreground">
            Targets the whole homepage.
          </p>
        )}

        <FormField
          control={form.control}
          name="sortOrder"
          render={({ field }) => (
            <FormItem className="sm:max-w-[12rem]">
              <FormLabel>Sort order</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormDescription>
                Relative order within the same placement.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "Saving…"
              : isEdit
                ? "Save changes"
                : "Create target"}
          </Button>
          <Button type="button" variant="ghost" asChild>
            <Link href="/admin/promotion-targets">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}