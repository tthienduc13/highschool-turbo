"use client";

import { useTheme } from "next-themes";

import { useState } from "react";

import { cn } from "@highschool/ui/lib/utils";

import { ThemePreview } from "@/components/core/common/theme-preview";

import { Wrapper } from "./wrapper";

export const Theme = () => {
  const { setTheme, theme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme ?? "light");
  return (
    <Wrapper heading="Chủ đề" description="Thay đổi chủ đề cho thiết bị này">
      <div className="w-full items-center justify-center">
        <div className="flex cursor-pointer flex-col overflow-hidden rounded-xl md:flex-row">
          <div
            onClick={() => {
              setTheme("light");
              setSelectedTheme("light");
            }}
            className={cn(
              "flex h-48 w-72 items-center justify-center px-4 py-2",
              selectedTheme === "light"
                ? "bg-muted-foreground/10"
                : "bg-background",
            )}
          >
            <div className="flex flex-col gap-3">
              <ThemePreview
                variant="light"
                selected={selectedTheme === "light"}
              />
              <p className="text-center text-sm font-medium">Chế độ sáng</p>
            </div>
          </div>
          <div
            onClick={() => {
              setTheme("dark");
              setSelectedTheme("dark");
            }}
            className={cn(
              "flex h-48 w-72 items-center justify-center px-4 py-2",
              selectedTheme === "dark"
                ? "bg-muted-foreground/10"
                : "bg-background",
            )}
          >
            <div className="flex flex-col gap-3">
              <ThemePreview
                variant="dark"
                selected={selectedTheme === "dark"}
              />
              <p className="text-center text-sm font-medium">Chế độ tối</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
