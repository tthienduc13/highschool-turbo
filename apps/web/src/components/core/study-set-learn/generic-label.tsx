"use client";

import React from "react";
import { Label } from "@highschool/ui/components/ui/label";

export interface GenericLabelProps {
  evaluation?: boolean;
  children: React.ReactNode;
}

export const GenericLabel: React.FC<GenericLabelProps> = ({
  evaluation,
  children,
}) => {
  const getColorClass = () => {
    if (evaluation === undefined) return "text-gray-700 dark:text-gray-300";

    return evaluation
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";
  };

  return (
    <Label className={`font-semibold ${getColorClass()}`}>{children}</Label>
  );
};
