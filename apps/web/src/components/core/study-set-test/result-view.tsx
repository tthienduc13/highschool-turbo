import { motion } from "framer-motion";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@highschool/ui/components/ui/button";
import {
  IconArrowLeft,
  IconArrowUp,
  IconRotateClockwise2,
} from "@tabler/icons-react";

import { TestCardGapRaw } from "./card/card-gap";
import { ResultCard } from "./card/result-card";
import { CardWrapper } from "./card/wrapper";

import { useTestContext } from "@/stores/use-study-set-test-store";

export const ResultView = () => {
  const params = useParams();
  const router = useRouter();
  const result = useTestContext((s) => s.result!);
  const questionCount = useTestContext((s) => s.questionCount);
  const outline = useTestContext((s) => s.outline);
  const reset = useTestContext((s) => s.reset);

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        transition={{
          enter: {
            duration: 0.5,
          },
        }}
      >
        <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
          <h1 className="text-3xl font-bold">Kết quả của bạn</h1>
          <div className="flex flex-row gap-2">
            <Button size={"lg"} variant={"outline"} onClick={() => reset()}>
              <IconRotateClockwise2 size={18} />
              Làm bài mới
            </Button>
            <Button
              size={"lg"}
              variant={"outline"}
              onClick={() => router.push(`/study-set/${params.slug}`)}
            >
              <IconArrowLeft size={18} />
              Quay lại
            </Button>
          </div>
        </div>
      </motion.div>
      <motion.div
        transition={{
          enter: {
            duration: 1,
          },
        }}
      >
        <ResultCard />
      </motion.div>
      <div className="flex-col pb-20">
        {outline.map(({ type, count, startingIndex }, index) => (
          <React.Fragment key={index}>
            <motion.div
              transition={{
                enter: {
                  delay: 0.2,
                  duration: 0.4,
                },
              }}
            >
              <TestCardGapRaw
                correctness={result.byQuestion[index]!.correct}
                count={count}
                index={index}
                numQuestions={questionCount}
                startingIndex={startingIndex}
                type="question"
              />
            </motion.div>
            <motion.div
              animate={{
                transform: "translateY(0px)",
              }}
              initial={{
                transform: "translateY(20px)",
              }}
              transition={{
                enter: {
                  duration: 0.3,
                },
              }}
            >
              <CardWrapper
                correctness={result.byQuestion[index]!.correct}
                i={index}
                type={type}
              />
            </motion.div>
          </React.Fragment>
        ))}
        <div className="mt-10 flex w-full items-center justify-center">
          <Button
            className="text-blue hover:text-blue"
            size={"lg"}
            variant="ghost"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <IconArrowUp size={18} />
            Lên đầu trang
          </Button>
        </div>
      </div>
    </div>
  );
};
