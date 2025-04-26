import { StudySetAnswerMode } from "@highschool/interfaces";
import {
  IconCircleCheck,
  IconCircleCheckFilled,
  IconCircleX,
  IconCircleXFilled,
} from "@tabler/icons-react";

import { SquareAssetPreview } from "../../study-set/square-asset-preview";
import { GenericLabel } from "../../common/generic-label";
import { Clickable } from "../../study-set-test/clickable";
import { EvaluatedTrue } from "../../study-set-test/evaluated";
import { TrueFalseData } from "../types";
import { RichPromptDisplay } from "../../study-set-test/rich-prompt-display";

import { CardProps } from "./common";

import { rememberedRichWord, rememberedWord } from "@/utils/terms";
import { useRememberedContext } from "@/stores/use-study-set-remembered-store";
import { useCardRememberedSelector } from "@/hooks/use-card-remembered-selector";

export const TrueFalseCard = ({ i, result }: CardProps) => {
  const { question, data, answer, remarks } =
    useCardRememberedSelector<TrueFalseData>(i);

  const rightSide = data.distractor
    ? rememberedRichWord(question.answerMode, data.distractor, "answer")
    : rememberedRichWord(question.answerMode, data.term, "answer");

  const answerQuestion = useRememberedContext((s) => s.answerQuestion);
  const clearAnswer = useRememberedContext((s) => s.clearAnswer);

  const trueSelected = answer === true;
  const falseSelected = answer === false;

  const evaluation = result
    ? (!data.distractor && trueSelected) || (!!data.distractor && falseSelected)
    : undefined;

  const remark = result ? remarks?.[0] : undefined;

  const Asset = () => (
    <SquareAssetPreview rounded={8} size={80} src={data.term.image || ""} />
  );

  return (
    <>
      <div className="grid grid-cols-[1fr_2px_1fr] gap-3">
        <div className="w-full pr-4">
          <RichPromptDisplay
            extra={
              question.answerMode == StudySetAnswerMode.FlashcardContentTerm &&
              data.term.image && <Asset />
            }
            label={
              question.answerMode ==
              StudySetAnswerMode.FlashcardContentDefinition
                ? "Thuật ngữ"
                : "Định nghĩa"
            }
            richText={
              rememberedRichWord(question.answerMode, data.term, "prompt")
                .richText
            }
            text={
              rememberedRichWord(question.answerMode, data.term, "prompt")
                .text as string
            }
          />
        </div>
        <div className="grid h-full bg-gray-200 dark:bg-gray-700" />
        <div className="my-4 hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
        <RichPromptDisplay
          extra={
            question.answerMode ==
              StudySetAnswerMode.FlashcardContentDefinition &&
            data.term.image && <Asset />
          }
          label={
            question.answerMode == StudySetAnswerMode.FlashcardContentDefinition
              ? "Định nghĩa"
              : "Thuật ngữ"
          }
          richText={rightSide.richText}
          text={rightSide.text as string}
        />
      </div>
      <div className="flex flex-col gap-2">
        <GenericLabel evaluation={evaluation}>
          {remark?.remark ?? "Chọn câu trả lời"}
        </GenericLabel>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <Clickable
            hasIcon
            disabled={result}
            evaluation={trueSelected ? evaluation : undefined}
            isSelected={trueSelected}
            onClick={() => {
              if (!trueSelected) answerQuestion<TrueFalseData>(i, true);
              else clearAnswer(i);
            }}
          >
            <div className="flex flex-row items-center gap-2">
              {trueSelected ? (
                <IconCircleCheckFilled size={18} />
              ) : (
                <IconCircleCheck size={18} />
              )}
              <p>Đúng</p>
            </div>
          </Clickable>
          <Clickable
            hasIcon
            disabled={result}
            evaluation={falseSelected ? evaluation : undefined}
            isSelected={falseSelected}
            onClick={() => {
              if (!falseSelected) answerQuestion<TrueFalseData>(i, false);
              else clearAnswer(i);
            }}
          >
            <div className="flex flex-row items-center gap-2">
              {falseSelected ? (
                <IconCircleXFilled size={18} />
              ) : (
                <IconCircleX size={18} />
              )}
              <p>Sai</p>
            </div>
          </Clickable>
        </div>
      </div>
      {result && !!data.distractor && (
        <div className="mt-4 flex flex-col gap-2">
          <GenericLabel>
            {" "}
            {question.answerMode ==
            StudySetAnswerMode.FlashcardContentDefinition
              ? "Định nghĩa"
              : "Thuật ngữ"}{" "}
            chính xác
          </GenericLabel>
          <EvaluatedTrue>
            {rememberedWord(question.answerMode, data.term, "answer")}
          </EvaluatedTrue>
        </div>
      )}
    </>
  );
};
