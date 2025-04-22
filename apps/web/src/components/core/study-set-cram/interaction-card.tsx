import { motion } from "framer-motion";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { StudySetAnswerMode } from "@highschool/interfaces";
import { cn } from "@highschool/ui/lib/utils";
import { Display } from "@highschool/lib/display";

import { SquareAssetPreview } from "../study-set/square-asset-preview";

import { ChoiceCard } from "./choice-card";
import { WriteCard } from "./write-card";

import { useCramContext } from "@/stores/use-study-set-cram-store";
import { richWord } from "@/utils/terms";

export const InteractionCard = () => {
  const { theme } = useTheme();

  const [isVisible, setIsVisible] = useState(false);

  const timeline = useCramContext((s) => s.roundTimeline);
  const termsThisRound = useCramContext((s) => s.termsThisRound);
  const roundCounter = useCramContext((s) => s.roundCounter);
  const roundProgress = useCramContext((s) => s.roundProgress);
  const prevTermWasIncorrect = useCramContext((s) => s.prevTermWasIncorrect);
  const status = useCramContext((s) => s.status);

  const correctColor = theme === "dark" ? "#68d391" : "#38a169";
  const incorrectColor = theme === "dark" ? "#fc8181" : "#e53e3e";
  const neutralColor = theme === "dark" ? "#7ea6ff" : "#0042da";

  const active = timeline[roundCounter];

  useEffect(() => {
    if (status !== undefined) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [status]);

  if (!active) return null;

  return (
    <motion.div
      key={active.term.id}
      animate={{ translateY: 0, opacity: 1 }}
      initial={{ translateY: -20, opacity: 0.5 }}
      style={{
        marginBottom: 100,
      }}
    >
      <Card className="relative  rounded-2xl border-2 border-gray-100  bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800/50">
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
              animate={{
                width: `calc(100% * ${roundProgress} / ${termsThisRound})`,
              }}
              className="h-full bg-orange-300"
              initial={{
                width: `calc(100% * ${Math.max(
                  roundProgress - (prevTermWasIncorrect ? 0 : 1),
                  0,
                )} / ${termsThisRound})`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="flex flex-col gap-6 px-8 py-6">
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-gray-500">
                {active.answerMode ==
                StudySetAnswerMode.FlashcardContentDefinition
                  ? "Thuật ngữ"
                  : "Định nghĩa"}
              </div>
              <div
                className={cn(
                  "rounded-full border-2 border-gray-100 bg-transparent px-3 py-1 dark:border-gray-600",
                  active.term.correctness < 0 ? "visible" : "hidden",
                )}
              >
                <p className="text-xs font-semibold">Hãy thử lại</p>
              </div>
            </div>
            <div className="min-h-[60px] md:min-h-[140px]">
              <div className="row flex items-center justify-between gap-4">
                <p className="whitespace-pre-wrap text-xl font-semibold md:text-2xl">
                  <Display
                    {...richWord(active.answerMode, active.term, "prompt")}
                  />
                </p>
                {active.answerMode == StudySetAnswerMode.FlashcardContentTerm &&
                  active.term.image && (
                    <SquareAssetPreview
                      rounded={8}
                      size={100}
                      src={active.term.image}
                    />
                  )}
              </div>
            </div>
            {active.type == "choice" ? (
              <ChoiceCard active={active} />
            ) : (
              <WriteCard active={active} />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
