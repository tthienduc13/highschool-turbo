import { MBTIAnswerOptions } from "@highschool/interfaces";
import { buttonVariants } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";

import { useMBTITestContext } from "@/stores/use-mbti-store";

interface AnswerOptionProps {
  goToNextQuestion: () => void;
}

export const AnswerOption = ({ goToNextQuestion }: AnswerOptionProps) => {
  const questions = useMBTITestContext((s) => s.testQuestions);
  const currentQuestionIndex = useMBTITestContext(
    (s) => s.currentQuestionIndex,
  );
  const setAnswer = useMBTITestContext((s) => s.setAnswerForQuestion);
  const userAnswer = useMBTITestContext((s) => s.userTestAnswers);

  const handleAnswerSelect = (answer: MBTIAnswerOptions) => {
    setAnswer(currentQuestionIndex, questions[currentQuestionIndex].id, answer);
    goToNextQuestion();
  };

  const selectedAnswer = userAnswer[currentQuestionIndex];

  return (
    <div className="flex w-full flex-col gap-4">
      {questions[currentQuestionIndex].options.map((answer) => (
        <div
          key={answer.option}
          onClick={() => handleAnswerSelect(answer)}
          className={cn(
            buttonVariants({
              variant:
                selectedAnswer?.option === answer.option
                  ? "default"
                  : "outline",
              size: "lg",
            }),
            "h-full w-full cursor-pointer justify-start whitespace-normal py-2 text-left text-lg",
          )}
        >
          {answer.text}
        </div>
      ))}
    </div>
  );
};
