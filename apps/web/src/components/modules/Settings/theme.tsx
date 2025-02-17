"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { cn } from "@highschool/ui/lib/utils";

import { Wrapper } from "./wrapper";

import { ThemePreview } from "@/components/core/common/theme-preview";

export const Theme = () => {
  const { setTheme, theme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme ?? "light");

  return (
    <Wrapper description="Thay đổi chủ đề cho thiết bị này" heading="Chủ đề">
      <div className="w-full items-center justify-center">
        <div className="flex cursor-pointer flex-col overflow-hidden rounded-xl md:flex-row">
          <button
            className={cn(
              "flex h-48 w-72 items-center justify-center px-4 py-2",
              selectedTheme === "light"
                ? "bg-muted-foreground/10"
                : "bg-background",
            )}
            onClick={() => {
              setTheme("light");
              setSelectedTheme("light");
            }}
          >
            <div className="flex flex-col gap-3">
              <ThemePreview
                selected={selectedTheme === "light"}
                variant="light"
              />
              <p className="text-center text-sm font-medium">Chế độ sáng</p>
            </div>
          </button>
          <button
            className={cn(
              "flex h-48 w-72 items-center justify-center px-4 py-2",
              selectedTheme === "dark"
                ? "bg-muted-foreground/10"
                : "bg-background",
            )}
            onClick={() => {
              setTheme("dark");
              setSelectedTheme("dark");
            }}
          >
            <div className="flex flex-col gap-3">
              <ThemePreview
                selected={selectedTheme === "dark"}
                variant="dark"
              />
              <p className="text-center text-sm font-medium">Chế độ tối</p>
            </div>
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
