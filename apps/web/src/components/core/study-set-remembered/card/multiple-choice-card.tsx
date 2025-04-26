import { StudySetAnswerMode } from "@highschool/interfaces";
import { ScriptFormatter } from "@highschool/lib/script-formatter";
import { cn } from "@highschool/ui/lib/utils";
import { IconCircleCheckFilled, IconCircleX } from "@tabler/icons-react";

import { SquareAssetPreview } from "../../study-set/square-asset-preview";
import { RichPromptDisplay } from "../../study-set-test/rich-prompt-display";
import { GenericLabel } from "../../common/generic-label";
import { Clickable } from "../../study-set-test/clickable";
import { MultipleChoiceData } from "../types";

import { CardProps } from "./common";

import { rememberedRichWord, rememberedWord } from "@/utils/terms";
import { useCardRememberedSelector } from "@/hooks/use-card-remembered-selector";
import { useRememberedContext } from "@/stores/use-study-set-remembered-store";

export const MultipleChoiceCard: React.FC<CardProps> = ({ i, result }) => {
  const { question, answered, data, remarks } =
    useCardRememberedSelector<MultipleChoiceData>(i);

  const answerQuestion = useRememberedContext((s) => s.answerQuestion);
  const clearAnswer = useRememberedContext((s) => s.clearAnswer);

  const evaluation = result ? data.answer === data.term.contentId : undefined;
  const remark = result ? remarks?.[0] : undefined;

  const evaluateTerm = (term: string): boolean | undefined => {
    if (evaluation == undefined) return undefined;
    if (term == data.answer) return evaluation;
    if (term == data.term.contentId) return true;

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
        richText={
          rememberedRichWord(question.answerMode, data.term, "prompt")?.richText
        }
        text={rememberedWord(question.answerMode, data.term, "prompt")}
      />
      <div className="flex flex-col gap-2">
        <GenericLabel evaluation={evaluation}>
          {remark?.remark ??
            `Chọn ${question.answerMode == StudySetAnswerMode.FlashcardContentDefinition ? "định nghĩa" : "thuật ngữ"}`}
        </GenericLabel>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.choices.map((choice) => {
            return (
              <div key={choice.contentId} className="h-auto">
                <Clickable
                  disabled={result}
                  evaluation={evaluateTerm(choice.contentId)}
                  isSelected={answered && data.answer == choice.contentId}
                  onClick={() => {
                    if (data.answer !== choice.contentId)
                      answerQuestion<MultipleChoiceData>(i, choice.contentId);
                    else clearAnswer(i);
                  }}
                >
                  <Wrapper evaluation={evaluateTerm(choice.contentId)}>
                    <div className="flex w-full flex-row items-center justify-between gap-4">
                      <div
                        className={cn(
                          "whitespace-pre-wrap text-start text-lg",
                          evaluateTerm(choice.contentId) !== undefined
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
                          {rememberedWord(
                            question.answerMode,
                            choice,
                            "answer",
                          )}
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
