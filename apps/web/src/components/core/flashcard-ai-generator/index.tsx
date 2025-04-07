"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import { IconArrowLeft, IconArrowRight, IconTrash } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";

import { UploadStep } from "./upload";
import { FlashcardSettings } from "./flashcard-setting";

import { ShineBorder } from "@/components/ui/shine-border";
import { useFlashcardStore } from "@/stores/use-ai-flashcard-store";
import { toast } from "sonner";
import {
  useAIFlashcardMutation,
  useDeleteFlashcardMutation,
} from "@highschool/react-query/queries";
import { FlashcardGeneratePayload } from "@highschool/interfaces";
import { FlashcardCreate } from "./create";
import { useRouter } from "next/navigation";

export const FlashcardAiGenerator = () => {
  const router = useRouter();
  const {
    goToNextStep,
    goToPreviousStep,
    currentStep,
    submit,
    canProceedToNextStep,
    setResult,
    result,
  } = useFlashcardStore();

  const createFLashcard = useAIFlashcardMutation();
  const deleteFlashcard = useDeleteFlashcardMutation();

  const handleNext = () => {
    if (currentStep === "settings") {
      const submitData = submit();
      if (!submitData) {
        toast.error("Validation Error", {
          description:
            "Please ensure you have provided either a file or text with length between 150 and 10000 characters",
        });
        return;
      }

      createFLashcard.mutate(submitData as FlashcardGeneratePayload, {
        onSuccess: (data) => {
          setResult({
            id: data.data?.id!,
            flashcardContents: data.data?.flashcardContents!,
          });
          goToNextStep();
        },
        onError: (error) => {
          console.error("Error creating flashcard:", error);
          toast.error("Failed to create flashcard", {
            description:
              "There was an error creating your flashcard. Please try again.",
          });
        },
      });
      return; 
    }
    goToNextStep();
  };

  const handleDiscard = () => {
    deleteFlashcard.mutate(
      { flashcardId: result.id },
      {
        onSuccess: () => {
          useFlashcardStore.getState().resetStore();
          router.push("/");
        },
      }
    );
  };

  const handleContinueEdit = () => {
    router.push(`/study-set/edit/${result.id}`)
  }

  const isNextDisabled = !canProceedToNextStep() || createFLashcard.isPending;
  const isPreviousDisabled = currentStep === "upload";

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
      ) : currentStep === "create" ? (
        <FlashcardCreate />
      ) : null}
      <CardFooter className="flex flex-row items-center justify-between">
        {currentStep !== "upload" ? (
          <Button
            variant={currentStep === "create" ? "destructive" : "outline"}
            onClick={currentStep !== "create" ? goToPreviousStep : handleDiscard}
            disabled={currentStep !== "create" ? isPreviousDisabled : deleteFlashcard.isPending}
          >
            {currentStep === "create" ? <IconTrash/> : <IconArrowLeft />}
            {currentStep === "create" ? "Hủy bỏ" : "Quay lại"}
          </Button>
        ) : (
          <div />
        )}
        <Button onClick={currentStep === "create" ? handleContinueEdit : handleNext} disabled={currentStep === "create" ? !result.id : isNextDisabled}>
          {currentStep === "settings"
            ? createFLashcard.isPending
              ? "Đang tạo"
              : "Tạo thẻ" 
            : currentStep === "create" ? "Tiếp tục chỉnh sửa" : "Tiếp theo"}
          <IconArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
};
