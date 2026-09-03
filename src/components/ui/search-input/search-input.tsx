import * as React from "react";

import { cn } from "@/lib/utils";
import { iconConfig, SearchIcon } from "@/lib/icons";
import { Input } from "@/components/ui/input";

function SearchInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <div className={cn("relative flex w-full min-w-0", className)}>
      <SearchIcon
        {...iconConfig.standard}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        type="search"
        className={cn(
          "w-full min-w-0 pl-10 focus-visible:pl-10 aria-invalid:pl-10",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { SearchInput };
