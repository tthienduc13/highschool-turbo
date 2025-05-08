"use client";

import * as React from "react";
import { Modal } from "@highschool/components/modal";
import {
  StudySetAnswerMode,
  TestQuestionType,
  TestRange,
  TestRangeLabels,
} from "@highschool/interfaces";
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

import {
  getQuestionTypeIcon,
  getQuestionTypeName,
} from "../study-set-test/utils";

import { useRememberedContext } from "@/stores/use-study-set-remembered-store";

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
  const answerMode = useRememberedContext((s) => s.settings.answerMode);
  const testRange = useRememberedContext((s) => s.settings.testRange);
  const setSettings = useRememberedContext((s) => s.setSettings);
  const enabled = useRememberedContext(
    (s) => s.settings.questionTypes.length > 0,
  );

  return (
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
      <div className="flex flex-col gap-8 pb-6">
        {" "}
        <div className="flex flex-col gap-2">
          <div className="font-semibold">Làm bài kiểm tra bằng:</div>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(TestQuestionType)
              .filter((type) => type !== TestQuestionType.Write)
              .map((t) => (
                <QuestionTypeComponent key={t} type={t} />
              ))}
          </div>
        </div>
        <div className="flex flex-row items-start justify-between gap-8 md:items-center">
          <div className="flex flex-col">
            <div className="font-semibold">Phạm vi câu hỏi</div>
            <div className="text-muted-foreground text-sm">
              Phạm vi các câu bạn đã học trong vòng
            </div>
          </div>
          <div className="w-40">
            <Select
              value={testRange.toString()}
              onValueChange={(value) =>
                setSettings({
                  testRange: Number(value) as TestRange,
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
                  {Object.keys(TestRange)
                    .filter((k) => !isNaN(Number(k)))
                    .map((key) => {
                      const value = Number(key) as TestRange;

                      return (
                        <SelectItem key={value} value={value.toString()}>
                          {TestRangeLabels[value]}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-row items-start justify-between gap-8 md:items-center">
          <div className="flex flex-col">
            <div className="font-semibold">Trả lời bằng</div>
            <div className="text-muted-foreground text-sm">
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

const QuestionTypeComponent: React.FC<{ type: TestQuestionType }> = ({
  type,
}) => {
  const questionTypes = useRememberedContext((s) => s.settings.questionTypes);
  const setSettings = useRememberedContext((s) => s.setSettings);

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
