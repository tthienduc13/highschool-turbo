import type { TooltipContentProps } from "@radix-ui/react-tooltip";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@highschool/ui/components/ui/tooltip";
import { Toggle } from "@highschool/ui/components/ui/toggle";
import { cn } from "@highschool/ui/lib/utils";

interface ToolbarButtonProps
  extends React.ComponentPropsWithoutRef<typeof Toggle> {
  isActive?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipContentProps;
}

export const ToolbarButton = React.forwardRef<
  HTMLButtonElement,
  ToolbarButtonProps
>(
  (
    { isActive, children, tooltip, className, tooltipOptions, ...props },
    ref,
  ) => {
    const toggleButton = (
      <Toggle
        ref={ref}
        className={cn("size-8 p-0", { "bg-accent": isActive }, className)}
        size="sm"
        {...props}
      >
        {children}
      </Toggle>
    );

    if (!tooltip) {
      return toggleButton;
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{toggleButton}</TooltipTrigger>
        <TooltipContent {...tooltipOptions}>
          <div className="flex flex-col items-center text-center">
            {tooltip}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  },
);

ToolbarButton.displayName = "ToolbarButton";

export default ToolbarButton;
