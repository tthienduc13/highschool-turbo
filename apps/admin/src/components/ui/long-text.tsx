"use client";

import { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@highschool/ui/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@highschool/ui/components/ui/tooltip";
import { cn } from "@highschool/ui/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  lines?: number;
}

export default function LongText({
  children,
  className = "",
  contentClassName = "",
  lines = 1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOverflown, setIsOverflown] = useState(false);

  useEffect(() => {
    if (checkOverflow(ref.current)) {
      setIsOverflown(true);

      return;
    }

    setIsOverflown(false);
  }, []);

  // Create styles for line clamping
  // Create styles for line clamping
  const lineClampStyle =
    lines > 1
      ? {
        display: "-webkit-box",
        WebkitLineClamp: lines,
        WebkitBoxOrient: "vertical" as const,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "normal" as const,
      }
      : {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap" as const,
        overflow: "hidden",
      };

  if (!isOverflown)
    return (
      <div
        ref={ref}
        className={cn(lines === 1 ? "truncate" : "", className)}
        style={lines > 1 ? lineClampStyle : undefined}
      >
        {children}
      </div>
    );

  return (
    <>
      <div className="hidden sm:block">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                ref={ref}
                className={cn(lines === 1 ? "truncate" : "", className)}
                style={lines > 1 ? lineClampStyle : undefined}
              >
                {children}
              </div>
            </TooltipTrigger>
            <TooltipContent className="w-[40vw]">
              <p className={contentClassName}>{children}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="sm:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <div
              ref={ref}
              className={cn(lines === 1 ? "truncate" : "", className)}
              style={lines > 1 ? lineClampStyle : undefined}
            >
              {children}
            </div>
          </PopoverTrigger>
          <PopoverContent className={cn("w-fit", contentClassName)}>
            <p>{children}</p>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

const checkOverflow = (textContainer: HTMLDivElement | null) => {
  if (textContainer) {
    return (
      textContainer.offsetHeight < textContainer.scrollHeight ||
      textContainer.offsetWidth < textContainer.scrollWidth
    );
  }

  return false;
};
