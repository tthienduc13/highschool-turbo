"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@highschool/ui/components/ui/button";
import { IconCheck, IconThumbUp } from "@tabler/icons-react";
import { useFSRSProgressMutation } from "@highschool/react-query/queries";

import { AnyKeyPressLayer } from "../common/any-key-press-layer";
import { ChoiceShortcutLayer } from "../common/choice-shortcut-layer";

import { useWritingContext } from "@/stores/use-study-set-writing-store";

export const ActionBar = () => {
  const status = useWritingContext((s) => s.status);
  const onKnow = useWritingContext((s) => s.onKnow);
  const cardResult = useWritingContext((s) => s.cardResult);
  const counter = useWritingContext((s) => s.cardCounter);
  const dueCards = useWritingContext((s) => s.dueCards);
  const goToNextQuestion = useWritingContext((s) => s.goToNextQuestion);

  const apiUpdateProgress = useFSRSProgressMutation();

  const active = dueCards[counter];

  const handleMarkUnknown = () => {
    apiUpdateProgress.mutate({
      flashcardContentId: active.contentId,
      rating: 1,
      timeSpent: 0,
    });
    goToNextQuestion();
  };

  const choose = (rating: number) => {
    apiUpdateProgress.mutate({
      flashcardContentId: active.contentId,
      rating,
      timeSpent: 0,
    });
    onKnow(rating);
    goToNextQuestion();
  };

  const visible = status !== undefined;

  const renderRatingButton = (
    rating: number,
    label: string,
    colorClasses: string,
  ) => (
    <button
      className={`relative w-[120px]  cursor-pointer rounded-xl border hover:opacity-80 ${colorClasses} py-2 text-sm`}
      onClick={() => choose(rating)}
    >
      {rating}. {label}
      {cardResult.rating === rating && (
        <div className="absolute -right-2 -top-2 z-10 flex size-6 items-center justify-center rounded-full border bg-white">
          <IconThumbUp size={16} />
        </div>
      )}
    </button>
  );

  return (
    <>
      {status === "unknown" ? (
        <AnyKeyPressLayer onSubmit={handleMarkUnknown} />
      ) : status === "known" ? (
        <ChoiceShortcutLayer
          choose={(i) => {
            if (i < 5) choose(i + 1);
          }}
        />
      ) : (
        ""
      )}
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
            {status === "unknown" ? (
              <div className="dark:border-t-800 bg-background w-full border-t-2 border-t-gray-100">
                <div className="mx-auto flex w-full max-w-4xl px-4 py-2">
                  <Button className="w-full" onClick={handleMarkUnknown}>
                    <IconCheck />
                    Tôi đã biết cho lần này
                  </Button>
                </div>
              </div>
            ) : (
              <div className="dark:border-t-800 bg-background w-full border-t-2 border-t-gray-100">
                <div className="mx-auto flex max-w-4xl flex-row justify-center p-4 md:px-0">
                  <div className="flex flex-row items-center gap-2">
                    {renderRatingButton(
                      1,
                      "Làm lại",
                      "border-destructive bg-destructive/10 text-destructive",
                    )}
                    {cardResult.rating !== 1 && (
                      <>
                        {renderRatingButton(
                          2,
                          "Khó",
                          "border-yellow-500 bg-yellow-700/10 text-yellow-700",
                        )}
                        {renderRatingButton(
                          3,
                          "Bình thường",
                          "border-green-500 bg-green-700/10 text-green-700",
                        )}
                        {renderRatingButton(
                          4,
                          "Dễ",
                          "border-indigo-500 bg-indigo-700/10 text-indigo-700",
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
