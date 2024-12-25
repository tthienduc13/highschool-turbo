import { CardProps } from "./common";
import { richWord, word } from "@/utils/terms";
import { Clickable } from "../clickable";
import {
    IconCircleCheck,
    IconCircleCheckFilled,
    IconCircleX,
    IconCircleXFilled,
} from "@tabler/icons-react";
import { EvaluatedTrue } from "../evaluated";
import { useCardSelector } from "@/hooks/use-card-selector";
import { StudySetAnswerMode, TrueFalseData } from "@highschool/interfaces";
import { useTestContext } from "@/stores/use-study-set-test-store";
import { SquareAssetPreview } from "../../study-set/square-asset-preview";
import { RichPromptDisplay } from "../rich-prompt-display";
import { GenericLabel } from "../generic-label";

export const TrueFalseCard = ({ i, result }: CardProps) => {
    const { question, data, answer, remarks } =
        useCardSelector<TrueFalseData>(i);

    const rightSide = data.distractor
        ? richWord(question.answerMode, data.distractor, "answer")
        : richWord(question.answerMode, data.term, "answer");

    const answerQuestion = useTestContext((s) => s.answerQuestion);
    const clearAnswer = useTestContext((s) => s.clearAnswer);

    const trueSelected = answer === true;
    const falseSelected = answer === false;

    const evaluation = result
        ? (!data.distractor && trueSelected) ||
          (!!data.distractor && falseSelected)
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
                        label={
                            question.answerMode ==
                            StudySetAnswerMode.FlashcardContentDefinition
                                ? "Thuật ngữ"
                                : "Định nghĩa"
                        }
                        extra={
                            question.answerMode ==
                                StudySetAnswerMode.FlashcardContentTerm &&
                            data.term.image && <Asset />
                        }
                        {...richWord(question.answerMode, data.term, "prompt")}
                    />
                </div>
                <div className="grid h-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="my-4 hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="w-full pl-4">
                    <RichPromptDisplay
                        label={
                            question.answerMode ==
                            StudySetAnswerMode.FlashcardContentDefinition
                                ? "Định nghĩa"
                                : "Thuật ngữ"
                        }
                        extra={
                            question.answerMode ==
                                StudySetAnswerMode.FlashcardContentDefinition &&
                            data.term.image && <Asset />
                        }
                        {...rightSide}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <GenericLabel evaluation={evaluation}>
                    {remark?.remark ?? "Chọn câu trả lời"}
                </GenericLabel>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                    <Clickable
                        hasIcon
                        disabled={result}
                        isSelected={trueSelected}
                        evaluation={trueSelected ? evaluation : undefined}
                        onClick={() => {
                            if (!trueSelected)
                                answerQuestion<TrueFalseData>(i, true);
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
                        isSelected={falseSelected}
                        evaluation={falseSelected ? evaluation : undefined}
                        onClick={() => {
                            if (!falseSelected)
                                answerQuestion<TrueFalseData>(i, false);
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
                        {word(question.answerMode, data.term, "answer")}
                    </EvaluatedTrue>
                </div>
            )}
        </>
    );
};
