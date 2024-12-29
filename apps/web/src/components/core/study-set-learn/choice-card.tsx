"use client";

import { useMutation } from "@tanstack/react-query";
import { useTheme } from "next-themes";

import React, { useEffect, useState } from "react";

import { Question } from "@highschool/interfaces";
import { getRandom } from "@highschool/lib/array";
import { updateLearnProgress } from "@highschool/react-query/apis";
import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";

import { useSet } from "@/hooks/use-set";
import { useLearnContext } from "@/stores/use-study-set-learn-store";

import { AnimatedCheckCircle } from "../common/animated-icons/animated-check-circle";
import { AnimatedXCircle } from "../common/animated-icons/animated-x-icon";
import { ChoiceShortcutLayer } from "./choice-shorcut-layer";
import { GenericLabel } from "./generic-label";

interface ChoiceCardProps {
  active: Question;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({ active }) => {
  const { flashcard } = useSet();
  const { theme } = useTheme();

  const answered = useLearnContext((s) => s.answered);
  const answerCorrectly = useLearnContext((s) => s.answerCorrectly);
  const answerIncorrectly = useLearnContext((s) => s.answerIncorrectly);
  const feedbackBank = useLearnContext((s) => s.feedbackBank);
  const status = useLearnContext((s) => s.status);

  const getCorrect = () => getRandom(feedbackBank.correct)!;
  const getIncorrect = () => getRandom(feedbackBank.incorrect)!;

  const [remark, setRemark] = useState({
    correct: getCorrect(),
    incorrect: getIncorrect(),
  });

  useEffect(() => {
    setRemark({
      correct: getCorrect(),
      incorrect: getIncorrect(),
    });
  }, [active.correctAnswerId, feedbackBank]);

  const text =
    status == "correct"
      ? remark.correct
      : status == "incorrect"
        ? remark.incorrect
        : `Chọn thuật ngữ phù hợp`;

  const put = useMutation({
    mutationKey: ["update-progress"],
    mutationFn: updateLearnProgress,
  });

  const choose = (termId: string) => {
    if (termId === active.correctAnswerId) {
      answerCorrectly(termId);
    } else {
      answerIncorrectly(termId);
    }
    put.mutate({
      flashcardId: flashcard.id,
      flashcardContentId: active.correctAnswerId,
      isCorrect: termId === active.correctAnswerId,
    });
  };

  const isCorrectTerm = (id: string) =>
    !!answered && id === active.correctAnswerId;
  const isIncorrectTerm = (id: string) =>
    id === answered && status === "incorrect";
  const isHighlightedTerm = (id: string) =>
    isCorrectTerm(id) || isIncorrectTerm(id);

  const questionNumText = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const defaultBorder =
    theme === "dark" ? "border-gray-500" : "border-gray-300";
  const buttonBorder = theme === "dark" ? "border-gray-600" : "border-gray-50";
  const greenText = theme === "dark" ? "text-green-200" : "text-green-800";
  const redText = theme === "dark" ? "text-red-200" : "text-red-600";
  const greenBorder =
    theme === "dark"
      ? "border-[rgba(154,230,180,0.2)]"
      : "border-[rgba(47,133,90,0.2)]";
  const redBorder =
    theme === "dark"
      ? "border-[rgba(252,129,129,0.2)]"
      : "border-[rgba(197,48,48,0.2)]";
  const textColor = theme === "dark" ? "text-gray-50" : "text-gray-900";

  const colorSchemeForTerm = (id: string) => {
    if (!answered) return "gray";
    if (isCorrectTerm(id)) return "green";
    else if (isIncorrectTerm(id)) return "red";
    return "gray";
  };

  const colorForTerm = (id: string) => {
    const scheme = colorSchemeForTerm(id);
    switch (scheme) {
      case "green":
        return greenBorder;
      case "red":
        return redBorder;
      case "gray":
        return buttonBorder;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <GenericLabel
        evaluation={
          status && status !== "unknownPartial"
            ? status == "correct"
            : undefined
        }
      >
        {text}
      </GenericLabel>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ChoiceShortcutLayer
          choose={(i) => {
            if (active.options.length > i) choose(active.options[i]?.id!);
          }}
        />
        {active.options.map((option, i) => {
          const colorScheme = colorSchemeForTerm(option.id);
          return (
            <Button
              key={option.id}
              variant="outline"
              className={cn(
                "h-auto w-full rounded-xl px-8 py-5 disabled:cursor-not-allowed",
                `border-2 ${colorForTerm(option.id)}`,
                answered &&
                  option.id === active.correctAnswerId &&
                  `bg-${colorScheme}-100 dark:bg-${colorScheme}-900`,
                !answered && "hover:bg-gray-100 dark:hover:bg-gray-800",
              )}
              disabled={
                !!answered &&
                option.id !== active.correctAnswerId &&
                option.id !== answered
              }
              onClick={() => choose(option.id)}
            >
              <div className="flex w-full items-center gap-4">
                {!answered || !isHighlightedTerm(option.id) ? (
                  <div
                    className={`flex h-6 w-6 min-w-6 items-center justify-center rounded-full border-2 ${defaultBorder}`}
                  >
                    <span
                      className={`font-heading text-[11px] leading-none ${questionNumText}`}
                    >
                      {i + 1}
                    </span>
                  </div>
                ) : isCorrectTerm(option.id) ? (
                  <div
                    style={{ color: "green", transform: "scale(1.1)" }}
                    className="h-6 w-6 scale-110 transform"
                  >
                    <AnimatedCheckCircle />
                  </div>
                ) : (
                  <div
                    style={{ color: "red", transform: "scale(1.1)" }}
                    className="h-6 w-6 scale-110 transform"
                  >
                    <AnimatedXCircle />
                  </div>
                )}
                <span
                  className={`whitespace-pre-wrap break-words text-left text-lg font-medium ${
                    isHighlightedTerm(option.id)
                      ? isCorrectTerm(option.id)
                        ? greenText
                        : redText
                      : textColor
                  }`}
                >
                  {option.definition}
                </span>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
