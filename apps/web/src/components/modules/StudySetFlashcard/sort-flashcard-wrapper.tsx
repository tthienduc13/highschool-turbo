"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import throttle from "lodash.throttle";
import { useCallback, useEffect, useState } from "react";
import { DueCard } from "@highschool/interfaces";
import { useFSRSProgressMutation } from "@highschool/react-query/queries";

import { Flashcard } from "./flashcard";
import { SortableShortcutLayer } from "./sortable-shorcut-layer";
import { SortFlashcardProgress } from "./sort-flashcard-progress";

import { useStudySetFSRSContext } from "@/stores/use-study-set-fsrs-store";

interface SortFlashcardWrapperProps {
  h: string;
}

export const SortFlashcardWrapper = ({ h }: SortFlashcardWrapperProps) => {
  const controls = useAnimationControls();

  const cardCounter = useStudySetFSRSContext((s) => s.cardCounter);
  const dueCards = useStudySetFSRSContext((s) => s.dueCards);
  const isReviewToday = useStudySetFSRSContext((s) => s.isReviewToday);

  const completed = useStudySetFSRSContext((s) => s.completed);

  const markStillLearning = useStudySetFSRSContext((s) => s.markStillLearning);
  const markKnown = useStudySetFSRSContext((s) => s.markKnown);
  const getTimeSpent = useStudySetFSRSContext((s) => s.getTimeSpent);

  const startCardTimer = useStudySetFSRSContext((s) => s.startCardTimer);

  const apiMarkFlashcard = useFSRSProgressMutation();

  type FlashcardWithUI = DueCard & { isFlipped: boolean; cardCounter: number };

  const [visibleFlashcards, setVisibleFlashcards] = useState<FlashcardWithUI[]>(
    !completed && dueCards[cardCounter]
      ? [{ ...dueCards[cardCounter], isFlipped: false, cardCounter }]
      : [],
  );

  const [hasUserEngaged, setHasUserEngaged] = useState(false);
  const [state, setState] = useState<"stillLearning" | "known">();

  const allowAnimation = useCallback(() => {
    setHasUserEngaged(true);
    requestAnimationFrame(() => {
      setHasUserEngaged(false);
    });
  }, []);

  const flipCard = async (id: string) => {
    if (!visibleFlashcards.find((f) => f.contentId == id)) return;

    await controls.start({
      rotateX: 90,
      transition: {
        duration: 0.15,
      },
    });

    controls.set({
      rotateX: -90,
    });
    visibleFlashcards[0]!.isFlipped = !visibleFlashcards[0]!.isFlipped;
    setVisibleFlashcards(Array.from(visibleFlashcards));

    await controls.start({
      rotateX: 0,
      transition: {
        duration: 0.15,
      },
    });
  };

  const markCard = (term: DueCard, know: boolean) => {
    allowAnimation();
    setState(know ? "known" : "stillLearning");
    controls.set({ zIndex: 105 });

    const timeSpent = getTimeSpent(term.contentId);

    if (know) markKnown(term.contentId, timeSpent);
    else markStillLearning(term.contentId, timeSpent);

    apiMarkFlashcard.mutate({
      flashcardContentId: term.contentId,
      rating: know ? 3 : 1,
      timeSpent: timeSpent,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const markCardCallback = useCallback(
    throttle(markCard, 200, { trailing: false }),
    [cardCounter, dueCards.length],
  );

  useEffect(() => {
    if (!completed && dueCards[cardCounter]) {
      // Start timer for the current card
      startCardTimer(dueCards[cardCounter].contentId);

      setVisibleFlashcards([
        { ...dueCards[cardCounter], isFlipped: false, cardCounter },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardCounter, dueCards]);

  useEffect(() => {
    if (completed) {
      setHasUserEngaged(false);
      setVisibleFlashcards([]);
    }
  }, [completed]);

  if (isReviewToday) {
    return <SortFlashcardProgress h={h} state="known" />;
  }

  return (
    <div
      className="relative w-full"
      style={{
        height: h,
      }}
    >
      {completed ? (
        <SortFlashcardProgress h={h} state="stillLearning" />
      ) : (
        <>
          {" "}
          <SortableShortcutLayer
            triggerFlip={async () => {
              if (visibleFlashcards.length)
                await flipCard(visibleFlashcards[0]!.contentId);
            }}
            triggerKnow={() =>
              dueCards[cardCounter] &&
              markCardCallback(dueCards[cardCounter], true)
            }
            triggerStillLearning={() =>
              dueCards[cardCounter] &&
              markCardCallback(dueCards[cardCounter], false)
            }
          />{" "}
          <AnimatePresence>
            {visibleFlashcards.map((t, i) => (
              <motion.div
                key={`flashcard-${t.contentId}-${i}`}
                animate={controls}
                exit={
                  hasUserEngaged
                    ? {
                        pointerEvents: "none",
                        outlineColor:
                          state == "known"
                            ? [null, "rgba(104, 211, 145, 1)"]
                            : [null, "rgba(252, 129, 129, 1)"],
                        opacity: [1, 1, 0],
                        scale: [1, 1.05, 0.8],
                        rotateZ: [0, state == "known" ? -5 : 5, 0],
                        translateX:
                          state == "known" ? [0, -50, 200] : [0, 50, -200],
                        transition: {
                          ease: "easeIn",
                          times: [0, 0.3, 1],
                        },
                      }
                    : undefined
                }
                id="sortable-flashcard"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transformPerspective: 1500,
                  zIndex: 100,
                  borderRadius: "12px",
                  outlineWidth: "3px",
                  outlineStyle: "solid",
                  outlineColor:
                    state == "known"
                      ? "rgba(104, 211, 145, 0)"
                      : "rgba(252, 129, 129, 0)",
                  transformOrigin: "center",
                  scale: 1,
                }}
                onClick={() => flipCard(t.contentId)}
              >
                <Flashcard
                  dueCard={dueCards[cardCounter]}
                  h={h}
                  index={cardCounter}
                  isFlipped={t.isFlipped}
                  numTerms={dueCards.length}
                  onLeftAction={() =>
                    dueCards[cardCounter] &&
                    markCardCallback(dueCards[cardCounter], false)
                  }
                  onRightAction={() =>
                    dueCards[cardCounter] &&
                    markCardCallback(dueCards[cardCounter], true)
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};
