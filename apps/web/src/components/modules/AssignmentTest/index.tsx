"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@highschool/ui/components/ui/button";
import {
  IconAlertCircle,
  IconArrowBackUp,
  IconArrowLeft,
  IconArrowRight,
  IconBook,
  IconCircleCheck,
  IconClock,
  IconHelpCircle,
  IconInfoCircle,
  IconLock,
  IconSchool,
  IconSend,
  IconUser,
} from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import {
  useAssignmentQuery,
  useSubmitMutation,
} from "@highschool/react-query/queries";
import { Separator } from "@highschool/ui/components/ui/separator";
import { toast } from "sonner";
import { Progress } from "@highschool/ui/components/ui/progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "@highschool/ui/components/ui/radio-group";
import { Label } from "@highschool/ui/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";

import { Badge } from "./badge";

import { Container } from "@/components/core/layouts/container";
import { Hint } from "@/components/core/common/hint";
import { Loading } from "@/components/core/common/loading";

export function formatTimeRemaining(milliseconds: number): string {
  let seconds = Math.floor(milliseconds / 1000);

  const hours = Math.floor(seconds / 3600);

  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);

  seconds %= 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function AssignmentTestModule() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const handleBack = () => {
    if (confirm("Bài làm của bạn sẽ không được lưu lại")) {
      router.push(`/zone/${params.id}/assignment`);
    }
  };

  const { data: testData, isLoading } = useAssignmentQuery({
    assignmentId: params.assignmentId as string,
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [answers, setAnswers] = useState<
    Record<string, { index: number; text: string }>
  >({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [isBeforeAvailableTime, setIsBeforeAvailableTime] = useState(false);
  const [isAfterDueTime, setIsAfterDueTime] = useState(false);
  const [userScore, setUserScore] = useState<number | null>(null);

  const totalQuestions = testData?.questions?.length ?? 0;
  const currentQuestion = testData?.questions?.[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  const handleAnswerSelect = (
    questionId: string,
    answerIndex: number,
    answerText: string,
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { index: answerIndex, text: answerText },
    }));
  };

  const navigateToQuestion = (index: number) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestionIndex(index);
    }
  };

  const apiSubmit = useSubmitMutation();

  const handleSubmitTest = async () => {
    if (!testData?.questions?.length) {
      toast.error("Không có câu hỏi nào trong bài kiểm tra");

      return;
    }

    setIsSubmitting(true);

    try {
      const formattedAnswers = Object.entries(answers).map(([id, answer]) => ({
        id,
        answers: answer.text,
      }));

      await apiSubmit.mutateAsync(
        {
          assignmentId: params.assignmentId as string,
          answers: formattedAnswers,
        },
        {
          onSuccess: (data) => {
            setIsTestSubmitted(true);
            toast.success("Nộp bài thành công", {
              description: "Bài kiểm tra của bạn đã được nộp thành công.",
            });
            setUserScore(data.data ?? 0);
            queryClient.invalidateQueries({
              queryKey: ["getAssignmentsByZone", params.id],
            });
          },
        },
      );
    } catch (error) {
      toast.error("Lỗi khi nộp bài", {
        description: "Đã xảy ra lỗi khi nộp bài kiểm tra. Vui lòng thử lại.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (testData?.dueAt) {
      const dueTime = new Date(testData.dueAt).getTime();
      const now = new Date().getTime();

      if (now > dueTime) {
        setIsAfterDueTime(true);
      } else {
        setIsAfterDueTime(false);
      }
    }
  }, [testData?.dueAt]);

  useEffect(() => {
    if (testData?.submitted) {
      toast.info("Bài kiểm tra đã được nộp trước đó", {
        description: "Bạn không thể làm lại bài kiểm tra này.",
      });
      router.push(
        `/zone/${params.id}/assignment/${params.assignmentId}/review`,
      );
    }
  }, [testData?.submitted, params.id, params.assignmentId, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (!testData || testData.submitted) {
    return;
  }

  if (isBeforeAvailableTime && testData) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="w-full overflow-hidden">
          <div className="h-2 bg-amber-500" />
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {testData?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-amber-100">
              <IconLock className="size-12 text-amber-500" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">
              Chưa đến thời gian mở bài!
            </h2>
            <p className="text-muted-foreground mb-6 text-center">
              Bài kiểm tra này sẽ được mở vào:{" "}
              <strong>
                {new Date(testData.availableAt).toLocaleString("vi-VN")}
              </strong>
            </p>
            <div className="mb-6 w-full max-w-md rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
              <div className="mb-2 flex items-center gap-2">
                <IconInfoCircle className="size-5 text-amber-500" />
                <h3 className="font-medium">Thông tin bài kiểm tra</h3>
              </div>
              <div className="mt-2 grid gap-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Thời gian mở:</span>
                  <span className="font-medium">
                    {new Date(testData.availableAt).toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Thời gian đóng:</span>
                  <span className="font-medium">
                    {new Date(testData.lockedAt).toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Số câu hỏi:</span>
                  <span className="font-medium">{testData.totalQuestion}</span>
                </div>
              </div>
            </div>
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => router.push(`/zone/${params.id}/assignment`)}
            >
              <IconArrowLeft />
              Quay lại
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAfterDueTime && testData) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="w-full overflow-hidden">
          <div className="h-2 bg-red-500" />
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {testData?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-red-100">
              <IconAlertCircle className="size-12 text-red-500" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">
              Đã hết thời gian làm bài
            </h2>
            <p className="text-muted-foreground mb-6 text-center">
              Bài kiểm tra này đã đóng vào:{" "}
              <strong>
                {new Date(testData.dueAt).toLocaleString("vi-VN")}
              </strong>
            </p>
            <div className="mb-6 w-full max-w-md rounded-lg border border-red-500 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
              <div className="mb-2 flex items-center gap-2">
                <IconInfoCircle className="size-5 text-red-500" />
                <h3 className="font-medium">Thông tin bài kiểm tra</h3>
              </div>
              <div className="mt-2 grid gap-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Thời gian mở:</span>
                  <span className="font-medium">
                    {new Date(testData.availableAt).toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Thời gian đóng:</span>
                  <span className="font-medium">
                    {new Date(testData.lockedAt).toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Số câu hỏi:</span>
                  <span className="font-medium">{testData.totalQuestion}</span>
                </div>
              </div>
            </div>
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => router.push(`/zone/${params.id}/assignment`)}
            >
              <IconArrowLeft />
              Quay lại
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isTestSubmitted) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="w-full overflow-hidden">
          <div className="h-2 bg-blue-500" />
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {testData?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-green-100">
              <IconCircleCheck className="size-12 text-green-500" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Nộp bài thành công!</h2>
            <p className="text-muted-foreground mb-6 text-center">
              Điểm của bạn: {userScore}/ 10
            </p>
            <p className="text-muted-foreground mb-6 text-center">
              Bạn đã trả lời {answeredCount} trong số {totalQuestions} câu hỏi.
            </p>
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => router.push(`/zone/${params.id}/assignment`)}
            >
              Quay lại trang chủ
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showInstructions) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="w-full overflow-hidden">
          <div className="h-2 bg-blue-500" />
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {testData?.title}
            </CardTitle>
            <CardDescription>Thông tin và hướng dẫn làm bài</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex-1">
                <div className="space-y-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                  <div className="flex items-center gap-3">
                    <IconBook className="size-5 text-blue-500" />
                    <h3 className="font-medium">Thông tin bài kiểm tra</h3>
                  </div>
                  <Separator />
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Tổng số câu hỏi:
                      </span>
                      <span className="font-medium">
                        {testData?.totalQuestion}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Thời gian làm bài:
                      </span>
                      <span className="font-medium">
                        {testData?.dueAt
                          ? formatTimeRemaining(
                              new Date(testData.dueAt).getTime() -
                                new Date().getTime(),
                            )
                          : "Không giới hạn"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Thời gian mở:
                      </span>
                      <span className="font-medium">
                        {testData?.availableAt
                          ? new Date(testData.availableAt).toLocaleString(
                              "vi-VN",
                            )
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Thời gian đóng:
                      </span>
                      <span className="font-medium">
                        {testData?.lockedAt
                          ? new Date(testData.lockedAt).toLocaleString("vi-VN")
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="space-y-4 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-950">
                  <div className="flex items-center gap-3">
                    <IconInfoCircle className="size-5 text-indigo-500" />
                    <h3 className="font-medium">Hướng dẫn làm bài</h3>
                  </div>
                  <Separator />
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <IconCircleCheck className="mt-0.5 size-4 shrink-0 text-indigo-500" />
                      <span>Chọn một đáp án đúng cho mỗi câu hỏi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <IconCircleCheck className="mt-0.5 size-4 shrink-0 text-indigo-500" />
                      <span>
                        Sử dụng thanh điều hướng bên phải để di chuyển giữa các
                        câu hỏi
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <IconCircleCheck className="mt-0.5 size-4 shrink-0 text-indigo-500" />
                      <span>
                        Bạn có thể quay lại các câu hỏi trước để kiểm tra hoặc
                        thay đổi câu trả lời
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <IconCircleCheck className="mt-0.5 size-4 shrink-0 text-indigo-500" />
                      <span>
                        <strong>
                          Bạn phải trả lời tất cả các câu hỏi trước khi nộp bài
                        </strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
              <div className="mb-2 flex items-center gap-2">
                <IconHelpCircle className="size-5 text-amber-500" />
                <h3 className="font-medium">Lưu ý quan trọng</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Đây là bài kiểm tra tiếng Anh. Hãy đọc kỹ câu hỏi và các lựa
                chọn trước khi chọn câu trả lời. Bạn có thể sử dụng các nút điều
                hướng để di chuyển giữa các câu hỏi. Bạn phải trả lời tất cả các
                câu hỏi trước khi có thể nộp bài.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Button
              className="bg-blue-500 px-8 hover:bg-blue-600"
              onClick={() => setShowInstructions(false)}
            >
              Bắt đầu làm bài
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <Container className="mt-10" maxWidth="6xl">
      <div className="mb-8 flex flex-row items-center gap-2">
        <Hint label="Quay lại" side="bottom">
          <Button size={"icon"} variant={"ghost"} onClick={handleBack}>
            <IconArrowBackUp />
          </Button>
        </Hint>
        <h1>Assignment Test</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left column - Test info and current question */}
        <div className="md:col-span-2">
          <Card className="mb-6 w-full overflow-hidden">
            <div className="h-1 bg-blue-500" />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">
                  {testData.title}
                </CardTitle>
                {timeRemaining !== null && (
                  <Badge
                    className="flex items-center gap-1 px-3 py-1"
                    variant="outline"
                  >
                    <IconClock className="size-4" />
                    <span>{formatTimeRemaining(timeRemaining)}</span>
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="text-xs" variant="secondary">
                    {testData.totalQuestion} Câu hỏi
                  </Badge>
                  <Badge
                    className="flex items-center gap-1 text-xs"
                    variant="outline"
                  >
                    <IconUser className="size-3" />
                    <span>Học viên</span>
                  </Badge>
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <span className="flex items-center gap-1">
                    <IconCircleCheck className="size-4 text-green-500" />
                    {answeredCount} Đã trả lời
                  </span>
                  <span className="flex items-center gap-1">
                    <IconAlertCircle className="size-4 text-amber-500" />
                    {(totalQuestions || 0) - answeredCount} Còn lại
                  </span>
                </div>
              </div>
              <Progress
                className="mt-3 h-2"
                value={(answeredCount / (totalQuestions || 1)) * 100}
              />
            </CardHeader>
          </Card>

          <Card className="w-full overflow-hidden">
            <div className="h-1 bg-blue-500" />
            <CardHeader className="border-b pb-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">
                  Câu hỏi {currentQuestionIndex + 1} / {totalQuestions}
                </span>
                <Badge
                  variant={
                    currentQuestion && answers[currentQuestion.id] !== undefined
                      ? "success"
                      : "outline"
                  }
                >
                  {currentQuestion && answers[currentQuestion.id] !== undefined
                    ? "Đã trả lời"
                    : "Chưa trả lời"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {currentQuestion && (
                <div className="mb-6">
                  <h3 className="mb-4 text-lg font-medium">
                    {currentQuestion.question}
                  </h3>
                  <RadioGroup
                    className="space-y-3"
                    value={answers[currentQuestion.id]?.index.toString() || ""}
                    onValueChange={(value) =>
                      handleAnswerSelect(
                        currentQuestion.id,
                        Number.parseInt(value),
                        currentQuestion.answers[Number.parseInt(value)],
                      )
                    }
                  >
                    {currentQuestion.answers.map((answer, index) => (
                      <div
                        key={index}
                        className={`flex items-start space-x-2 rounded-md border p-3 transition-all duration-200 ${
                          answers[currentQuestion.id]?.index === index
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <RadioGroupItem
                          className="mb-1"
                          id={`answer-${index}`}
                          value={index.toString()}
                        />
                        <Label
                          className="flex-1 cursor-pointer font-normal"
                          htmlFor={`answer-${index}`}
                        >
                          {answer}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button
                className="flex items-center gap-1"
                disabled={currentQuestionIndex === 0}
                variant="outline"
                onClick={() => navigateToQuestion(currentQuestionIndex - 1)}
              >
                <IconArrowLeft className="size-4" /> Câu trước
              </Button>
              {currentQuestionIndex < totalQuestions - 1 ? (
                <Button
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600"
                  disabled={currentQuestionIndex === totalQuestions - 1}
                  onClick={() => navigateToQuestion(currentQuestionIndex + 1)}
                >
                  Câu tiếp theo <IconArrowRight className="size-4" />
                </Button>
              ) : (
                <Button
                  className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                  disabled={isSubmitting || !allQuestionsAnswered}
                  onClick={handleSubmitTest}
                >
                  {isSubmitting ? "Đang nộp bài..." : "Nộp bài"}{" "}
                  <IconSend className="ml-1 size-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Right column - Question navigation */}
        <div className="md:col-span-1">
          <Card className="sticky top-4 w-full overflow-hidden">
            <div className="h-1 bg-blue-500" />
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg font-medium">
                <IconSchool className="size-5" />
                Điều hướng câu hỏi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {testData.questions.map((question, index) => (
                  <Button
                    key={index}
                    className={`size-10 p-0 ${
                      currentQuestionIndex === index
                        ? "bg-blue-500 ring-2 ring-blue-500 ring-offset-2"
                        : ""
                    }`}
                    variant={
                      currentQuestionIndex === index
                        ? "default"
                        : answers[question.id] !== undefined
                          ? "secondary"
                          : "outline"
                    }
                    onClick={() => navigateToQuestion(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              <div className="mt-6 flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-blue-500" />
                  <span>Hiện tại</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-secondary size-3 rounded-full" />
                  <span>Đã trả lời</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full border" />
                  <span>Chưa trả lời</span>
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                  <h4 className="mb-2 flex items-center gap-1 text-sm font-medium">
                    <IconInfoCircle className="size-4 text-blue-500" />
                    Thông tin bài kiểm tra
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ngày mở:</span>
                      <span>
                        {new Date(testData.availableAt).toLocaleDateString(
                          "vi-VN",
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ngày đóng:</span>
                      <span>
                        {new Date(testData.lockedAt).toLocaleDateString(
                          "vi-VN",
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Trạng thái:</span>
                      <Badge className="text-xs" variant="outline">
                        Đang làm bài
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {!allQuestionsAnswered && (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-900/20">
                  <p className="flex items-center gap-1 text-sm text-amber-700 dark:text-amber-400">
                    <IconAlertCircle className="size-4" />
                    <span>
                      Bạn cần trả lời tất cả {totalQuestions} câu hỏi trước khi
                      nộp bài.
                    </span>
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button
                className="flex w-full items-center justify-center gap-1 bg-green-600 hover:bg-green-700"
                disabled={isSubmitting || !allQuestionsAnswered}
                onClick={handleSubmitTest}
              >
                {isSubmitting ? "Đang nộp bài..." : "Nộp bài"}{" "}
                <IconSend className="ml-1 size-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default AssignmentTestModule;
