"use client";

import { DefaultLayout } from "@/components/core/common/onboard/default-layout";
import { PresentWrapper } from "@/components/core/common/onboard/present-wrapper";
import { ThemePreview } from "@/components/core/common/theme-preview";
import { cn } from "@highschool/ui/lib/utils";
import { useTheme } from "next-themes";
import { useState } from "react";

function OnboardThemeModule() {
    const { setTheme, theme } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme ?? "light");
    return (
        <PresentWrapper>
            <DefaultLayout
                heading="Chọn chủ đề của bạn"
                description="Có thể thay đổi sau trong cài đặt"
            >
                <div className="rounded-xl overflow-hidden flex flex-col md:flex-row cursor-pointer ">
                    <div
                        onClick={() => {
                            setTheme("light");
                            setSelectedTheme("light");
                        }}
                        className={cn(
                            "py-2 px-4 w-72 h-48 flex items-center justify-center",
                            selectedTheme === "light"
                                ? "bg-muted-foreground/10 "
                                : "bg-background"
                        )}
                    >
                        <div className="flex flex-col gap-3">
                            <ThemePreview
                                variant="light"
                                selected={selectedTheme === "light"}
                            />
                            <p className="text-sm text-center font-medium">
                                Chế độ sáng
                            </p>
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            setTheme("dark");
                            setSelectedTheme("dark");
                        }}
                        className={cn(
                            "py-2 px-4 w-72 h-48 flex items-center justify-center",
                            selectedTheme === "dark"
                                ? "bg-muted-foreground/10 "
                                : "bg-background"
                        )}
                    >
                        <div className="flex flex-col gap-3">
                            <ThemePreview
                                variant="dark"
                                selected={selectedTheme === "dark"}
                            />
                            <p className="text-sm text-center font-medium">
                                Chế độ tối
                            </p>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </PresentWrapper>
    );
}

export default OnboardThemeModule;
