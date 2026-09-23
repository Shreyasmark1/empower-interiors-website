"use client"

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Category, ProductDetailRow, ProductRow } from "@/lib/schemas";
import { createOrUpdate } from "../../_lib/crud";
import { AdminApiError } from "../../_lib/api";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isJson(value: string): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(500),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(500)
    .regex(slugRegex, "Use lowercase letters, numbers, and hyphens"),
  thumbnail: z.string(),
  brandName: z.string().max(255),
  description: z.string(),
  shortDescription: z.string(),
  minPrice: z.string().refine(
    (value) =>
      value.trim() === "" ||
      (!Number.isNaN(Number(value)) && Number(value) > 0),
    "Enter a positive number"
  ),
  mrpPrice: z.string().refine(
    (value) =>
      value.trim() === "" ||
      (!Number.isNaN(Number(value)) && Number(value) > 0),
    "Enter a positive number"
  ),
  badges: z.string(),
  specifications: z.string().refine(
    (value) => value.trim() === "" || isJson(value),
    "Invalid JSON"
  ),
  isActive: z.boolean(),
  categoryIds: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

const emptyValues: FormValues = {
  name: "",
  slug: "",
  thumbnail: "",
  brandName: "",
  description: "",
  shortDescription: "",
  minPrice: "",
  mrpPrice: "",
  badges: "",
  specifications: "",
  isActive: true,
  categoryIds: [],
};

function toFormValues(product: ProductDetailRow): FormValues {
  return {
    name: product.name,
    slug: product.slug,
    thumbnail: product.thumbnail ?? "",
    brandName: product.brandName ?? "",
    description: product.description ?? "",
    shortDescription: product.shortDescription ?? "",
    minPrice: product.minPrice === null ? "" : String(product.minPrice),
    mrpPrice: product.mrpPrice === null ? "" : String(product.mrpPrice),
    badges: product.badges.join(", "),
    specifications:
      product.specifications && Object.keys(product.specifications).length > 0
        ? JSON.stringify(product.specifications, null, 2)
        : "",
    isActive: product.isActive,
    categoryIds: product.categories.map((category) =>
      String(category.id)
    ),
  };
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

interface ProductFormProps {
  categories: Category[];
  initial?: ProductDetailRow | null;
}

export function ProductForm({ categories, initial }: ProductFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (initial) {
      form.reset(toFormValues(initial));
    }
  }, [initial, form]);

  function generateSlug() {
    const name = form.getValues("name");
    if (!name.trim()) return;
    form.setValue("slug", slugify(name), { shouldValidate: true });
  }

  async function onSubmit(values: FormValues) {
    const payload: Record<string, unknown> = {
      name: values.name,
      slug: values.slug,
      thumbnail: values.thumbnail.trim() || undefined,
      brandName: values.brandName.trim() || null,
      description: values.description.trim() || undefined,
      shortDescription: values.shortDescription.trim() || null,
      minPrice:
        values.minPrice.trim() === ""
          ? null
          : Number(values.minPrice),
      mrpPrice:
        values.mrpPrice.trim() === ""
          ? null
          : Number(values.mrpPrice),
      badges: values.badges
        .split(",")
        .map((badge) => badge.trim())
        .filter(Boolean),
      specifications:
        values.specifications.trim() === ""
          ? {}
          : (JSON.parse(values.specifications) as Record<string, unknown>),
      isActive: values.isActive,
    };
    if (isEdit && initial) {
      payload.id = initial.id;
    }

    try {
      const product = await createOrUpdate<ProductRow>("/products", payload);
      await createOrUpdate("/product-categories", {
        productId: product.id,
        categoryIds: values.categoryIds.map(Number),
      });
      toast.success(isEdit ? "Product updated" : "Product created");
      router.push("/admin/products");
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Walnut sideboard" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input placeholder="walnut-sideboard" {...field} />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateSlug}
                  >
                    Generate
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Used in the URL. Lowercase letters, numbers, and hyphens.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://…"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Image upload is not available yet; paste a URL for now.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand name</FormLabel>
                <FormControl>
                  <Input placeholder="Empower Home" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mrpPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MRP list price (₹)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="64999"
                    inputMode="numeric"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Shown as the struck-out list price when a discount applies.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Optional short description"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="One-line product summary for the detail page"
                  rows={2}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="badges"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Badges</FormLabel>
              <FormControl>
                <Input
                  placeholder="Best Seller, New Arrival"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Comma-separated. Only values supported by the storefront are shown.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="minPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum price (₹)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="54999"
                    inputMode="numeric"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="specifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specifications (JSON)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={'{\n  "material": "Solid wood",\n  "width": "180 cm"\n}'}
                  rows={6}
                  spellCheck={false}
                  className="font-mono text-xs"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Optional key/value pairs shown on the product detail page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              {categories.length === 0 ? (
                <FormDescription>
                  No categories yet.{" "}
                  <Link
                    href="/admin/categories/new"
                    className="text-primary hover:underline"
                  >
                    Create one
                  </Link>{" "}
                  before linking products.
                </FormDescription>
              ) : (
                <div className="grid max-h-48 gap-0.5 overflow-y-auto rounded-md border p-2">
                  {categories.map((category) => {
                    const checked = field.value.includes(
                      String(category.id)
                    );
                    return (
                      <label
                        key={category.id}
                        className="flex cursor-pointer items-center gap-2 rounded p-1.5 text-sm hover:bg-muted/50"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => {
                            const next = checked
                              ? field.value.filter(
                                  (value) => value !== String(category.id)
                                )
                              : [...field.value, String(category.id)];
                            field.onChange(next);
                          }}
                        />
                        {category.name}
                      </label>
                    );
                  })}
                </div>
              )}
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
                : "Create product"}
          </Button>
          <Button type="button" variant="ghost" asChild>
            <Link href="/admin/products">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}