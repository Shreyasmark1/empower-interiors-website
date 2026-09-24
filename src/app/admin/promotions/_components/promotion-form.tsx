"use client"

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  PromotionFormSchema,
  type PromotionFormInput,
  type PromotionFormOutput,
} from "@/lib/schemas/form/promotion";
import { ImageUpload } from "../../_components/image-upload";
import { createOrUpdate } from "../../_lib/crud";
import { AdminApiError } from "../../_lib/api";

const emptyValues: PromotionFormInput = {
  name: "",
  title: "",
  description: "",
  image: "",
  mobileImage: "",
  linkUrl: "",
  buttonText: "",
  badgeText: "",
  startsAt: "",
  endsAt: "",
  sortOrder: "0",
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

function toFormValues(promotion: PromotionDetailRow): PromotionFormInput {
  return {
    name: promotion.name,
    title: promotion.title ?? "",
    description: promotion.description ?? "",
    image: promotion.image ?? "",
    mobileImage: promotion.mobileImage ?? "",
    linkUrl: promotion.linkUrl ?? "",
    buttonText: promotion.buttonText ?? "",
    badgeText: promotion.badgeText ?? "",
    startsAt: promotion.startsAt ? toDatetimeLocal(promotion.startsAt) : "",
    endsAt: promotion.endsAt ? toDatetimeLocal(promotion.endsAt) : "",
    sortOrder: String(promotion.sortOrder),
    isActive: promotion.isActive,
  };
}

interface PromotionFormProps {
  initial?: PromotionDetailRow | null;
}

export function PromotionForm({ initial }: PromotionFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const form = useForm<PromotionFormInput, unknown, PromotionFormOutput>({
    resolver: zodResolver(PromotionFormSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (initial) {
      form.reset(toFormValues(initial));
    }
  }, [initial, form]);

  async function onSubmit(values: PromotionFormOutput) {
    const payload = isEdit && initial ? { ...values, id: initial.id } : values;

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
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  folder="promotion"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  folder="promotion"
                  disabled={form.formState.isSubmitting}
                />
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

        <FormField
          control={form.control}
          name="badgeText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Badge text</FormLabel>
              <FormControl>
                <Input placeholder="New Season" {...field} />
              </FormControl>
              <FormDescription>
                Optional label rendered on the hero or banner.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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