import { useSubmitHollandMutation } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconLoader2,
  IconSettings,
} from "@tabler/icons-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@highschool/ui/lib/utils";
import { toast } from "sonner";
import { ScrollArea } from "@highschool/ui/components/ui/scroll-area";

import { NavigateShortcutLayer } from "../common/shortcuts-layer/navigation-shortcut-layer";
import { Container } from "../layouts/container";

import { ChoiceShortcutLayer } from "./choice-shortcut-layer";
import { HollandModal } from "./settings/setting-modal";

import { useHollandTestContext } from "@/stores/use-holland-test-store";

const MIN_ANSWERS_PER_QUESTION = 3;

const ANSWER_STATUS = {
  SUFFICIENT: "SUFFICIENT", // Đã chọn đủ số câu trả lời tối thiểu
  INSUFFICIENT: "INSUFFICIENT", // Đã chọn nhưng chưa đủ số câu
  UNANSWERED: "UNANSWERED", // Chưa chọn câu nào
};

interface TestViewProps {
  submitAnswer: ReturnType<typeof useSubmitHollandMutation>;
  showInstruction: () => void;
}

export const TestView = ({ submitAnswer, showInstruction }: TestViewProps) => {
  const router = useRouter();
  const { theme } = useTheme();

  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const progress = useHollandTestContext((s) => s.progress);
  const timeline = useHollandTestContext((s) => s.roundTimeline);
  const roundCounter = useHollandTestContext((s) => s.roundCounter);
  const setRoundCounter = useHollandTestContext((s) => s.setRoundCounter);

  const goToNextQuestion = useHollandTestContext((s) => s.goToNextQuestion);
  const goToPreviousQuestion = useHollandTestContext(
    (s) => s.goToPreviousQuestion,
  );

  const answer = useHollandTestContext((s) => s.answer);
  const userAnswers = useHollandTestContext((s) => s.userTestAnswers);

  const setResult = useHollandTestContext((s) => s.setResult);

  const active = timeline[roundCounter];
  const neutralColor = theme === "dark" ? "#7ea6ff" : "#0042da";

  // Hàm xác định trạng thái của câu hỏi
  const getQuestionStatus = (index: number) => {
    const answer = userAnswers[index];

    if (!answer || !answer.answerOption || answer.answerOption.length === 0) {
      return ANSWER_STATUS.UNANSWERED;
    }

    if (answer.answerOption.length < MIN_ANSWERS_PER_QUESTION) {
      return ANSWER_STATUS.INSUFFICIENT;
    }

    return ANSWER_STATUS.SUFFICIENT;
  };

  // Đếm số câu hỏi đã trả lời đầy đủ
  const sufficientAnswersCount = userAnswers.filter(
    (answer, index) => getQuestionStatus(index) === ANSWER_STATUS.SUFFICIENT,
  ).length;

  const validateAllQuestionsAnswered = () => {
    return userAnswers.length === timeline.length;
  };

  const validateMinimumAnswersPerQuestion = () => {
    const unansweredOrInsufficientQuestions = userAnswers.filter(
      (answer) =>
        !answer.answerOption ||
        answer.answerOption.length < MIN_ANSWERS_PER_QUESTION,
    );

    return unansweredOrInsufficientQuestions.length === 0;
  };

  const handleSubmit = () => {
    if (!validateAllQuestionsAnswered()) {
      toast.error("Chưa hoàn thành bài kiểm tra", {
        description: "Vui lòng trả lời tất cả các câu hỏi.",
      });

      return;
    }

    // Check if each question has at least 3 answers
    if (!validateMinimumAnswersPerQuestion()) {
      toast.error("Thiếu câu trả lời", {
        description: `Mỗi câu hỏi cần chọn tối thiểu ${MIN_ANSWERS_PER_QUESTION} câu trả lời.`,
      });

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

  // Hiển thị css class dựa trên trạng thái câu hỏi
  const getQuestionButtonStyle = (status: string, isCurrent: boolean) => {
    if (isCurrent) {
      return "ring-primary ring-2 ring-offset-2";
    }

    switch (status) {
      case ANSWER_STATUS.SUFFICIENT:
        return "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-800/40 border-emerald-300 dark:border-emerald-700";
      case ANSWER_STATUS.INSUFFICIENT:
        return "bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-800/40 border-amber-300 dark:border-amber-700";
      case ANSWER_STATUS.UNANSWERED:
      default:
        return "opacity-70 hover:opacity-100";
    }
  };

  // Xác định variant cho button dựa trên trạng thái
  const getQuestionButtonVariant = (status: string, isCurrent: boolean) => {
    if (isCurrent) return "default";
    if (status === ANSWER_STATUS.SUFFICIENT) return "outline";
    if (status === ANSWER_STATUS.INSUFFICIENT) return "outline";

    return "secondary";
  };

  return (
    <>
      <HollandModal
        isOpen={openSetting}
        showInstruction={showInstruction}
        onClose={() => setOpenSetting(false)}
      />
      <Container className="md:mt-10" maxWidth="7xl">
        <div className="flex flex-col gap-20">
          <div className="mx-auto w-full max-w-4xl">
            <div className="relative flex flex-row items-center justify-between">
              <Button
                className="text-blue hover:text-blue size-10 rounded-full"
                size={"icon"}
                variant={"ghost"}
                onClick={() => router.push(`/`)}
              >
                <IconArrowLeft className="!size-6" />
              </Button>
              <h1
                className={`flex-1 text-center text-lg font-semibold md:text-2xl`}
              >
                Bài định hướng Holland
              </h1>
              <Button
                className="text-blue hover:text-blue size-10 rounded-full"
                size={"icon"}
                variant={"ghost"}
                onClick={() => setOpenSetting(true)}
              >
                <IconSettings className="!size-6" />
              </Button>
            </div>
          </div>

          <div className="flex w-full flex-col-reverse items-start lg:flex-row-reverse">
            {/* Navigation Panel */}
            <div className="w-full flex-1">
              <Card className="sticky top-4">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>Câu hỏi</span>
                    <span className="text-muted-foreground text-sm font-normal">
                      {sufficientAnswersCount}/{timeline.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[40vh] pr-2">
                    <div className="mb-2 grid grid-cols-5 gap-2 p-4">
                      {timeline.map((question, index) => {
                        const status = getQuestionStatus(index);
                        const isCurrent = question.id === active.id;

                        return (
                          <Button
                            key={question.id}
                            className={`size-10 p-0 transition-all ${getQuestionButtonStyle(status, isCurrent)}`}
                            size="sm"
                            variant={getQuestionButtonVariant(
                              status,
                              isCurrent,
                            )}
                            onClick={() => {
                              setRoundCounter(index);
                            }}
                          >
                            {index + 1}
                          </Button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 pt-2">
                  <div className="mb-1 grid w-full grid-cols-3 gap-2 text-center text-xs">
                    <div className="flex flex-col items-center">
                      <div className="mb-1 size-4 rounded-full bg-emerald-500" />
                      <span>Đã chọn đủ ({MIN_ANSWERS_PER_QUESTION}+)</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="mb-1 size-4 rounded-full bg-amber-500" />
                      <span>Chưa đủ ({MIN_ANSWERS_PER_QUESTION - 1}-)</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-muted mb-1 size-4 rounded-full" />
                      <span>Chưa chọn</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Main Question Card */}
            <Container maxWidth="3xl">
              <motion.div
                key={active.id}
                animate={{ translateY: 0, opacity: 1 }}
                initial={{ translateY: -20, opacity: 0.5 }}
                style={{
                  marginBottom: 100,
                }}
              >
                <Card className="bg-background relative rounded-2xl border-2 border-gray-50 shadow-xl dark:border-gray-700">
                  <div className="absolute -right-16 -top-20 h-[120px]  w-[180px] sm:h-[140px]  sm:w-[220px] md:-right-24 md:h-[170px] md:w-[240px]">
                    <NavigateShortcutLayer
                      onNext={() => {
                        if (roundCounter < timeline.length - 1) {
                          goToNextQuestion();
                        } else {
                          handleSubmit();
                        }
                      }}
                      onPrevious={() => {
                        if (roundCounter > 0) {
                          goToPreviousQuestion();
                        }
                      }}
                    />
                    <Image
                      fill
                      alt="Laptop whale mascot"
                      className="object-bottom-left  object-contain"
                      sizes="(max-width: 640px) 170px, (max-width: 768px) 200px, 240px"
                      src="/images/mascot/mbti-whale.png"
                    />
                  </div>
                  <motion.div
                    animate={{ opacity: 0.2 }}
                    aria-hidden="true"
                    className="absolute inset-0 z-[-1] rounded-2xl shadow-lg"
                    initial={{ opacity: 0 }}
                    style={{
                      backgroundColor: neutralColor,
                      boxShadow: `0 5px 60px -5px ${neutralColor}`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <CardContent className="size-full overflow-hidden rounded-2xl p-0">
                    <div className="h-1 w-full overflow-hidden bg-gray-200">
                      <motion.div
                        animate={{
                          width: `${(progress / timeline.length) * 100}%`,
                        }}
                        className="h-full bg-orange-300"
                        initial={{ width: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex flex-col gap-6 px-8 py-6">
                      <div className="flex w-full flex-row items-center justify-between">
                        <h2 className="font-semibold text-gray-500">
                          {roundCounter + 1} / {timeline.length}
                        </h2>

                        {/* Hiển thị số câu trả lời đã chọn / tối thiểu cần chọn */}
                        <div className="text-sm text-gray-500">
                          <span
                            className={
                              userAnswers[roundCounter]?.answerOption?.length >=
                              MIN_ANSWERS_PER_QUESTION
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-amber-600 dark:text-amber-400"
                            }
                          >
                            {userAnswers[roundCounter]?.answerOption?.length ||
                              0}
                          </span>{" "}
                          / {MIN_ANSWERS_PER_QUESTION} câu đã chọn
                        </div>
                      </div>
                      <div className="min-h-[60px] md:min-h-[100px]">
                        <div className="whitespace-pre-wrap text-xl">
                          {active.question}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-1 gap-4 ">
                          <ChoiceShortcutLayer
                            choose={(i) => {
                              if (active.options.length > i) {
                                const currentAnswers =
                                  userAnswers[roundCounter]?.answerOption || [];
                                const option = active.options[i].option;

                                const updatedAnswers = currentAnswers.includes(
                                  option,
                                )
                                  ? currentAnswers.filter(
                                      (opt) => opt !== option,
                                    )
                                  : [...currentAnswers, option];

                                answer(active, updatedAnswers);
                              }
                            }}
                          />
                          {active.options.map((option, i) => (
                            <div
                              key={option.option}
                              className="flex flex-col gap-2"
                            >
                              <Button
                                key={option.option}
                                className={cn(
                                  "h-auto w-full rounded-xl px-6 py-4 justify-start disabled:cursor-not-allowed whitespace-normal  border-2 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 !text-base",
                                  {
                                    "bg-blue-200 dark:bg-blue-900 border-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800":
                                      userAnswers[
                                        roundCounter
                                      ]?.answerOption?.includes(option.option),
                                  },
                                )}
                                variant="outline"
                                onClick={() => {
                                  const currentAnswers =
                                    userAnswers[roundCounter]?.answerOption ||
                                    [];
                                  const updatedAnswers =
                                    currentAnswers.includes(option.option)
                                      ? currentAnswers.filter(
                                          (opt) => opt !== option.option,
                                        )
                                      : [...currentAnswers, option.option];

                                  answer(active, updatedAnswers);
                                }}
                              >
                                {i + 1}. {option.text}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row items-center gap-4 border-t-2 border-gray-100 pt-6 dark:border-gray-800">
                    <Button
                      className="w-full"
                      disabled={roundCounter === 0}
                      size={"lg"}
                      variant={"outline"}
                      onClick={() => goToPreviousQuestion()}
                    >
                      <p className="hidden md:block"> Câu trước </p>
                      <IconArrowLeft className="md:hidden" />
                    </Button>
                    {roundCounter === timeline.length - 1 ? (
                      <Button
                        className="w-full bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 "
                        size={"lg"}
                        variant={"default"}
                        onClick={() => handleSubmit()}
                      >
                        {submitAnswer.isPending ? (
                          <IconLoader2 className="animate-spin" />
                        ) : (
                          <>
                            <p className="hidden md:block"> Xem kết quả </p>
                            <IconCheck className="md:hidden" />
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        size={"lg"}
                        variant={"outline"}
                        onClick={() => goToNextQuestion()}
                      >
                        <p className="hidden md:block"> Câu tiếp theo </p>
                        <IconArrowRight className="md:hidden" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            </Container>
          </div>
        </div>
      </Container>
    </>
  );
};
