import React from "react";

import { cn } from "@highschool/ui/lib/utils";

export interface ClickableProps {
  onClick?: () => void;
  isSelected?: boolean;
  evaluation?: boolean;
  disabled?: boolean;
  hasIcon?: boolean;
  children: React.ReactNode;
}

export const Clickable: React.FC<ClickableProps> = ({
  onClick,
  isSelected,
  evaluation,
  disabled,
  children,
  hasIcon = evaluation !== undefined,
}) => {
  const getBorderColor = () => {
    if (evaluation !== undefined) {
      return evaluation
        ? "border-emerald-500 dark:border-green-800"
        : "border-red-200 dark:border-red-800";
    }
    if (isSelected) {
      return "border-blue-800 dark:border-blue-700";
    }
    return "border-gray-200 dark:border-gray-600";
  };

  const getTextColor = () => {
    if (evaluation !== undefined) {
      return evaluation
        ? "text-green-600 dark:text-green-200"
        : "text-red-600 dark:text-red-200";
    }
    if (isSelected) {
      return "text-blue-800 dark:text-blue-700";
    }
    return "text-gray-600 dark:text-gray-200";
  };

  return (
    <button
      className={cn(
        "overflow-anywhere h-full w-full justify-start rounded-xl border-2 bg-transparent px-6 py-4",
        getBorderColor(),
        getTextColor(),
        disabled
          ? "pointer-events-none opacity-70"
          : "hover:bg-gray-50 dark:hover:bg-gray-800",
        hasIcon ? "px-4" : "px-6",
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
