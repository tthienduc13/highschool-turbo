import { motion } from "framer-motion";
import React, { useState } from "react";
import { getRandom } from "@highschool/lib/array";

import { GenericLabel } from "../../study-set-learn/generic-label";

import { AnswerCard } from "./answer-card";

import { useCramContext } from "@/stores/use-study-set-cram-store";
import { cleanSpaces } from "@/utils/evaluator";

export const CorrectState: React.FC<{ guess: string }> = ({ guess }) => {
  const feedbackBank = useCramContext((s) => s.feedbackBank);

  const [remark] = useState(getRandom(feedbackBank.correct));

  return (
    <motion.div
      animate={{
        translateY: 0,
        opacity: 1,
      }}
      initial={{
        translateY: -16,
        opacity: 0.5,
      }}
    >
      <div className="flex flex-col gap-2 pb-4">
        <GenericLabel evaluation>{remark}</GenericLabel>
        <AnswerCard correct text={cleanSpaces(guess)} />
      </div>
    </motion.div>
  );
};
