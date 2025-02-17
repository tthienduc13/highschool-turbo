import React, { useState } from "react";
import { useParams } from "next/navigation";
import { QuizCategory, QuizSubmission } from "@highschool/interfaces";
import {
  useQuizQuery,
  useSubmitQuizMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import { Label } from "@highschool/ui/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@highschool/ui/components/ui/radio-group";
import {
  IconChevronLeft,
  IconChevronRight,
  IconLoader2,
} from "@tabler/icons-react";

import { Loading } from "@/components/core/common/loading";
import { Container } from "@/components/core/layouts/container";

interface QuizProps {
  setShowQuiz: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Quiz = ({ setShowQuiz }: QuizProps) => {
  const params = useParams();
  const { data, isLoading } = useQuizQuery({
    questionCategory: QuizCategory.Lesson,
    categoryId: params.lessonId as string,
  });

  const submitQuiz = useSubmitQuizMutation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = data?.data?.questions?.[currentQuestionIndex];

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (
      data?.data?.questions &&
      currentQuestionIndex < data?.data?.questions.length - 1
    ) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleSubmit = () => {
    const submission: QuizSubmission = {
      questionCategory: QuizCategory.Lesson,
      categoryId: params.lessonId as string,
      answers: Object.entries(selectedAnswers).map(
        ([questionId, answerId]) => ({
          questionId,
          questionAnswerIds: [answerId],
        }),
      ),
    };

    submitQuiz.mutate(submission, {
      onSuccess: () => {
        setQuizCompleted(true);
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data?.questions || data?.data?.questions.length === 0) {
    return (
      <Container className="flex flex-col gap-10 pt-10" maxWidth="4xl">
        <h2 className="text-2xl font-bold">No questions available</h2>
      </Container>
    );
  }

  if (showSummary) {
    return (
      <Container className="p-10" maxWidth="4xl">
        <Card className="mx-auto w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Tổng kết</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.data?.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="flex items-center justify-between"
                >
                  <span>Câu {index + 1}</span>
                  <span
                    className={
                      selectedAnswers[question.id]
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {selectedAnswers[question.id]
                      ? "Đã trả lời"
                      : "Chưa trả lời"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              disabled={submitQuiz.isPending}
              onClick={() => setShowSummary(false)}
            >
              Xem lại
            </Button>
            <Button disabled={submitQuiz.isPending} onClick={handleSubmit}>
              {submitQuiz.isPending ? (
                <IconLoader2 className="animate-spin" />
              ) : (
                "  Xem kết quả"
              )}
            </Button>
          </CardFooter>
        </Card>
      </Container>
    );
  }

  if (quizCompleted) {
    return (
      <Container className="p-10" maxWidth="4xl">
        <Card className="mx-auto w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Tổng kết</CardTitle>
          </CardHeader>
          <CardContent />
          <CardFooter className="flex justify-end">
            <Button onClick={() => setShowQuiz(false)}>Xong</Button>
          </CardFooter>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="flex flex-col gap-10 p-10" maxWidth="4xl">
      <h2 className="text-2xl font-bold">Câu hỏi</h2>
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{currentQuestion?.questionContent}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswers[currentQuestion?.id!]}
            onValueChange={(value) =>
              handleAnswerSelect(currentQuestion?.id!, value)
            }
          >
            {currentQuestion?.answers.map((answer) => (
              <div key={answer.id} className="flex items-center space-x-2">
                <RadioGroupItem id={answer.id} value={answer.id} />
                <Label htmlFor={answer.id}>{answer.answerContent}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-muted-foreground text-sm">
            Câu {currentQuestionIndex + 1} trên {data?.data?.questions.length}
          </div>
          <div className="flex space-x-2">
            <Button
              disabled={currentQuestionIndex === 0}
              onClick={handlePreviousQuestion}
            >
              <IconChevronLeft className="h-4 w-4" />
              Câu trước
            </Button>
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex === data?.data?.questions.length - 1
                ? "Xem lại"
                : "Câu sau"}
              <IconChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Container>
  );
};
