"use client"

import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminApiError } from "../_lib/api";
import { toImageSrc, uploadImage } from "../_lib/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  folder?: string;
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  folder = "product",
  disabled,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    if (uploading || disabled) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    setUploading(true);
    try {
      const imageUrl = await uploadImage(file, folder);
      onChange(imageUrl);
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
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={disabled || uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            disabled={disabled}
            onClick={() => onChange("")}
          >
            Remove
          </Button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleFile(file);
            event.target.value = "";
          }}
        />
      </div>

      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={toImageSrc(value)}
          alt="Uploaded image preview"
          className="h-40 w-full max-w-[16rem] rounded-md border object-cover"
        />
      )}

      <Input
        placeholder="/product/image-id.jpg"
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}