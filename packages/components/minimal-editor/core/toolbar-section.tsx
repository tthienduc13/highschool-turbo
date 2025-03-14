import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import type { toggleVariants } from "@highschool/ui/components/ui/toggle";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { cn } from "@highschool/ui/lib/utils";
import { IconCaretDown } from "@tabler/icons-react";

import { getShortcutKey } from "../utils/utils";
import { FormatAction } from "../ui/types";

import { ShortcutKey } from "./shortcut-key";
import { ToolbarButton } from "./toolbar-button";

interface ToolbarSectionProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  actions: FormatAction[];
  activeActions?: string[];
  mainActionCount?: number;
  dropdownIcon?: React.ReactNode;
  dropdownTooltip?: string;
  dropdownClassName?: string;
}

export const ToolbarSection: React.FC<ToolbarSectionProps> = ({
  editor,
  actions,
  activeActions = actions.map((action) => action.value),
  mainActionCount = 0,
  dropdownIcon,
  dropdownTooltip = "More options",
  dropdownClassName = "w-12",
  size,
  variant,
}) => {
  const { mainActions, dropdownActions } = React.useMemo(() => {
    const sortedActions = actions
      .filter((action) => activeActions.includes(action.value))
      .sort(
        (a, b) =>
          activeActions.indexOf(a.value) - activeActions.indexOf(b.value),
      );

    return {
      mainActions: sortedActions.slice(0, mainActionCount),
      dropdownActions: sortedActions.slice(mainActionCount),
    };
  }, [actions, activeActions, mainActionCount]);

  const renderToolbarButton = React.useCallback(
    (action: FormatAction) => (
      <ToolbarButton
        key={action.label}
        aria-label={action.label}
        disabled={!action.canExecute(editor)}
        isActive={action.isActive(editor)}
        size={size}
        tooltip={`${action.label} ${action.shortcuts.map((s) => getShortcutKey(s).symbol).join(" ")}`}
        variant={variant}
        onClick={() => action.action(editor)}
      >
        {action.icon}
      </ToolbarButton>
    ),
    [editor, size, variant],
  );

  const renderDropdownMenuItem = React.useCallback(
    (action: FormatAction) => (
      <DropdownMenuItem
        key={action.label}
        aria-label={action.label}
        className={cn("flex flex-row items-center justify-between gap-4", {
          "bg-accent": action.isActive(editor),
        })}
        disabled={!action.canExecute(editor)}
        onClick={() => action.action(editor)}
      >
        <span className="grow">{action.label}</span>
        <ShortcutKey keys={action.shortcuts} />
      </DropdownMenuItem>
    ),
    [editor],
  );

  const isDropdownActive = React.useMemo(
    () => dropdownActions.some((action) => action.isActive(editor)),
    [dropdownActions, editor],
  );

  return (
    <>
      {mainActions.map(renderToolbarButton)}
      {dropdownActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ToolbarButton
              aria-label={dropdownTooltip}
              className={cn(dropdownClassName)}
              isActive={isDropdownActive}
              size={size}
              tooltip={dropdownTooltip}
              variant={variant}
            >
              {dropdownIcon || <IconCaretDown className="size-5" />}
            </ToolbarButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-full">
            {dropdownActions.map(renderDropdownMenuItem)}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default ToolbarSection;
