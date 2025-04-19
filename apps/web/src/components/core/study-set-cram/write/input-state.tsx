import { useTheme } from "next-themes";
import { useRef, useState } from "react";
import { Input } from "@highschool/ui/components/ui/input";
import { cn } from "@highschool/ui/lib/utils";
import { StudySetAnswerMode } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";

import { GenericLabel } from "../../study-set-learn/generic-label";

import { useContainerContext } from "@/stores/use-container-store";
import { Question, useCramContext } from "@/stores/use-study-set-cram-store";
import { evaluate, EvaluationResult } from "@/utils/evaluator";
import { word } from "@/utils/terms";

export interface InputStateProps {
  active: Question;
  onSubmit: (guess?: string) => void;
}

export const InputState: React.FC<InputStateProps> = ({ active, onSubmit }) => {
  const { theme } = useTheme();
  const mutlipleAnswerMode = useContainerContext((s) => s.multipleAnswerMode);
  const answerCorrectly = useCramContext((s) => s.answerCorrectly);
  const answerIncorrectly = useCramContext((s) => s.answerIncorrectly);
  const answerUnknownPartial = useCramContext((s) => s.answerUnknownPartial);

  const inputBg = theme === "dark" ? "gray.800" : "gray.100";
  const placeholderColor = theme === "dark" ? "gray.400" : "gray.600";

  const [answer, setAnswer] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (skip = false) => {
    if (skip) {
      onSubmit();
      answerIncorrectly(active.term.id);

      return;
    }

    if (!answer.trim().length) return;

    onSubmit(answer.trim());

    const evaluation = evaluate(
      mutlipleAnswerMode,
      answer,
      word(active.answerMode, active.term, "answer"),
    );

    if (evaluation === EvaluationResult.Correct) {
      answerCorrectly(active.term.id);
    } else if (evaluation === EvaluationResult.Incorrect) {
      answerIncorrectly(active.term.id);
    } else {
      answerUnknownPartial();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <GenericLabel>Câu trả lời của bạn</GenericLabel>
        <div className="flex flex-col gap-3">
          <Input
            ref={inputRef}
            autoComplete="off"
            className={cn(
              "font-bold px-4 py-6 rounded-lg !text-lg",
              `placeholder:text-[${placeholderColor}] bg-[${inputBg}]`,
            )}
            placeholder={
              active.answerMode === StudySetAnswerMode.FlashcardContentTerm
                ? "Nhập định nghĩa..."
                : "Nhập thuật ngữ..."
            }
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTimeout(() => {
                  handleSubmit();
                });
              }
            }}
          />
        </div>
      </div>
      <div className="flex flex-row justify-end gap-2">
        <Button
          className="text-primary hover:text-primary hover:bg-primary/10"
          variant="ghost"
          onClick={() => handleSubmit(true)}
        >
          Không biết?
        </Button>
        <Button onClick={() => handleSubmit()}>Trả lời</Button>
      </div>
    </div>
  );
};
