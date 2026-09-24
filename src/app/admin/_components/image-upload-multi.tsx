"use client"

import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AdminApiError } from "../_lib/api";
import { toImageSrc, uploadImage } from "../_lib/image";

interface ImageUploadMultiProps {
  values: string[];
  onChange: (values: string[]) => void;
  folder?: string;
}

export function ImageUploadMulti({
  values,
  onChange,
  folder = "product",
}: ImageUploadMultiProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: File[]) {
    const images = files.filter((file) => file.type.startsWith("image/"));
    if (images.length === 0) {
      toast.error("Only image files are allowed");
      return;
    }
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of images) {
        uploaded.push(await uploadImage(file, folder));
      }
      onChange([...values, ...uploaded]);
    } catch (error) {
      toast.error(
        error instanceof AdminApiError ? error.message : "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((value, index) => (
            <div key={value} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={toImageSrc(value)}
                alt={`Image ${index + 1}`}
                className="h-20 w-20 rounded-md border object-cover"
              />
              <button
                type="button"
                aria-label="Remove image"
                disabled={uploading}
                onClick={() =>
                  onChange(values.filter((_, i) => i !== index))
                }
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border bg-background text-sm text-destructive shadow-sm hover:bg-destructive/10"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <Button
          type="button"
          variant="outline"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading…" : "Add images"}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          multiple
          className="hidden"
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            if (files.length > 0) void handleFiles(files);
            event.target.value = "";
          }}
        />
      </div>
    </div>
  );
}