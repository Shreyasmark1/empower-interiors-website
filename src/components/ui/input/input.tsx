import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-md border border-input bg-white px-4 py-3 text-sm text-foreground transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[var(--placeholder)] focus-visible:border-2 focus-visible:border-primary focus-visible:px-[15px] focus-visible:py-[11px] focus-visible:shadow-[0_0_3px_rgba(87,0,84,0.1)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--disabled-bg)] disabled:border-[var(--disabled-bg-strong)] disabled:text-[var(--disabled-text)] disabled:placeholder:text-[var(--disabled-text)] aria-invalid:border-2 aria-invalid:border-destructive aria-invalid:px-[15px] aria-invalid:py-[11px] md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
