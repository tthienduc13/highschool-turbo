"use client";

import { cn } from "@highschool/ui/lib/utils";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  return (
    <div className="flex flex-row items-center text-gray-500">
      <ThemeButton mode="light" />
      <ThemeButton mode="dark" />
    </div>
  );
};

const ThemeButton = ({ mode }: { mode: "light" | "dark" }) => {
  const { theme, setTheme } = useTheme();
  const Icon = mode == "dark" ? IconMoon : IconSun;

  const selected = theme == mode;

  return (
    <button
      className={cn(
        "cursor-pointer rounded-full p-[7px] transition-colors duration-150 ease-in-out hover:text-gray-900 dark:hover:text-gray-50",
        selected
          ? "bg-gray-100 text-gray-900 dark:bg-gray-800/50 dark:text-gray-50"
          : "bg-transparent text-gray-400 dark:bg-transparent dark:text-gray-500",
      )}
      onClick={() => setTheme(mode)}
    >
      <Icon size={18} />
    </button>
  );
};
