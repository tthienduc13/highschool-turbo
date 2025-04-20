import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@highschool/ui/components/ui/button";

import { AnyKeyPressLayer } from "../common/any-key-press-layer";

import { useCramContext } from "@/stores/use-study-set-cram-store";

export const ActionBar = () => {
  const status = useCramContext((s) => s.status);
  const roundSummary = useCramContext((s) => s.roundSummary);
  const acknowledgeIncorrect = useCramContext((s) => s.acknowledgeIncorrect);
  const nextRound = useCramContext((s) => s.nextRound);

  const handleAcknowledgeIncorrect = () => {
    acknowledgeIncorrect();
  };

  const visible = status == "incorrect" || !!roundSummary;

  const handleAction = () => {
    status == "incorrect" ? handleAcknowledgeIncorrect() : nextRound();
  };

  return (
    <>
      {visible && <AnyKeyPressLayer onSubmit={handleAction} />}
      <AnimatePresence>
        {visible && (
          <motion.div
            animate={{ translateY: 0 }}
            exit={{ translateY: 80 }}
            initial={{ translateY: 80 }}
            style={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              left: 0,
              zIndex: 100,
            }}
          >
            <div className="dark:border-t-800 bg-background w-full border-t-2 border-t-gray-100">
              <div className="mx-auto flex max-w-4xl flex-row justify-between p-4 md:px-0">
                <p className="hidden font-medium text-gray-500 md:flex">
                  Bấm nút bất kì để tiếp tục
                </p>
                <Button className="w-full md:w-auto" onClick={handleAction}>
                  Tiếp tục
                  {roundSummary && ` đến vòng ${roundSummary.round + 2}`}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
