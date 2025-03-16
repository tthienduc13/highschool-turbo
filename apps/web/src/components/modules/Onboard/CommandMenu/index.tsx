"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@highschool/ui/components/ui/card";

import { DefaultLayout } from "@/components/core/common/onboard/default-layout";
import { PresentWrapper } from "@/components/core/common/onboard/present-wrapper";
import { menuEventChannel } from "@/events/menu";
import { MOD } from "@/lib/tiny-key";

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
        heading={interacted ? "Không tệ nhỉ!" : "Menu lệnh"}
        nextVariant={"default"}
      >
        {!interacted && (
          <Card className="w-full max-w-lg border-gray-200 bg-transparent p-10 pb-12 dark:border-gray-700">
            <CardContent className="flex w-full items-center justify-center p-0">
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-sm text-gray-500">
                  Hãy thử mở menu lệnh với:
                </p>
                <div className="flex flex-row gap-2 text-3xl text-gray-800 dark:text-gray-200">
                  <div className="cursor-pointer rounded-lg border-b-[3px] border-b-gray-300 bg-gray-200 px-4 py-2 shadow-lg transition-all duration-150 ease-cubic-ease hover:border-b-gray-400 hover:bg-gray-300 dark:border-b-gray-600 dark:bg-gray-700 dark:hover:border-b-gray-500 dark:hover:bg-gray-600">
                    {MOD == "Control" ? "Ctrl" : "⌘"}
                  </div>
                  <div className="cursor-pointer rounded-lg border-b-[3px] border-b-gray-300 bg-gray-200 px-5 py-2 shadow-lg transition-all duration-150 ease-cubic-ease hover:border-b-gray-400 hover:bg-gray-300 dark:border-b-gray-600 dark:bg-gray-700 dark:hover:border-b-gray-500 dark:hover:bg-gray-600">
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
