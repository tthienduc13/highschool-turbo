import { diffChars } from "diff";
import { useEffect, useRef, useState } from "react";
import { getRandom } from "@highschool/lib/array";
import { motion, useAnimationControls } from "framer-motion";
import levenshtein from "js-levenshtein";
import { Button } from "@highschool/ui/components/ui/button";
import { IconProgressCheck } from "@tabler/icons-react";
import { ScriptFormatter } from "@highschool/lib/script-formatter";

import { word } from "../../../../utils/terms";
import { GenericLabel } from "../../common/generic-label";

import { AnswerCard } from "./answer-card";

import { Question, useCramContext } from "@/stores/use-study-set-cram-store";

export interface IncorrectStateProps {
  active: Question;
  guess?: string;
}

export const IncorrectState: React.FC<IncorrectStateProps> = ({
  active,
  guess,
}) => {
  const overrideCorrect = useCramContext((s) => s.overrideCorrect);

  const feedbackBank = useCramContext((s) => s.feedbackBank);
  const [remark] = useState(getRandom(feedbackBank.incorrect));

  const controls = useAnimationControls();

  const fullStackRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const [checkVisible, setCheckVisible] = useState(false);

  const handleOverrideCorrect = () => {
    overrideCorrect();
  };

  useEffect(() => {
    setTimeout(() => {
      void (async () => {
        controls.set({
          height: `${stackRef.current!.offsetHeight}px`,
        });
        await controls.start({
          height: `${fullStackRef.current!.offsetHeight}px`,
          transition: {
            duration: 0.5,
            delay: 0.5,
          },
        });
      })();
    });

    setTimeout(() => setCheckVisible(true), 1000);
  }, [controls]);

  const diff = guess
    ? diffChars(guess, word(active.answerMode, active.term, "answer"))
    : [];
  const showDiff = guess
    ? levenshtein(guess, word(active.answerMode, active.term, "answer")) <= 3
    : false;

  return (
    <motion.div
      animate={controls}
      style={{
        overflow: "hidden",
      }}
    >
      <div ref={fullStackRef} className="mt-0 flex flex-col gap-6 pb-2">
        <div ref={stackRef} className="mt-0 flex flex-col gap-2">
          <div className="flex w-full flex-col items-start justify-between gap-0 md:flex-row md:items-center md:gap-4">
            <GenericLabel evaluation={guess ? false : undefined}>
              {guess ? remark : "Bạn đã bỏ qua câu này"}
            </GenericLabel>
            {guess && (
              <Button
                className="shrink-0 px-0 text-xs md:px-2"
                size="sm"
                variant="ghost"
                onClick={handleOverrideCorrect}
              >
                <IconProgressCheck
                  size={16}
                  style={{
                    marginRight: -4,
                  }}
                />
                Tôi đã trả lời đúng
              </Button>
            )}
          </div>
          <AnswerCard
            correct={false}
            skipped={!guess}
            text={guess || "Bỏ qua"}
          />
        </div>
        <motion.div
          animate={{ opacity: 1, transition: { delay: 1 } }}
          initial={{ opacity: 0 }}
        >
          <div className="flex flex-col gap-2">
            <GenericLabel>Câu trả lời đúng</GenericLabel>
            <AnswerCard
              correct
              showIcon={checkVisible}
              text={
                <>
                  {showDiff ? (
                    diff.map((x, i) =>
                      x.added && x.value.length <= 3 ? (
                        <b key={i}>
                          <ScriptFormatter>{x.value}</ScriptFormatter>
                        </b>
                      ) : x.removed ? (
                        ""
                      ) : (
                        <ScriptFormatter>{x.value}</ScriptFormatter>
                      ),
                    )
                  ) : (
                    <ScriptFormatter>
                      {word(active.answerMode, active.term, "answer")}
                    </ScriptFormatter>
                  )}
                </>
              }
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
