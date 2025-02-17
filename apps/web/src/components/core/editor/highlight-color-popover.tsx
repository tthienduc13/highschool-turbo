import type { Editor } from "@tiptap/core";

import React from "react";
import { useOutsideClick } from "@highschool/hooks";
import { A, Highlight } from "@highschool/lib/editor";
import { Button } from "@highschool/ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@highschool/ui/components/ui/popover";
import { cn } from "@highschool/ui/lib/utils";
import { IconCircle, IconClearFormatting } from "@tabler/icons-react";

export interface HighlightColorPopoverProps {
  activeEditor: Editor | null;
}

export const HighlightColorPopover: React.FC<HighlightColorPopoverProps> = ({
  activeEditor,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isActive = activeEditor?.isActive("highlight");
  const attributes = activeEditor?.getAttributes("highlight");
  const color = isActive ? (attributes?.color as string) : undefined;

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  return (
    <div ref={ref}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className={cn("relative h-6 w-6")}>
            <Button
              className={cn(
                "absolute left-0 top-0 h-full w-full rounded-full",
                isActive && "bg-gray-300",
              )}
              size={"icon"}
              variant={"ghost"}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen((o) => !o);
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              <div className="absolute h-4 w-4">
                <IconCircle size={16} />
                <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                  <div
                    className={`transition-background relative h-[7px] w-[7px] rounded-full duration-200 ease-in-out`}
                    style={{
                      backgroundColor: color ? color.slice(0, 7) : undefined,
                    }}
                  >
                    <div
                      className={`absolute inset-0 h-full w-full rounded-full transition-opacity duration-200 ease-in-out`}
                      style={{
                        opacity: color ? 0 : 1,
                        backgroundImage:
                          "conic-gradient(#FC8181, #F6AD55, #F6E05E, #68D391, #63B3ED)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-[4px]"
          side="top"
          sideOffset={10}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex flex-row items-center gap-x-1">
            {Object.values(Highlight).map((color) => (
              <Button
                key={color}
                aria-label={color}
                className="h-4 w-4"
                size={"icon"}
                variant={"ghost"}
                onClick={() => {
                  activeEditor
                    ?.chain()
                    .focus()
                    .toggleHighlight({ color: color + A })
                    .run();
                  setIsOpen(false);
                }}
                onMouseDown={(e) => e.preventDefault()}
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ background: color }}
                />
              </Button>
            ))}
            <Button
              key={color}
              aria-label={color}
              className="h-4 w-4"
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                activeEditor?.chain().focus().unsetHighlight().run();
                setIsOpen(false);
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              <IconClearFormatting size={16} />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
