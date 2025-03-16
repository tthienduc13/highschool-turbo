"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { useRef } from "react";
import { Modal } from "@highschool/components/modal";
import { StudySetAnswerMode, TestQuestionType } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { cn } from "@highschool/ui/lib/utils";

import { Hint } from "../common/hint";

import { getQuestionTypeIcon, getQuestionTypeName } from "./utils";

import { useTestContext } from "@/stores/use-study-set-test-store";

export interface TestSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

const options: { label: string; value: StudySetAnswerMode }[] = [
  {
    label: "Thuật ngữ",
    value: StudySetAnswerMode.FlashcardContentTerm,
  },
  {
    label: "Định nghĩa",
    value: StudySetAnswerMode.FlashcardContentDefinition,
  },
  {
    label: "Cả 2",
    value: StudySetAnswerMode.Both,
  },
];

export const TestSettingsModal: React.FC<TestSettingsModalProps> = ({
  isOpen,
  onClose,
  onReset,
}) => {
  const startRef = useRef<HTMLButtonElement>(null);
  const questionCount = useTestContext((s) => s.settings.questionCount);
  const allTerms = useTestContext((s) => s.allTerms.length);
  const answerMode = useTestContext((s) => s.settings.answerMode);
  const setSettings = useTestContext((s) => s.setSettings);
  const enabled = useTestContext((s) => s.settings.questionTypes.length > 0);

  const ButtonWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    if (enabled) return <>{children}</>;

    return <Hint label="Chọn ít nhất 1 loại bài kiểm tra">{children}</Hint>;
  };

  return (
    // <Credenza open={isOpen} onOpenChange={onClose}>
    //     <CredenzaContent className="md:px-10 md:py-8">
    //         <VisuallyHidden>
    //             <CredenzaHeader>
    //                 <CredenzaTitle>abc</CredenzaTitle>
    //                 <CredenzaDescription>abc</CredenzaDescription>
    //             </CredenzaHeader>
    //         </VisuallyHidden>
    //         <CredenzaBody className="flex flex-col gap-8">
    //             <div className="flex justify-between">
    //                 <h1 className="text-3xl font-bold">
    //                     Tùy chọn bài kiểm tra
    //                 </h1>
    //                 <Button
    //                     className="rounded-full"
    //                     onClick={onClose}
    //                     aria-label="close"
    //                     size={"icon"}
    //                     variant={"ghost"}
    //                 >
    //                     <IconX />
    //                 </Button>
    //             </div>
    //             <div className="flex flex-col gap-8">
    //                 <div className="flex flex-row items-center gap-8">
    //                     <p className="whitespace-nowrap text-lg font-semibold">
    //                         Số câu
    //                     </p>
    //                     <Slider
    //                         questionCount={questionCount}
    //                         min={1}
    //                         max={allTerms}
    //                         step={1}
    //                         value={[questionCount]}
    //                         onValueChange={(value) => {
    //                             setSettings({ questionCount: value[0] });
    //                         }}
    //                         className="w-full"
    //                         thumbClassName="group"
    //                     ></Slider>
    //                 </div>
    //             </div>
    //             <div className="grid grid-cols-2 gap-3">
    //                 {Object.values(TestQuestionType).map((t) => (
    //                     <QuestionTypeComponent key={t} type={t} />
    //                 ))}
    //             </div>
    //             <div className="flex flex-row items-start justify-between gap-8 md:items-center">
    //                 <div className="flex flex-col">
    //                     <div className="font-semibold">Trả lời bằng</div>
    //                     <div className="text-sm text-muted-foreground">
    //                         Chọn cách bạn trả lời
    //                     </div>
    //                 </div>
    //                 <div className="w-40">
    //                     <Select
    //                         value={answerMode}
    //                         onValueChange={(value) =>
    //                             setSettings({
    //                                 answerMode: value as StudySetAnswerMode,
    //                             })
    //                         }
    //                     >
    //                         <SelectTrigger>
    //                             <SelectValue className="text-base" />
    //                         </SelectTrigger>
    //                         <SelectContent
    //                             style={{ zIndex: 3000 }}
    //                             onCloseAutoFocus={(e) => e.preventDefault()}
    //                         >
    //                             <SelectGroup className="w-full">
    //                                 {options.map((option, index) => (
    //                                     <SelectItem
    //                                         key={index}
    //                                         value={option.value}
    //                                     >
    //                                         {option.label}
    //                                     </SelectItem>
    //                                 ))}
    //                             </SelectGroup>
    //                         </SelectContent>
    //                     </Select>
    //                 </div>
    //             </div>
    //         </CredenzaBody>
    //         <CredenzaFooter className="mt-5 flex flex-col gap-5">
    //             <Separator />
    //             <div className="flex w-full justify-end">
    //                 <ButtonWrapper>
    //                     <Button
    //                         size={"lg"}
    //                         ref={startRef}
    //                         disabled={!enabled}
    //                         onClick={() => {
    //                             onReset();
    //                             onClose();
    //                         }}
    //                     >
    //                         Bắt đầu làm
    //                     </Button>
    //                 </ButtonWrapper>
    //             </div>
    //         </CredenzaFooter>
    //     </CredenzaContent>
    // </Credenza>
    <Modal
      withoutCancel
      buttonLabel="Bắt đầu làm"
      isDisabled={!enabled}
      isOpen={isOpen}
      title=" Tùy chọn bài kiểm tra"
      onClose={onClose}
      onConfirm={() => {
        onReset();
        onClose();
      }}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-row items-center gap-8">
            <p className="whitespace-nowrap text-lg font-semibold">Số câu</p>
            <Slider
              className="w-full"
              max={allTerms}
              min={1}
              questionCount={questionCount}
              step={1}
              thumbClassName="group"
              value={[questionCount]}
              onValueChange={(value) => {
                setSettings({ questionCount: value[0] });
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(TestQuestionType).map((t) => (
            <QuestionTypeComponent key={t} type={t} />
          ))}
        </div>
        <div className="flex flex-row items-start justify-between gap-8 md:items-center">
          <div className="flex flex-col">
            <div className="font-semibold">Trả lời bằng</div>
            <div className="text-sm text-muted-foreground">
              Chọn cách bạn trả lời
            </div>
          </div>
          <div className="w-40">
            <Select
              value={answerMode}
              onValueChange={(value) =>
                setSettings({
                  answerMode: value as StudySetAnswerMode,
                })
              }
            >
              <SelectTrigger>
                <SelectValue className="text-base" />
              </SelectTrigger>
              <SelectContent
                style={{ zIndex: 3000 }}
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <SelectGroup className="w-full">
                  {options.map((option, index) => (
                    <SelectItem key={index} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    thumbClassName?: string;
    questionCount: number;
  }
>(({ className, thumbClassName, questionCount, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-0.5 w-full grow overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
      <SliderPrimitive.Range className="absolute h-full bg-blue-800" />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb
      className={cn(
        "focus-visible:ring-ring relative block h-10 w-10 rounded-full border-[4px] border-blue-500 bg-white shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-blue-500 dark:bg-gray-800",
        "active:scale-130 active:border-2.3 hover:scale-110",
        thumbClassName,
      )}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-sm font-bold transition-all group-hover:scale-110 group-active:scale-110"
        style={{ zIndex: 1000 }}
      >
        {questionCount}
      </div>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

const QuestionTypeComponent: React.FC<{ type: TestQuestionType }> = ({
  type,
}) => {
  const questionTypes = useTestContext((s) => s.settings.questionTypes);
  const setSettings = useTestContext((s) => s.setSettings);

  const Icon = getQuestionTypeIcon(type);

  const checked = questionTypes.includes(type);
  const enable = () => {
    setSettings({
      questionTypes: [...questionTypes, type],
    });
  };
  const disable = () => {
    setSettings({
      questionTypes: questionTypes.filter((t) => t !== type),
    });
  };

  return (
    <Button
      className={cn(
        "w-full justify-start rounded-xl border-2",
        checked
          ? "border-blue-500 dark:border-blue-700"
          : "border-gray-200 dark:border-gray-600",
      )}
      size={"lg"}
      variant={"outline"}
      onClick={() => {
        if (checked) disable();
        else enable();
      }}
    >
      <div
        className={cn(
          "transition-colors duration-150 ease-out",
          checked
            ? "text-blue-500 dark:text-blue-700"
            : "text-gray-400 dark:text-gray-500",
        )}
      >
        <Icon className="!size-5" />
      </div>
      <div className="font-semibold">{getQuestionTypeName(type)}</div>
    </Button>
  );
};
