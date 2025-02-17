import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@highschool/ui/components/ui/button";

import { AnyKeyPressLayer } from "./any-key-press-layer";

import { useSet } from "@/hooks/use-set";
import { useLearnContext } from "@/stores/use-study-set-learn-store";

export const ActionBar = () => {
  const { flashcard } = useSet();
  const status = useLearnContext((s) => s.status);
  const roundSummary = useLearnContext((s) => s.roundSummary);
  const nextRound = useLearnContext((s) => s.nextRound);
  const queryClient = useQueryClient();
  const acknowledgeIncorrect = useLearnContext((s) => s.acknowledgeIncorrect);

  const handleAction = () => {
    if (status === "incorrect") {
      acknowledgeIncorrect();
    } else {
      queryClient.invalidateQueries({
        queryKey: ["flashcard-learn", flashcard.id],
      });
      nextRound(false);
    }
  };

  const visible = status == "incorrect" || !!roundSummary;

  return (
    <>
      {visible && <AnyKeyPressLayer onSubmit={handleAction} />}
      <AnimatePresence>
        {visible && (
          <motion.div
            animate={{ translateY: 0 }}
            exit={{ translateY: 80 }}
            initial={{ translateY: 80 }}
            style={{ position: "fixed", bottom: 0, width: "100%", left: 0 }}
          >
            <div className="dark:border-t-800 bg-background w-full border-t-2 border-t-gray-100">
              <div className="mx-auto flex max-w-4xl flex-row justify-between px-4 py-4 md:px-0">
                <p className="hidden font-medium text-gray-500 md:flex">
                  Bấm nút bất kì để tiếp tục
                </p>
                <Button className="w-full md:w-auto" onClick={handleAction}>
                  Vòng tiếp theo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
