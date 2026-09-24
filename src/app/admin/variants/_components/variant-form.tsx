"use client"

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import type { ProductRow, VariantRow } from "@/lib/schemas";
import {
  VariantFormSchema,
  type VariantFormInput,
  type VariantFormOutput,
} from "@/lib/schemas/form/variant";
import { ImageUploadMulti } from "../../_components/image-upload-multi";
import { createOrUpdate } from "../../_lib/crud";
import { AdminApiError } from "../../_lib/api";

interface VariantFormProps {
  products: ProductRow[];
  initial?: VariantRow | null;
}

function toFormValues(variant: VariantRow): VariantFormInput {
  return {
    productId: String(variant.productId),
    name: variant.name,
    price: String(variant.price),
    images: variant.images,
    sortOrder: String(variant.sortOrder),
    isActive: variant.isActive,
  };
}

export function VariantForm({ products, initial }: VariantFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const emptyValues: VariantFormInput = {
    productId: "none",
    name: "",
    price: "",
    images: [],
    sortOrder: "0",
    isActive: true,
  };

  const form = useForm<VariantFormInput, unknown, VariantFormOutput>({
    resolver: zodResolver(VariantFormSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (initial) {
      form.reset(toFormValues(initial));
      return;
    }
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const productId = params.get("productId");
      if (productId) {
        form.setValue("productId", productId);
      }
    }
  }, [initial, form]);

  async function onSubmit(values: VariantFormOutput) {
    const payload = isEdit && initial ? { ...values, id: initial.id } : values;

    try {
      await createOrUpdate("/variants", payload);
      toast.success(isEdit ? "Variant updated" : "Variant created");
      router.push("/admin/variants");
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

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Charcoal / Large" {...field} />
              </FormControl>
              <FormDescription>
                The size, finish, or color option visible to customers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₹)</FormLabel>
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
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <ImageUploadMulti
                  values={field.value}
                  onChange={field.onChange}
                  folder="variant"
                />
              </FormControl>
              <FormDescription>
                One or many images shown on the product detail gallery.
              </FormDescription>
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

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "Saving…"
              : isEdit
                ? "Save changes"
                : "Create variant"}
          </Button>
          <Button type="button" variant="ghost" asChild>
            <Link href="/admin/variants">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}