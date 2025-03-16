import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@highschool/ui/components/ui/card";

import { ChoiceCard } from "./choice-card";

import { useLearnContext } from "@/stores/use-study-set-learn-store";

export const InteractionCard = () => {
  const timeline = useLearnContext((s) => s.roundTimeline);
  const roundProgress = useLearnContext((s) => s.roundProgress);
  const termsThisRound = useLearnContext((s) => s.termsThisRound);
  const status = useLearnContext((s) => s.status);
  const roundCounter = useLearnContext((s) => s.roundCounter);

  const progress = Math.min(1, Math.max(0, roundProgress / termsThisRound));

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

  const active = timeline[roundCounter];

  if (!active) return;

  return (
    <motion.div
      key={active.correctAnswerId}
      animate={{ translateY: 0, opacity: 1 }}
      initial={{ translateY: -20, opacity: 0.5 }}
      style={{
        marginBottom: 100,
      }}
    >
      <Card className="relative rounded-2xl border-2 border-gray-50 bg-background shadow-xl dark:border-gray-700">
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
            <div className="flex w-full flex-row gap-3">
              <h2 className="font-semibold text-gray-500">Thuật ngữ</h2>
            </div>
            <div className="min-h-[60px] md:min-h-[140px]">
              <div className="whitespace-pre-wrap text-xl">{active.term}</div>
            </div>
            <ChoiceCard active={active} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
