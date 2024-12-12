"use client";

import { DefaultLayout } from "@/components/core/common/onboard/default-layout";
import { PresentWrapper } from "@/components/core/common/onboard/present-wrapper";
import { menuEventChannel } from "@/events/menu";
import { MOD } from "@/lib/tiny-key";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@highschool/ui/components/ui/card";

function OnboardCommandMenuModule() {
    const [interacted, setInteracted] = useState(false);

    useEffect(() => {
        menuEventChannel.on("commandMenuClosed", () => {
            setInteracted(true);
        });
    }, []);
    return (
        <PresentWrapper>
            <DefaultLayout
                heading={interacted ? "Không tệ nhỉ!" : "Menu lệnh"}
                description={
                    interacted ? (
                        <>
                            Đừng quên bạn có thể luôn điều hướng bằng{" "}
                            <b>{MOD == "Control" ? "Ctrl" : "⌘"} + K</b>
                        </>
                    ) : (
                        "Điều hướng giữa các bộ thẻ, thư mục, khoá học nhanh chóng"
                    )
                }
                nextVariant={interacted ? "default" : "outline"}
                nextDisabled={!interacted}
            >
                {!interacted && (
                    <Card className="max-w-lg w-full p-10 pb-12 bg-transparent border-gray-200 dark:border-gray-700">
                        <CardContent className="p-0 w-full items-center flex justify-center">
                            <div className="flex flex-col items-center justify-center gap-4">
                                <p className="text-sm text-gray-500">
                                    Hãy thử mở menu lệnh với:
                                </p>
                                <div className="flex flex-row gap-2 text-3xl text-gray-800 dark:text-gray-200">
                                    <div className="px-4 py-2 shadow-lg rounded-lg bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-150 ease-cubic-ease border-b-[3px]  border-b-gray-300 dark:border-b-gray-600 hover:border-b-gray-400 dark:hover:border-b-gray-500 ">
                                        {MOD == "Control" ? "Ctrl" : "⌘"}
                                    </div>
                                    <div className="px-5 py-2 shadow-lg rounded-lg bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-150 ease-cubic-ease border-b-[3px]  border-b-gray-300 dark:border-b-gray-600 hover:border-b-gray-400 dark:hover:border-b-gray-500 ">
                                        K
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </DefaultLayout>
        </PresentWrapper>
    );
}

export default OnboardCommandMenuModule;
