"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";

import GlobalShortcutLayer from "../global-shorcut-layer";

import { useNextStep } from "./present-wrapper";

interface DefaultLayoutProps {
  heading: string;
  description: string | React.ReactNode;
  action?: string;
  defaultNext?: boolean;
  onNext?: () => void | Promise<void>;
  nextDisabled?: boolean;
  nextLoading?: boolean;
  nextVariant?: "default" | "outline" | "ghost";
}

export const DefaultLayout: React.FC<
  React.PropsWithChildren<DefaultLayoutProps>
> = ({
  heading,
  description,
  children,
  action = "Tiếp tục",
  nextLoading,
  nextVariant,
  nextDisabled,
  defaultNext = true,
  onNext,
}) => {
  const next = useNextStep();

  return (
    <div className="w-full">
      <GlobalShortcutLayer />
      <div className="flex flex-col items-center justify-center gap-12 px-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl font-bold">{heading}</h1>
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            {description}
          </p>
        </div>
        {children}
        <Button
          className="w-72 md:h-12 md:text-lg"
          disabled={nextDisabled || nextLoading}
          size={"lg"}
          variant={nextVariant}
          onClick={async () => {
            await onNext?.();
            if (defaultNext) next();
          }}
        >
          {nextLoading ? <IconLoader2 className="animate-spin" /> : action}
        </Button>
      </div>
    </div>
  );
};
