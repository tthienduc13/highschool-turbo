import { motion } from "framer-motion";
import { Fragment, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@highschool/ui/components/ui/button";

import { TestCardGap } from "./card/card-gap";
import { CardWrapper } from "./card/wrapper";
import { TestSettingsModal } from "./setting-modal";

import { QuestionSkeleton } from "@/components/modules/StudySetTest/test-loading";
import { useSet } from "@/hooks/use-set";
import { TestContext, useTestContext } from "@/stores/use-study-set-test-store";
import { pushQueryParams } from "@/utils/test/params";

interface TestViewProps {
  onSubmit: () => void;
}

export const TestView = ({ onSubmit }: TestViewProps) => {
  const { flashcard } = useSet();
  const router = useRouter();
  const searchParams = useSearchParams();

  const store = useContext(TestContext)!;
  const outline = useTestContext((s) => s.outline);
  const questionCount = useTestContext((s) => s.questionCount);
  const reset = useTestContext((s) => s.reset);
  const allAnswered = useTestContext((s) =>
    s.timeline.every((q) => q.answered),
  );

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [enter, setEnter] = useState(true);

  const manualReset = () => {
    pushQueryParams(flashcard.slug, store.getState().settings, router);

    setEnter(false);
    setTimeout(() => {
      reset();
      setEnter(true);
    }, 500);
  };

  useEffect(() => {
    if (!searchParams?.get("count"))
      setTimeout(() => {
        setSettingsOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TestSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onReset={manualReset}
      />
      <div className="w-full pb-20">
        <motion.div
          transition={{
            enter: {
              delay: 0.1,
            },
          }}
        >
          <TestCardGap
            title={flashcard.flashcardName}
            type="start"
            onResetClick={manualReset}
            onSettingsClick={() => setSettingsOpen(true)}
          />
        </motion.div>
        {!enter && (
          <motion.div
            transition={{
              enter: {
                delay: 0.1,
              },
            }}
          >
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <Fragment key={i}>
                  <TestCardGap
                    skeleton
                    count={1}
                    index={i}
                    numQuestions={500}
                    startingIndex={i}
                    type="question"
                  />
                  <QuestionSkeleton />
                </Fragment>
              ))}
            </div>
          </motion.div>
        )}

        {outline.map(({ type, count, startingIndex }, index) => (
          <Fragment key={index}>
            <motion.div
              animate={
                enter
                  ? {
                      opacity: 1,
                      transform: "translateY(0px)",
                      transition: {
                        delay: 0.2 + Math.min(index, 9) * 0.05,
                      },
                    }
                  : index == 0
                    ? {
                        opacity: 0,
                        transform: "translateY(0px)",
                        transition: {
                          duration: 0.1,
                        },
                      }
                    : {}
              }
              initial={{
                opacity: 0,
                transform: "translateY(-20px)",
              }}
              style={{
                zIndex: -1,
              }}
            >
              <TestCardGap
                count={count}
                index={index}
                numQuestions={questionCount}
                startingIndex={startingIndex}
                type="question"
              />
            </motion.div>
            <motion.div
              animate={
                enter
                  ? {
                      opacity: 1,
                      transform: "translateY(0px)",
                      transition: {
                        delay: 0.2 + Math.min(index, 9) * 0.025,
                      },
                    }
                  : {}
              }
              initial={{
                opacity: 0,
                transform: "translateY(-20px)",
              }}
            >
              <CardWrapper i={index} type={type} />
            </motion.div>
          </Fragment>
        ))}
        <motion.div
          animate={
            enter
              ? {
                  opacity: 1,
                  transform: "translateY(0px)",
                  transition: {
                    delay: 0.4,
                  },
                }
              : {}
          }
          initial={{
            opacity: 0,
            transform: "translateY(-20px)",
          }}
        >
          <div className="relative w-full">
            <TestCardGap type="finish" />
            <div className="relative mt-10 flex h-24 w-full flex-col items-center justify-center gap-6">
              <p className="text-xl font-bold">Sẵn sàng để kiểm tra kết quả?</p>
              <Button
                className="w-fit"
                size="lg"
                variant={allAnswered ? "default" : "outline"}
                onClick={onSubmit}
              >
                Xem kết quả
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
