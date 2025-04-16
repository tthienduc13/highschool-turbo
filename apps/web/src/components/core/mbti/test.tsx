import { useState } from "react";
import { useSubmitMBTITestMutation } from "@highschool/react-query/queries";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import { useTheme } from "next-themes";
import { Button } from "@highschool/ui/components/ui/button";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconLoader2,
  IconSettings,
} from "@tabler/icons-react";
import { cn } from "@highschool/ui/lib/utils";
import { ScrollArea } from "@highschool/ui/components/ui/scroll-area";

import { NavigateShortcutLayer } from "../common/shortcuts-layer/navigation-shortcut-layer";

import { ChoiceShortcutLayer } from "./choice-shortcut-layer";
import { MBTISettingModal } from "./settings/setting-modal";

import { useMBTITestContext } from "@/stores/use-mbti-test-store";
import { Container } from "@/components/core/layouts/container";

interface TestViewProps {
  submitAnswer: ReturnType<typeof useSubmitMBTITestMutation>;
  showInstruction: () => void;
}

export const TestView = ({ submitAnswer, showInstruction }: TestViewProps) => {
  const router = useRouter();
  const { theme } = useTheme();
  const [openSetting, setOpenSetting] = useState(false);

  const {
    progress,
    roundTimeline: timeline,
    roundCounter,
    goToNextQuestion,
    goToPreviousQuestion,
    answer,
    userTestAnswers,
    setResult,
    setRoundCounter,
  } = useMBTITestContext((state) => state);

  const active = timeline[roundCounter];
  const neutralColor = theme === "dark" ? "#7ea6ff" : "#0042da";

  const isUserAnswerAll =
    userTestAnswers.length === timeline.length &&
    userTestAnswers.every((answer) => answer !== null && answer !== undefined);

  const handleSubmit = async () => {
    if (!isUserAnswerAll) {
      alert("Vui lòng trả lời toàn bộ câu hỏi");

      return;
    }

    submitAnswer.mutate(userTestAnswers, {
      onSuccess: (data) => {
        setResult(data.mbtiTypeContent, data.mbtiTypeResult);
      },
      onError: () => {
        alert("Đã xảy ra lỗi khi gửi câu trả lời. Vui lòng thử lại.");
      },
    });
  };

  const handleNext = () => {
    if (roundCounter === timeline.length - 1) {
      handleSubmit();
    } else {
      goToNextQuestion();
    }
  };

  const handlePrevious = () => {
    if (roundCounter > 0) {
      goToPreviousQuestion();
    }
  };

  const renderHeader = () => (
    <div className="relative flex flex-row items-center justify-between">
      <Button
        className="text-blue hover:text-blue size-10 rounded-full"
        size="icon"
        variant="ghost"
        onClick={() => router.push("/")}
      >
        <IconArrowLeft className="!size-6" />
      </Button>
      <h1 className="flex-1 text-center text-lg font-semibold md:text-2xl">
        Bài kiểm tra tính cách MBTI
      </h1>
      <Button
        className="text-blue hover:text-blue size-10 rounded-full"
        size="icon"
        variant="ghost"
        onClick={() => setOpenSetting(true)}
      >
        <IconSettings className="!size-6" />
      </Button>
    </div>
  );

  const renderOptions = () => (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-6">
        <ChoiceShortcutLayer
          choose={(i) => {
            if (active?.options.length > i) {
              answer(active, active.options[i].option);
            }
          }}
        />
        {active?.options.map((option, i) => (
          <div key={option.option} className="flex flex-col gap-2">
            <p className="ml-2 font-semibold text-gray-500">{i + 1}</p>
            <Button
              className={cn(
                "h-auto w-full rounded-xl px-6 py-4 justify-start disabled:cursor-not-allowed whitespace-normal border-2 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 !text-base",
                active &&
                  userTestAnswers[roundCounter]?.answerOption ===
                    option.option &&
                  "bg-blue-200 dark:bg-blue-900 border-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800",
              )}
              variant="outline"
              onClick={() => answer(active, option.option)}
            >
              {option.text}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFooter = () => (
    <CardFooter className="flex flex-row items-center gap-4 border-t-2 border-gray-100 pt-6 dark:border-gray-800">
      <Button
        className="w-full"
        disabled={roundCounter === 0}
        size="lg"
        variant="outline"
        onClick={handlePrevious}
      >
        <p className="hidden md:block">Câu trước</p>
        <IconArrowLeft className="md:hidden" />
      </Button>

      {roundCounter === timeline.length - 1 ? (
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500"
          disabled={!isUserAnswerAll}
          size="lg"
          variant="default"
          onClick={handleSubmit}
        >
          {submitAnswer.isPending ? (
            <IconLoader2 className="animate-spin" />
          ) : (
            <>
              <p className="hidden md:block">Xem kết quả</p>
              <IconCheck className="md:hidden" />
            </>
          )}
        </Button>
      ) : (
        <Button
          className="w-full"
          size="lg"
          variant="outline"
          onClick={handleNext}
        >
          <p className="hidden md:block">Câu tiếp theo</p>
          <IconArrowRight className="md:hidden" />
        </Button>
      )}
    </CardFooter>
  );

  if (!active) {
    return null;
  }

  return (
    <>
      <MBTISettingModal
        isOpen={openSetting}
        showInstruction={showInstruction}
        onClose={() => setOpenSetting(false)}
      />

      <Container className="md:mt-10" maxWidth="7xl">
        <div className="flex flex-col gap-20">
          <div className="mx-auto w-full max-w-4xl">{renderHeader()}</div>

          <div className="flex w-full flex-col-reverse items-start lg:flex-row-reverse">
            <div className="w-full flex-1">
              <Card className="sticky top-4">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>Câu hỏi</span>
                    <span className="text-muted-foreground text-sm font-normal">
                      {userTestAnswers.length}/{timeline.length}
                    </span>
                  </CardTitle>
                  {/* <Progress
                    className="h-2"
                    value={
                      (answers.filter((a) => a !== "").length /
                        mbtiQuestions.length) *
                      100
                    }
                  /> */}
                </CardHeader>
                <CardContent className="">
                  <ScrollArea className="h-[40vh] pr-2">
                    <div className="mb-2 grid grid-cols-5 gap-2 p-4">
                      {timeline.map((question, index) => {
                        const isAnswered =
                          userTestAnswers[index]?.answerOption !== "";
                        const isCurrent = question.id === active.id;

                        return (
                          <Button
                            key={question.id}
                            className={`size-10 p-0 transition-all ${
                              isCurrent
                                ? "ring-primary ring-2 ring-offset-2"
                                : isAnswered
                                  ? "bg-primary/10 hover:bg-primary/20"
                                  : "opacity-70 hover:opacity-100"
                            }`}
                            size="sm"
                            variant={
                              isCurrent
                                ? "default"
                                : isAnswered
                                  ? "outline"
                                  : "secondary"
                            }
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
                      <div className="bg-primary mb-1 size-4 rounded-full" />
                      <span>Current</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="border-primary bg-primary/10 mb-1 size-4 rounded-full border" />
                      <span>Answered</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-muted mb-1 size-4 rounded-full" />
                      <span>Unanswered</span>
                    </div>
                  </div>

                  {/* {answers.filter((a) => a !== "").length ===
                    mbtiQuestions.length && (
                    <Button className="mt-2 w-full" onClick={handleSubmit}>
                      Submit Test
                    </Button>
                  )} */}
                </CardFooter>
              </Card>
            </div>
            <Container maxWidth="3xl">
              <motion.div
                key={active.id}
                animate={{ translateY: 0, opacity: 1 }}
                initial={{ translateY: -20, opacity: 0.5 }}
                style={{ marginBottom: 100 }}
              >
                <Card className="bg-background relative rounded-2xl border-2 border-gray-50 shadow-xl dark:border-gray-700">
                  {/* Mascot image */}
                  <div className="absolute -right-16 -top-20 h-[120px] w-[180px] sm:h-[140px] sm:w-[220px] md:-right-24 md:h-[170px] md:w-[240px]">
                    <NavigateShortcutLayer
                      onNext={handleNext}
                      onPrevious={handlePrevious}
                    />
                    <Image
                      fill
                      alt="Laptop whale mascot"
                      className="object-bottom-left object-contain"
                      sizes="(max-width: 640px) 170px, (max-width: 768px) 200px, 240px"
                      src="/images/mascot/mbti-whale.png"
                    />
                  </div>

                  {/* Background glow effect */}
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
                    {/* Progress bar */}
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
                      {/* Question counter */}
                      <div className="flex w-full flex-row gap-3">
                        <h2 className="font-semibold text-gray-500">
                          {roundCounter + 1} / {timeline.length}
                        </h2>
                      </div>

                      {/* Question text */}
                      <div className="min-h-[60px] md:min-h-[100px]">
                        <div className="whitespace-pre-wrap text-xl">
                          {active.question}
                        </div>
                      </div>

                      {/* Answer options */}
                      {renderOptions()}
                    </div>
                  </CardContent>

                  {renderFooter()}
                </Card>
              </motion.div>
            </Container>
          </div>
        </div>
      </Container>
    </>
  );
};
