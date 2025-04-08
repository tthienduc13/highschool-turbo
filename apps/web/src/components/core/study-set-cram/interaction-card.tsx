import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import {
  DefaultData,
  MultipleChoiceData,
  StudySetAnswerMode,
  TestQuestion,
} from "@highschool/interfaces";
import { Display } from "@highschool/lib/display";

import { SquareAssetPreview } from "../study-set/square-asset-preview";

import { ChoiceCard } from "./choice-card";

import { useCramContext } from "@/stores/use-study-set-cram-store";
import { richWord } from "@/utils/terms";

export const useCardSelector = <D extends DefaultData>(i: number) => {
  const timeline = useCramContext((s) => s.timeline);

  if (!timeline || !timeline[i]) {
    return {
      question: undefined,
      answered: undefined,
      data: undefined,
      answer: undefined,
    };
  }

  const question = timeline[i];
  const answered = timeline[i].answered;
  const data = timeline[i].data as D;
  const answer = timeline[i].data.answer as D["answer"];

  return { question, answered, data, answer };
};

export const InteractionCard = () => {
  const timeLine = useCramContext((s) => s.timeline);
  const roundCounter = useCramContext((s) => s.roundCounter);

  const progress = Math.min(1, Math.max(0, roundCounter / timeLine.length));

  console.log(progress);

  const { theme } = useTheme();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (status !== undefined) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [status]);

  const correctColor = theme === "dark" ? "#68d391" : "#38a169";
  const incorrectColor = theme === "dark" ? "#fc8181" : "#e53e3e";
  const neutralColor = theme === "dark" ? "#7ea6ff" : "#0042da";

  const { question, answered, data } =
    useCardSelector<MultipleChoiceData>(roundCounter);

  const active = useCardSelector<MultipleChoiceData>(roundCounter);

  if (!timeLine || !question || !active) return;

  console.log(active);

  return (
    <motion.div
      key={data?.term.id}
      animate={{ translateY: 0, opacity: 1 }}
      initial={{ translateY: -20, opacity: 0.5 }}
      style={{
        marginBottom: 100,
      }}
    >
      <Card className="bg-background relative rounded-2xl border-2 border-gray-50 shadow-xl dark:border-gray-700">
        {status !== undefined && (
          <motion.div
            animate={{ opacity: isVisible ? 0.2 : 0 }}
            aria-hidden="true"
            className="absolute inset-0 z-[-1] rounded-2xl shadow-lg"
            initial={{ opacity: 0 }}
            style={{
              backgroundColor:
                status === "correct"
                  ? correctColor
                  : status === "incorrect"
                    ? incorrectColor
                    : neutralColor,
              boxShadow: `0 5px 60px -5px ${status === "correct" ? correctColor : status === "incorrect" ? incorrectColor : neutralColor}`,
            }}
            transition={{ duration: 0.3 }}
          />
        )}
        <CardContent className="size-full overflow-hidden rounded-2xl p-0">
          <div className="h-1 w-full overflow-hidden bg-gray-200">
            <motion.div
              animate={{ width: `${progress * 100}%` }}
              className="h-full bg-orange-300"
              initial={{ width: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex flex-col gap-6 px-8 py-6">
            <div className="flex flex-row items-center gap-3">
              <p className="text-sm font-semibold text-gray-500">Thuật ngữ</p>
            </div>
            <div className="min-h-16 md:min-h-[140px]">
              <div className="flex items-center justify-between gap-4">
                <p className="whitespace-pre-wrap text-2xl">
                  <Display
                    {...richWord(
                      StudySetAnswerMode.FlashcardContentDefinition,
                      active?.data?.term!,
                      "prompt",
                    )}
                  />
                </p>
                {active.data?.term.image && (
                  <SquareAssetPreview
                    rounded={8}
                    size={100}
                    src={active.data?.term.image}
                  />
                )}
              </div>
            </div>
            {question && (
              <ChoiceCard
                active={question as TestQuestion<MultipleChoiceData>}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
