"use client";

import { Button } from "@highschool/ui/components/ui/button";
import GlobalShortcutLayer from "../global-shorcut-layer";
import { useNextStep } from "./present-wrapper";
import { IconLoader2 } from "@tabler/icons-react";

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
            <div className="flex flex-col gap-12 px-4 justify-center items-center">
                <div className="flex flex-col gap-4 ">
                    <h1 className="text-3xl font-bold text-center">
                        {heading}
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
                        {description}
                    </p>
                </div>
                {children}
                <Button
                    disabled={nextDisabled || nextLoading}
                    variant={nextVariant}
                    onClick={async () => {
                        await onNext?.();
                        if (defaultNext) next();
                    }}
                    className="md:h-12 md:text-lg  w-72"
                    size={"lg"}
                >
                    {nextLoading ? (
                        <IconLoader2 className="animate-spin" />
                    ) : (
                        action
                    )}
                </Button>
            </div>
        </div>
    );
};
