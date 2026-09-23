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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { PromotionDetailRow } from "@/lib/schemas";
import { createOrUpdate } from "../../_lib/crud";
import { AdminApiError } from "../../_lib/api";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  title: z.string().max(500),
  description: z.string(),
  image: z.string(),
  mobileImage: z.string(),
  linkUrl: z.string(),
  buttonText: z.string().max(100),
  startsAt: z.string(),
  endsAt: z.string(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const emptyValues: FormValues = {
  name: "",
  title: "",
  description: "",
  image: "",
  mobileImage: "",
  linkUrl: "",
  buttonText: "",
  startsAt: "",
  endsAt: "",
  sortOrder: 0,
  isActive: true,
};

function toDatetimeLocal(iso: string): string {
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

function toFormValues(promotion: PromotionDetailRow): FormValues {
  return {
    name: promotion.name,
    title: promotion.title ?? "",
    description: promotion.description ?? "",
    image: promotion.image ?? "",
    mobileImage: promotion.mobileImage ?? "",
    linkUrl: promotion.linkUrl ?? "",
    buttonText: promotion.buttonText ?? "",
    startsAt: promotion.startsAt ? toDatetimeLocal(promotion.startsAt) : "",
    endsAt: promotion.endsAt ? toDatetimeLocal(promotion.endsAt) : "",
    sortOrder: promotion.sortOrder,
    isActive: promotion.isActive,
  };
}

interface PromotionFormProps {
  initial?: PromotionDetailRow | null;
}

export function PromotionForm({ initial }: PromotionFormProps) {
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

  async function onSubmit(values: FormValues) {
    const payload: Record<string, unknown> = {
      name: values.name,
      title: values.title.trim() || null,
      description: values.description.trim() || null,
      image: values.image.trim() || null,
      mobileImage: values.mobileImage.trim() || null,
      linkUrl: values.linkUrl.trim() || null,
      buttonText: values.buttonText.trim() || null,
      startsAt: values.startsAt
        ? new Date(values.startsAt).toISOString()
        : null,
      endsAt: values.endsAt ? new Date(values.endsAt).toISOString() : null,
      sortOrder: values.sortOrder,
      isActive: values.isActive,
    };
    if (isEdit && initial) {
      payload.id = initial.id;
    }

    try {
      await createOrUpdate("/promotions", payload);
      toast.success(isEdit ? "Promotion updated" : "Promotion created");
      router.push("/admin/promotions");
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
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Winter sale" {...field} />
                </FormControl>
                <FormDescription>Internal label for this promotion.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display title</FormLabel>
                <FormControl>
                  <Input placeholder="Up to 50% off" {...field} />
                </FormControl>
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
                  placeholder="Optional copy shown with the promotion"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://…" {...field} />
                </FormControl>
                <FormDescription>
                  Image upload is not available yet; paste a URL for now.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://…" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="linkUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link URL</FormLabel>
                <FormControl>
                  <Input placeholder="/products/example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="buttonText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button text</FormLabel>
                <FormControl>
                  <Input placeholder="Shop now" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="startsAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starts at</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endsAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ends at</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                : "Create promotion"}
          </Button>
          <Button type="button" variant="ghost" asChild>
            <Link href="/admin/promotions">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}