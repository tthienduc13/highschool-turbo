import { MultipleChoiceData, StudySetAnswerMode } from "@highschool/interfaces";
import { ScriptFormatter } from "@highschool/lib/script-formatter";
import { cn } from "@highschool/ui/lib/utils";
import { IconCircleCheckFilled, IconCircleX } from "@tabler/icons-react";

import { SquareAssetPreview } from "../../study-set/square-asset-preview";
import { Clickable } from "../clickable";
import { GenericLabel } from "../generic-label";
import { RichPromptDisplay } from "../rich-prompt-display";

import { CardProps } from "./common";

import { richWord, word } from "@/utils/terms";
import { useTestContext } from "@/stores/use-study-set-test-store";
import { useCardSelector } from "@/hooks/use-card-selector";

export const MultipleChoiceCard: React.FC<CardProps> = ({ i, result }) => {
  const { question, answered, data, remarks } =
    useCardSelector<MultipleChoiceData>(i);

  const answerQuestion = useTestContext((s) => s.answerQuestion);
  const clearAnswer = useTestContext((s) => s.clearAnswer);

  const evaluation = result ? data.answer === data.term.id : undefined;
  const remark = result ? remarks?.[0] : undefined;

  const evaluateTerm = (term: string): boolean | undefined => {
    if (evaluation == undefined) return undefined;
    if (term == data.answer) return evaluation;
    if (term == data.term.id) return true;

    return undefined;
  };

  const EvaluationWrapper: React.FC<
    React.PropsWithChildren<{ evaluation?: boolean }>
  > = ({ evaluation, children }) => {
    const Icon = evaluation ? IconCircleCheckFilled : IconCircleX;

    return (
      <div className="flex w-full flex-row items-center gap-2">
        {evaluation !== undefined && (
          <div>
            <Icon size={18} />
          </div>
        )}
        {children}
      </div>
    );
  };

  const Wrapper: React.FC<
    React.PropsWithChildren<{ evaluation: boolean | undefined }>
  > = ({ evaluation, children }) => {
    if (evaluation === undefined) return <>{children}</>;

    return (
      <EvaluationWrapper evaluation={evaluation}>{children}</EvaluationWrapper>
    );
  };

  return (
    <>
      <RichPromptDisplay
        extra={
          question.answerMode == StudySetAnswerMode.FlashcardContentTerm &&
          data.term.image && (
            <SquareAssetPreview
              rounded={8}
              size={100}
              src={data.term.image || ""}
            />
          )
        }
        label={
          question.answerMode == StudySetAnswerMode.FlashcardContentDefinition
            ? "Thuật ngữ"
            : "Định nghĩa"
        }
        {...richWord(question.answerMode, data.term, "prompt")}
      />
      <div className="flex flex-col gap-2">
        <GenericLabel evaluation={evaluation}>
          {remark?.remark ??
            `Chọn ${question.answerMode == StudySetAnswerMode.FlashcardContentDefinition ? "định nghĩa" : "thuật ngữ"}`}
        </GenericLabel>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.choices.map((choice) => {
            return (
              <div key={choice.id} className="h-auto">
                <Clickable
                  disabled={result}
                  evaluation={evaluateTerm(choice.id)}
                  isSelected={answered && data.answer == choice.id}
                  onClick={() => {
                    if (data.answer !== choice.id)
                      answerQuestion<MultipleChoiceData>(i, choice.id);
                    else clearAnswer(i);
                  }}
                >
                  <Wrapper evaluation={evaluateTerm(choice.id)}>
                    <div className="flex w-full flex-row items-center justify-between gap-4">
                      <div
                        className={cn(
                          "whitespace-pre-wrap text-start text-lg",
                          evaluateTerm(choice.id) !== undefined
                            ? "font-medium"
                            : "",
                        )}
                        style={
                          result
                            ? {
                                cursor: "text",
                                pointerEvents: "auto",
                                userSelect: "text",
                              }
                            : {}
                        }
                      >
                        <ScriptFormatter>
                          {word(question.answerMode, choice, "answer")}
                        </ScriptFormatter>
                      </div>
                      {question.answerMode ==
                        StudySetAnswerMode.FlashcardContentDefinition &&
                        choice.image && (
                          <SquareAssetPreview
                            rounded={8}
                            size={60}
                            src={choice.image}
                          />
                        )}
                    </div>
                  </Wrapper>
                </Clickable>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
