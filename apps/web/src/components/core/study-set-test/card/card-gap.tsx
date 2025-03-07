import { memo } from "react";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { cn } from "@highschool/ui/lib/utils";
import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconPoint,
  IconPointFilled,
  IconReport,
} from "@tabler/icons-react";

import { SlideFade } from "../../common/slide-fade";
import { TestOptions } from "../test-options";

import { useTestContext } from "@/stores/use-study-set-test-store";

export interface TestCardGapProps {
  type: "start" | "question" | "finish";
  title?: string;
  index?: number;
  startingIndex?: number;
  count?: number;
  numQuestions?: number;
  correctness?: boolean;
  skeleton?: boolean;
  onSettingsClick?: () => void;
  onResetClick?: () => void;
}

export const TestCardGapRaw = ({
  type,
  title,
  index,
  startingIndex,
  count = 1,
  numQuestions,
  correctness,
  skeleton,
  onSettingsClick,
  onResetClick,
}: TestCardGapProps) => {
  const defaultQuestionIconColor = `text-gray-200 dark:text-gray-700`;
  const correctQuestionIconColor = `text-green-500 dark:text-green-300`;
  const incorrectQuestionIconColor = `text-red-500 dark:text-red-300`;
  const questionIconColor =
    correctness !== undefined
      ? correctness
        ? correctQuestionIconColor
        : incorrectQuestionIconColor
      : defaultQuestionIconColor;

  const TextWrapper: React.FC<
    React.PropsWithChildren<{
      rounded?: string;
      skeletonHeight?: string;
    }>
  > = ({ children, rounded = "full", skeletonHeight = "18px" }) => {
    if (!skeleton) return <>{children}</>;

    return (
      <div className="flex h-[21px] items-center">
        <Skeleton className={cn(`rounded-${rounded} h-${skeletonHeight}`)} />
      </div>
    );
  };
  const HeadingWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    if (!skeleton) return <>{children}</>;

    return (
      <div className="flex h-[40px] items-center md:h-[43px]">
        <Skeleton className="h-[32px] rounded-lg md:h-[40px]" />
        {children}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex w-full flex-row gap-4 px-5 sm:px-[36px] md:px-[34px]",
        type === "question" ? "items-center" : "items-stretch",
      )}
    >
      <div className="relative min-h-12 w-[3px]">
        <div
          className={`dark:bg-gray-750 h-full min-h-12 w-[3px] bg-gray-200 ${type === "start" ? "rounded-t-full" : ""} ${type === "finish" ? "rounded-b-full" : ""} `}
        >
          {(type === "question" || type === "finish") && (
            <div className="dark:bg-gray-750 absolute -top-4 left-0 -z-10 block h-20 w-0.5 bg-gray-200 sm:hidden sm:w-[3px]" />
          )}
        </div>
        <div
          className={cn(
            "absolute left-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-900",
            type === "finish" ? "top-full" : "top-1/2",
            type === "question" ? questionIconColor : "text-gray-400",
            type === "question"
              ? "-translate-x-1/2 -translate-y-1/2"
              : "-translate-x-1/2",
          )}
        >
          {!skeleton ? (
            <GapIcon correctness={correctness} index={index} type={type} />
          ) : (
            <IconPoint size={24} />
          )}
        </div>
      </div>
      {index !== undefined &&
        startingIndex !== undefined &&
        numQuestions !== undefined && (
          <TextWrapper>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              {`${count <= 1 ? startingIndex + 1 : `${startingIndex + 1}-${startingIndex + count}`} / ${numQuestions}`}
            </p>
          </TextWrapper>
        )}
      {title && (
        <div className="flex w-full flex-col-reverse items-start justify-start pr-[5px] sm:pr-[26px] md:flex-row md:justify-between md:pr-[34px]">
          <div className="flex flex-col gap-2">
            <SlideFade skeleton={skeleton}>
              <TextWrapper rounded="md" skeletonHeight="4">
                <div className="text-sm font-semibold text-muted-foreground">
                  Bài kiểm tra
                </div>
              </TextWrapper>
            </SlideFade>
            <SlideFade skeleton={skeleton}>
              <HeadingWrapper>
                <div className="text-4xl font-semibold">{title}</div>
              </HeadingWrapper>
            </SlideFade>
          </div>
          <TestOptions
            skeleton={skeleton}
            onResetClick={() => onResetClick?.()}
            onSettingsClick={() => onSettingsClick?.()}
          />
        </div>
      )}
    </div>
  );
};

const GapIcon: React.FC<
  Pick<TestCardGapProps, "type" | "correctness" | "index">
> = ({ type, correctness, index }) => {
  const answered = useTestContext((s) => s.timeline[index || 0]?.answered);

  const Icon =
    correctness !== undefined
      ? correctness
        ? IconCircleCheckFilled
        : IconCircleXFilled
      : type == "start"
        ? IconReport
        : type == "finish"
          ? IconCircleCheckFilled
          : answered
            ? IconPointFilled
            : IconPoint;

  return <Icon size={24} />;
};

export const TestCardGap = memo(TestCardGapRaw);
