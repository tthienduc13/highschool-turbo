import { useSet } from "@/hooks/use-set";
import { pushQueryParams } from "@/utils/test/params";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TestContext, useTestContext } from "@/stores/use-study-set-test-store";
import { TestCardGap } from "./card/card-gap";
import { QuestionSkeleton } from "@/components/modules/StudySetTest/test-loading";
import { CardWrapper } from "./card/wrapper";
import { Button } from "@highschool/ui/components/ui/button";
import { TestSettingsModal } from "./setting-modal";

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
        s.timeline.every((q) => q.answered)
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
                        type="start"
                        title={flashcard.flashcardName}
                        onSettingsClick={() => setSettingsOpen(true)}
                        onResetClick={manualReset}
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
                                        type="question"
                                        index={i}
                                        startingIndex={i}
                                        numQuestions={500}
                                        count={1}
                                        skeleton
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
                            initial={{
                                opacity: 0,
                                transform: "translateY(-20px)",
                            }}
                            animate={
                                enter
                                    ? {
                                          opacity: 1,
                                          transform: "translateY(0px)",
                                          transition: {
                                              delay:
                                                  0.2 +
                                                  Math.min(index, 9) * 0.05,
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
                            style={{
                                zIndex: -1,
                            }}
                        >
                            <TestCardGap
                                type="question"
                                index={index}
                                startingIndex={startingIndex}
                                numQuestions={questionCount}
                                count={count}
                            />
                        </motion.div>
                        <motion.div
                            initial={{
                                opacity: 0,
                                transform: "translateY(-20px)",
                            }}
                            animate={
                                enter
                                    ? {
                                          opacity: 1,
                                          transform: "translateY(0px)",
                                          transition: {
                                              delay:
                                                  0.2 +
                                                  Math.min(index, 9) * 0.025,
                                          },
                                      }
                                    : {}
                            }
                        >
                            <CardWrapper type={type} i={index} />
                        </motion.div>
                    </Fragment>
                ))}
                <motion.div
                    initial={{
                        opacity: 0,
                        transform: "translateY(-20px)",
                    }}
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
                >
                    <div className="relative w-full">
                        <TestCardGap type="finish" />
                        <div className="relative mt-10 flex h-24 w-full flex-col items-center justify-center gap-6">
                            <p className="text-xl font-bold">
                                Sẵn sàng để kiểm tra kết quả?
                            </p>
                            <Button
                                size="lg"
                                onClick={onSubmit}
                                className="w-fit"
                                variant={allAnswered ? "default" : "outline"}
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
