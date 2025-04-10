"use client";

import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";
import { Input } from "@highschool/ui/components/ui/input";
import { Button } from "@highschool/ui/components/ui/button";
import { useAssessAnswerMutation } from "@highschool/react-query/queries";
import {
  IconCheck,
  IconInfoCircle,
  IconLoader2,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@highschool/ui/lib/utils";
import { DueCard } from "@highschool/interfaces";

import { AnimatedCheckCircle } from "../common/animated-icons/animated-check-circle";

import { useWritingContext } from "@/stores/use-study-set-writing-store";

export const WritingCard = () => {
  const { theme } = useTheme();

  const dueCards = useWritingContext((s) => s.dueCards);
  const cardCounter = useWritingContext((s) => s.cardCounter);

  const [isVisible, setIsVisible] = useState(false);

  const progress = Math.round((cardCounter / dueCards.length) * 100) / 100;

  const status = useWritingContext((s) => s.status);

  const cardResult = useWritingContext((s) => s.cardResult);

  const neutralColor = theme === "dark" ? "#7ea6ff" : "#0042da";

  const active = dueCards[cardCounter];

  if (!dueCards.length) {
    return;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <motion.div
        key={active.contentId}
        animate={{ translateY: 0, opacity: 1 }}
        initial={{ translateY: -20, opacity: 0.5 }}
        // style={{
        //   marginBottom: 100,
        // }}
      >
        <Card className="bg-background relative rounded-2xl border-2 border-gray-50 shadow-xl dark:border-gray-700">
          {status !== undefined && (
            <motion.div
              animate={{ opacity: isVisible ? 0.2 : 0 }}
              aria-hidden="true"
              className="absolute inset-0 z-[-1] rounded-2xl shadow-lg"
              initial={{ opacity: 0 }}
              style={{
                backgroundColor: neutralColor,
                boxShadow: `0 5px 60px -5px ${neutralColor}`,
              }}
              transition={{ duration: 0.3 }}
            />
          )}
          <CardContent className="size-full overflow-hidden rounded-2xl p-0">
            <div className="h-1 w-full overflow-hidden bg-gray-200">
              <motion.div
                animate={{ width: `${progress * 100}%` }}
                className="h-full bg-orange-300"
                initial={{ width: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="flex flex-col gap-6 px-8 py-6">
              <div className="flex w-full flex-row gap-3">
                <h2 className="font-semibold text-gray-500">Thuật ngữ</h2>
              </div>
              <div className="min-h-[60px] md:min-h-[140px]">
                <div className="whitespace-pre-wrap text-xl">{active.term}</div>
              </div>
              <WriteSection active={active} i={active.contentId} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      {cardResult.assessment !== "" && (
        <div className="no-scrollbar flex max-h-[200px] w-full flex-col gap-6 overflow-y-scroll rounded-2xl border border-gray-50 bg-white p-4 shadow-lg dark:border-gray-700">
          <div className="flex flex-col gap-2">
            <div
              className={cn(
                "flex w-fit items-center text-sm gap-2 rounded-md px-2 py-1 ",
                cardResult.rating === 1
                  ? "bg-destructive/10 text-destructive"
                  : "bg-emerald-700/10 text-emerald-500",
              )}
            >
              {cardResult.rating === 1 ? <IconX /> : <IconCheck />}{" "}
              {cardResult.rating === 1
                ? "Có vẻ như bạn trả lời chưa đúng"
                : "Bạn đã làm được"}
            </div>
            <p className="ml-2 text-gray-600 dark:text-gray-400">
              {cardResult.assessment}
            </p>
          </div>

          {cardResult.improvement && (
            <div className="flex flex-col gap-2">
              <div
                className={cn(
                  "flex w-fit items-center text-sm gap-2 rounded-md bg-blue-600 px-2 py-1 text-white",
                )}
              >
                <IconInfoCircle />
                Cần cải thiện
              </div>
              <p className="ml-2 text-gray-600 dark:text-gray-400">
                {cardResult.assessment}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface WritingSectionProps {
  active: DueCard;
  i: string;
}

const WriteSection = ({ i, active }: WritingSectionProps) => {
  const [answer, setAnswer] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const status = useWritingContext((s) => s.status);

  const apiAssessAnswer = useAssessAnswerMutation();

  const onDontKnow = useWritingContext((s) => s.onDontKnow);

  const onAnswer = useWritingContext((s) => s.onAnswer);

  const setCardResult = useWritingContext((s) => s.setCardResult);
  const cardResult = useWritingContext((s) => s.cardResult);

  const handleAnswer = () => {
    if (answer.trim().length > 0) {
      apiAssessAnswer.mutate(
        {
          flashcardContentId: i,
          userAnswer: answer,
        },
        {
          onSuccess: (data) => {
            setCardResult(data?.data!);
            onAnswer();
          },
        },
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p>Câu trả lời của bạn:</p>

      {status === "unknown" ? (
        <div className="flex w-full items-center gap-4 rounded-xl border-2 border-[rgba(47,133,90,0.2)] bg-green-100 px-8 py-5 dark:border-[rgba(154,230,180,0.2)] dark:bg-green-900">
          <div
            className="size-6 scale-110"
            style={{ color: "green", transform: "scale(1.1)" }}
          >
            <AnimatedCheckCircle />
          </div>
          <span
            className={`whitespace-pre-wrap break-words text-left text-lg font-medium text-green-700 dark:text-green-400`}
          >
            {active.definition}
          </span>
        </div>
      ) : (
        <Input
          ref={inputRef}
          autoComplete="off"
          className="h-14 w-full rounded-lg border-0 border-b-4 border-b-blue-300 bg-gray-100   pt-2 !text-lg font-bold shadow-none placeholder:text-gray-600 focus-within:border-b-4 focus-visible:border-b-blue-500 focus-visible:ring-0  dark:bg-gray-700 dark:placeholder:text-gray-400 dark:focus-visible:border-blue-300"
          disabled={apiAssessAnswer.isPending || cardResult.assessment !== ""}
          id={`write-card-input-${i}`}
          maxLength={300}
          placeholder={`Nhập câu trả lời của bạn`}
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            //   if (e.target.value.trim().length > 0) {
            //     answerQuestion(i, e.target.value, true, true);
            //   } else clearAnswer(i);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleAnswer();
            }
          }}
        />
      )}
      {!cardResult.assessment && status !== "unknown" && (
        <div className="mt-4 flex justify-end">
          <div className="flex flex-row items-center gap-2">
            <Button
              className="text-primary hover:text-primary/90 !text-base font-semibold"
              disabled={apiAssessAnswer.isPending}
              size={"lg"}
              variant={"ghost"}
              onClick={onDontKnow}
            >
              Không biết?
            </Button>
            <Button
              className="!text-base"
              disabled={answer.trim().length === 0 || apiAssessAnswer.isPending}
              size={"lg"}
              onClick={handleAnswer}
            >
              {apiAssessAnswer.isPending && (
                <IconLoader2 className="animate-spin" />
              )}
              Trả lời
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
