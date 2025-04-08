"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import throttle from "lodash.throttle";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  LimitedStudySetAnswerMode,
  DueCard,
  FlashcardContent,
} from "@highschool/interfaces";
import {
  useFSRSByIdQuery,
  useFSRSProgressMutation,
} from "@highschool/react-query/queries";

import { Flashcard } from "./flashcard";
import { RootFlashcardContext } from "./root-flashcard-wrapper";
import { SortFlashcardProgress } from "./sort-flashcard-progress";
import { SortableShortcutLayer } from "./sortable-shorcut-layer";

import { useContainerContext } from "@/stores/use-container-store";
import { useSortFlashcardsContext } from "@/stores/use-sort-flashcard-store";
import { useSet } from "@/hooks/use-set";

export const SortFlashcardWrapper = () => {
  const { h, editTerm, starTerm } = useContext(RootFlashcardContext);
  const controls = useAnimationControls();

  const cardsAnswerWith = useContainerContext((s) => s.cardsAnswerWith);
  const shouldFlip = cardsAnswerWith == LimitedStudySetAnswerMode.Term;

  const dueCards = useSortFlashcardsContext((s) => s.dueCards);
  const index = useSortFlashcardsContext((s) => s.index);
  const progressView = useSortFlashcardsContext((s) => s.progressView);
  const markStillLearning = useSortFlashcardsContext(
    (s) => s.markStillLearning,
  );
  const markKnown = useSortFlashcardsContext((s) => s.markKnown);
  const nextRound = useSortFlashcardsContext((s) => s.nextRound);
  const goBack = useSortFlashcardsContext((s) => s.goBack);
  const getTimeSpent = useSortFlashcardsContext((s) => s.getTimeSpent);
  const startCardTimer = useSortFlashcardsContext((s) => s.startCardTimer);
  const checkAllCardsRated = useSortFlashcardsContext(
    (s) => s.checkAllCardsRated,
  );
  const checkAllCardsKnown = useSortFlashcardsContext(
    (s) => s.checkAllCardsKnown,
  );
  const manualRevalidate = useSortFlashcardsContext((s) => s.manualRevalidate);
  const setManualRevalidate = useSortFlashcardsContext(
    (s) => s.setManualRevalidate,
  );

  const apiMarkFlashcard = useFSRSProgressMutation();

  const evaluateTerms = useSortFlashcardsContext((s) => s.evaluateTerms);

  const { flashcard } = useSet();
  const [isReview, setIsReview] = useState(false);
  const { data: fsrsData, refetch } = useFSRSByIdQuery({
    flashcardId: flashcard.id,
    isReview,
  });

  type FlashcardWithUI = DueCard & { isFlipped: boolean; index: number };

  const convertToFlashcardContent = (dueCard: DueCard): FlashcardContent => {
    return {
      id: dueCard.contentId,
      flashcardId: dueCard.contentId,
      flashcardContentTerm: dueCard.term,
      flashcardContentDefinition: dueCard.definition,
      image: null,
      flashcardContentTermRichText: "",
      flashcardContentDefinitionRichText: "",
      rank: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "",
      updatedBy: "",
    };
  };

  const [visibleFlashcards, setVisibleFlashcards] = useState<FlashcardWithUI[]>(
    !progressView && dueCards[index]
      ? [{ ...dueCards[index], isFlipped: shouldFlip, index }]
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

    if (index === dueCards.length - 1) {
      const allRated = checkAllCardsRated();
      const allKnown = checkAllCardsKnown();

      if (allRated) {
        nextRound(isReview);
      } else {
        nextRound(isReview);
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const markCardCallback = useCallback(
    throttle(markCard, 200, { trailing: false }),
    [index, dueCards.length],
  );

  const handleGoBack = () => {
    const newIndex = index - 1;
    const card = dueCards[newIndex];

    if (!card) return;
    setState(card.isReview ? "known" : "stillLearning");

    allowAnimation();
    goBack();
  };

  useEffect(() => {
    if (!progressView && dueCards[index]) {
      // Start timer for the current card
      startCardTimer(dueCards[index].contentId);

      setVisibleFlashcards([
        { ...dueCards[index], isFlipped: shouldFlip, index },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, dueCards]);

  useEffect(() => {
    if (progressView) {
      setHasUserEngaged(false);
      setVisibleFlashcards([]);
    }
  }, [progressView]);

  // Update due cards when FSRS data changes
  useEffect(() => {
    if (fsrsData) {
      evaluateTerms(fsrsData.dueCards);
    }
  }, [fsrsData, evaluateTerms]);

  const onNextRound = async () => {
    // If all cards were rated as known (3), set isReview to false to get new cards
    // Otherwise, keep reviewing the same cards
    const allKnown = checkAllCardsKnown();

    setIsReview(!allKnown);

    // Reset the manual revalidate flag
    setManualRevalidate(false);

    // Revalidate the data
    await refetch();

    // Move to the next round
    nextRound(!allKnown);
  };

  const onResetProgress = () => {
    // Reset progress functionality can be implemented here
  };

  return (
    <div
      className="relative w-full"
      style={{
        height: h,
      }}
    >
      {progressView ? (
        <SortFlashcardProgress
          manualRevalidate={manualRevalidate}
          onNextRound={onNextRound}
          onResetProgress={onResetProgress}
        />
      ) : (
        <SortableShortcutLayer
          triggerFlip={async () => {
            if (visibleFlashcards.length)
              await flipCard(visibleFlashcards[0]!.contentId);
          }}
          triggerKnow={() =>
            dueCards[index] && markCardCallback(dueCards[index], true)
          }
          triggerStillLearning={() =>
            dueCards[index] && markCardCallback(dueCards[index], false)
          }
        />
      )}
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
              h={h}
              index={t.index}
              isFlipped={t.isFlipped}
              numTerms={dueCards.length}
              starred={false}
              term={convertToFlashcardContent(t)}
              variant="sortable"
              onBackAction={handleGoBack}
              onLeftAction={() =>
                dueCards[index] && markCardCallback(dueCards[index], false)
              }
              onRequestEdit={() =>
                editTerm(convertToFlashcardContent(t), t.isFlipped)
              }
              onRequestStar={() => starTerm(convertToFlashcardContent(t))}
              onRightAction={() =>
                dueCards[index] && markCardCallback(dueCards[index], true)
              }
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
