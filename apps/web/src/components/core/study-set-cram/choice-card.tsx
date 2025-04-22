import { getRandom } from "@highschool/lib/array";
import { useEffect, useState } from "react";
import { FlashcardContent, StudySetAnswerMode } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";
import { useTheme } from "next-themes";
import { ScriptFormatter } from "@highschool/lib/script-formatter";

import { AnimatedCheckCircle } from "../common/animated-icons/animated-check-circle";
import { AnimatedXCircle } from "../common/animated-icons/animated-x-icon";
import { SquareAssetPreview } from "../study-set/square-asset-preview";
import { ChoiceShortcutLayer } from "../common/choice-shortcut-layer";
import { GenericLabel } from "../common/generic-label";

import { Question, useCramContext } from "@/stores/use-study-set-cram-store";
import { word } from "@/utils/terms";
interface ChoiceCardProps {
  active: Question;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({ active }) => {
  const { theme } = useTheme();

  const answered = useCramContext((s) => s.answered);
  const status = useCramContext((s) => s.status);
  const answerCorrectly = useCramContext((s) => s.answerCorrectly);
  const answerIncorrectly = useCramContext((s) => s.answerIncorrectly);
  const feedbackBank = useCramContext((s) => s.feedbackBank);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active.term.id, feedbackBank]);

  const choose = (term: FlashcardContent) => {
    if (term.id === active.term.id) {
      answerCorrectly(term.id);
    } else {
      answerIncorrectly(term.id);
    }
  };

  const isCorrectTerm = (id: string) => !!answered && id === active.term.id;
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

  const text =
    status == "correct"
      ? remark.correct
      : status == "incorrect"
        ? remark.incorrect
        : `Chọn ${
            active.answerMode == StudySetAnswerMode.FlashcardContentDefinition
              ? "định nghĩa"
              : "thuật ngữ"
          }  phù hợp`;

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
            if (active.choices.length > i) choose(active.choices[i]!);
          }}
        />
        {active.choices.map((choice, i) => {
          const colorScheme = colorSchemeForTerm(choice.id);

          return (
            <div key={i} className="h-auto">
              <Button
                className={cn(
                  "h-full w-full border-2 px-8 py-5 rounded-xl",
                  `border-2 ${colorForTerm(choice.id)}`,
                  answered &&
                    choice.id === active.term.id &&
                    `bg-${colorScheme}-100 dark:bg-${colorScheme}-900`,
                  answered ? "pointer-events-none" : "pointer-events-auto",
                )}
                disabled={
                  !!answered &&
                  choice.id !== active.term.id &&
                  choice.id !== answered
                }
                variant="outline"
                onClick={() => choose(choice)}
              >
                <div className="items-c flex w-full gap-4">
                  {!answered || !isHighlightedTerm(choice.id) ? (
                    <div
                      className={cn(
                        "flex h-6 justify-center min-w-6 rounded-full w-6 items-center border-2 ",
                        defaultBorder,
                      )}
                    >
                      <p
                        className={`font-heading text-[11px] leading-none ${questionNumText}`}
                      >
                        {i + 1}
                      </p>
                    </div>
                  ) : isCorrectTerm(choice.id) ? (
                    <div
                      className="size-6 scale-125"
                      style={{ color: "green", transform: "scale(1.25)" }}
                    >
                      <AnimatedCheckCircle />
                    </div>
                  ) : (
                    <div
                      className="size-6 scale-125"
                      style={{ color: "red", transform: "scale(1.25)" }}
                    >
                      <AnimatedXCircle />
                    </div>
                  )}
                  <span
                    className={`whitespace-pre-wrap break-words text-left text-lg font-medium ${
                      isHighlightedTerm(choice.id)
                        ? isCorrectTerm(choice.id)
                          ? greenText
                          : redText
                        : textColor
                    }`}
                  >
                    <ScriptFormatter>
                      {word(active.answerMode, choice, "answer")}
                    </ScriptFormatter>
                  </span>
                </div>
                {active.answerMode ==
                  StudySetAnswerMode.FlashcardContentDefinition &&
                  choice.image && (
                    <div className="ml-2">
                      <SquareAssetPreview
                        rounded={8}
                        size={60}
                        src={choice.image}
                      />
                    </div>
                  )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
