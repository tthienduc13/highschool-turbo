import { HollandAnswerOptions } from "@highschool/interfaces";
import { buttonVariants } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";

import { useHollandTestContext } from "@/stores/use-holland-store";

export const AnswerOption = () => {
  const userAnswer = useHollandTestContext((state) => state.userTestAnswers);
  const setAnswer = useHollandTestContext(
    (state) => state.setAnswerForQuestion,
  );
  const currentQuestionIndex = useHollandTestContext(
    (s) => s.currentQuestionIndex,
  );
  const question = useHollandTestContext((s) => s.testQuestions);
  const currentQuestionId = question[currentQuestionIndex].id;
  const answers = question[currentQuestionIndex].options;
  const handleAnswerSelect = (answer: HollandAnswerOptions) => {
    const currentAnswers = userAnswer[currentQuestionIndex]?.answerOption || [];
    const isSelected = currentAnswers.includes(answer.option);

    const updatedAnswers = isSelected
      ? currentAnswers.filter((option) => option !== answer.option)
      : [...currentAnswers, answer.option];

    setAnswer(
      currentQuestionIndex,
      currentQuestionId,
      answers.filter((a) => updatedAnswers.includes(a.option)),
    );
  };

  const selectedAnswers = userAnswer[currentQuestionIndex]?.answerOption || [];

  return (
    <div className="flex w-full flex-col gap-4">
      {answers.map((answer) => (
        <div
          key={answer.option}
          onClick={() => handleAnswerSelect(answer)}
          className={cn(
            buttonVariants({
              variant: selectedAnswers.includes(answer.option)
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
