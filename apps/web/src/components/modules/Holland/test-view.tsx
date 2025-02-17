import { useMemo } from "react";
import { useSubmitHollandMutation } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";

import { AnswerOption } from "./answer-option";

import { useHollandTestContext } from "@/stores/use-holland-store";

interface TestViewProps {
  submitAnswer: ReturnType<typeof useSubmitHollandMutation>;
}

export const TestView = ({ submitAnswer }: TestViewProps) => {
  const questions = useHollandTestContext((s) => s.testQuestions);
  const currentQuestionIndex = useHollandTestContext(
    (s) => s.currentQuestionIndex,
  );
  const setCurrentQuestionIndex = useHollandTestContext(
    (s) => s.setCurrentQuestionIndex,
  );
  const userAnswers = useHollandTestContext((s) => s.userTestAnswers);
  const setResult = useHollandTestContext((s) => s.setResult);

  const isUserAlreadyPickAnswer = useMemo(() => {
    const currentAnswer = userAnswers[currentQuestionIndex];

    return (currentAnswer?.answerOption?.length ?? 0) >= 3;
  }, [userAnswers, currentQuestionIndex]);

  function handleNextButtonClick() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  function handlePreviousButtonClick() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  const progress = useMemo(() => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  }, [currentQuestionIndex, questions]);

  const handleSubmit = () => {
    if (!isUserAlreadyPickAnswer) {
      alert("Vui lòng trả lời toàn bộ câu hỏi");

      return;
    }
    submitAnswer.mutate(userAnswers, {
      onSuccess: (data) => {
        setResult(data.hollandTypeContentList, data.hollandTypeResult);
      },
      onError: () => {
        alert("Đã xảy ra lỗi khi gửi câu trả lời. Vui lòng thử lại.");
      },
    });
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="mt-5 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-2.5 rounded-full bg-blue-500`}
          style={{ width: `${progress ?? 0}%` }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-center text-lg font-bold">
          {currentQuestionIndex + 1}
        </div>
        <div className="text-center text-2xl">
          {questions[currentQuestionIndex]?.question}
        </div>
      </div>
      <AnswerOption />
      <div className="flex w-full flex-row gap-5">
        <Button
          className="w-full"
          disabled={currentQuestionIndex === 0 || submitAnswer.isPending}
          size={"lg"}
          variant={"outline"}
          onClick={handlePreviousButtonClick}
        >
          Câu trước
        </Button>
        {isUserAlreadyPickAnswer &&
        currentQuestionIndex === questions.length - 1 ? (
          <Button
            className="w-full"
            disabled={submitAnswer.isPending}
            size={"lg"}
            variant={"default"}
            onClick={handleSubmit}
          >
            {submitAnswer.isPending ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              "  Xem kết quả"
            )}
          </Button>
        ) : (
          <Button
            className="w-full"
            disabled={!isUserAlreadyPickAnswer}
            size={"lg"}
            variant={"outline"}
            onClick={handleNextButtonClick}
          >
            Câu tiếp theo
          </Button>
        )}
      </div>
    </div>
  );
};
