import * as React from "react";

import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-terminal text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
