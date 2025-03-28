"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";

import * as React from "react";

import { cn } from "@highschool/ui/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indeterminate?: boolean;
  indicatorColor?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  // React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    { className, indeterminate = false, indicatorColor, value, ...props },
    ref,
  ) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "bg-primary h-full w-full flex-1 transition-all",
          indeterminate && "animate-progress origin-left",
          indicatorColor,
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  ),
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
