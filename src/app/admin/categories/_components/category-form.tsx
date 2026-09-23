"use client"

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import type { Category } from "@/lib/schemas";
import { createOrUpdate } from "../../_lib/crud";
import { AdminApiError } from "../../_lib/api";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(255)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and hyphens"
    ),
  parentId: z.string(),
  description: z.string(),
  image: z.string(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const emptyValues: FormValues = {
  name: "",
  slug: "",
  parentId: "none",
  description: "",
  image: "",
  sortOrder: 0,
  isActive: true,
};

function toFormValues(category: Category): FormValues {
  return {
    name: category.name,
    slug: category.slug,
    parentId: category.parentId === null ? "none" : String(category.parentId),
    description: category.description ?? "",
    image: category.image ?? "",
    sortOrder: category.sortOrder,
    isActive: category.isActive,
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

interface CategoryFormProps {
  categories: Category[];
  initial?: Category | null;
}

export function CategoryForm({ categories, initial }: CategoryFormProps) {
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

  const parentOptions = categories.filter(
    (category) => category.id !== initial?.id
  );

  function generateSlug() {
    const name = form.getValues("name");
    if (!name.trim()) return;
    form.setValue("slug", slugify(name), { shouldValidate: true });
  }

  async function onSubmit(values: FormValues) {
    const payload: Record<string, unknown> = {
      name: values.name,
      slug: values.slug,
      parentId:
        values.parentId === "none" ? undefined : Number(values.parentId),
      description: values.description.trim() || null,
      image: values.image.trim() || null,
      sortOrder: values.sortOrder,
      isActive: values.isActive,
    };
    if (isEdit && initial) {
      payload.id = initial.id;
    }

    try {
      await createOrUpdate("/categories", payload);
      toast.success(isEdit ? "Category updated" : "Category created");
      router.push("/admin/categories");
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
                <Input placeholder="Bedroom sets" {...field} />
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
                  <Input placeholder="bedroom-sets" {...field} />
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
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent category</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="No parent" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">No parent (top level)</SelectItem>
                  {parentOptions.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
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
            name="sortOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort order</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
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

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "Saving…"
              : isEdit
                ? "Save changes"
                : "Create category"}
          </Button>
          <Button type="button" variant="ghost" asChild>
            <Link href="/admin/categories">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}