import { IconKeyframes } from "@tabler/icons-react";
import { motion } from "framer-motion";

import { DisplayableTermPure } from "../study-set/displayable-term";

import { TermMastery } from "./term-mastery";

import { useCramContext } from "@/stores/use-study-set-cram-store";

export const RoundSummary = () => {
  const roundSummary = useCramContext((s) => s.roundSummary)!;
  const progressPercent = roundSummary.progress / roundSummary.totalTerms;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-2">
          <h1 className="text-xl font-bold">
            {roundSummary.progress} / {roundSummary.totalTerms}
          </h1>
          <h2 className="text-lg font-bold">thuật ngữ</h2>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800/10">
          <motion.div
            animate={{ width: `${progressPercent * 100}%` }}
            initial={{ width: 0 }}
            style={{
              height: "100%",
            }}
            transition={{
              duration: 1,
              stiffness: 0,
              delay: 0.5,
              mass: 100,
            }}
          >
            <div className="size-full bg-blue-500" />
          </motion.div>
        </div>
      </div>
      <TermMastery />
      <div className="flex flex-col gap-6 pb-32">
        <div className="flex flex-row items-center gap-2">
          <IconKeyframes size={18} />
          <p className="text-lg font-bold">Thuật ngữ đã học vòng này</p>
        </div>
        <div className="flex flex-col gap-3.5">
          {roundSummary?.termsThisRound.map((term) => (
            <DisplayableTermPure key={term.id} flashcardContent={term} />
          ))}
        </div>
      </div>
    </div>
  );
};
