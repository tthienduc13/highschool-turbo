"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";

import { UploadStep } from "./upload";
import { FlashcardSettings } from "./flashcard-setting";

import { ShineBorder } from "@/components/ui/shine-border";
import { useFlashcardStore } from "@/stores/use-ai-flashcard-store";

export const FlashcardAiGenerator = () => {
  const { activeTab, goToNextStep, goToPreviousStep, currentStep } =
    useFlashcardStore();

  return (
    <Card className="relative w-full overflow-hidden rounded-2xl">
      <ShineBorder
        borderWidth={2}
        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      />
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Tạo bộ thẻ mới</CardTitle>
        <CardDescription className="text-sm text-gray-500 ">
          Chọn một chế độ và tạo thẻ ghi nhớ từ tài liệu của bạn hoặc tự viết
          chúng.
        </CardDescription>
      </CardHeader>

      {currentStep === "upload" ? (
        <UploadStep />
      ) : currentStep === "settings" ? (
        <FlashcardSettings />
      ) : null}
      <CardFooter className="flex flex-row items-center justify-between">
        {currentStep !== "upload" ? (
          <Button variant={"outline"} onClick={() => goToPreviousStep()}>
            <IconArrowLeft />
            Quay lại
          </Button>
        ) : (
          <div />
        )}
        <Button onClick={() => goToNextStep()}>
          Tiếp theo
          <IconArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
};
