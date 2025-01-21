"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import throttle from "lodash.throttle";

import { useCallback, useContext, useEffect, useState } from "react";

import {
  LimitedStudySetAnswerMode,
  StudiableTerm,
} from "@highschool/interfaces";

import { useContainerContext } from "@/stores/use-container-store";
import { useSetPropertiesStore } from "@/stores/use-set-properties";
import { useSortFlashcardsContext } from "@/stores/use-sort-flashcard-store";

import { Flashcard } from "./flashcard";
import { RootFlashcardContext } from "./root-flashcard-wrapper";

export const SortFlashcardWrapper = () => {
  const setIsDirty = useSetPropertiesStore((s) => s.setIsDirty);
  const { h, editTerm, starTerm } = useContext(RootFlashcardContext);
  const controls = useAnimationControls();

  const starredTerms = useContainerContext((s) => s.starredTerms);
  const cardsAnswerWith = useContainerContext((s) => s.cardsAnswerWith);
  const shouldFlip = cardsAnswerWith == LimitedStudySetAnswerMode.Term;

  const termsThisRound = useSortFlashcardsContext((s) => s.termsThisRound);
  const index = useSortFlashcardsContext((s) => s.index);
  const currentRound = useSortFlashcardsContext((s) => s.currentRound);
  const progressView = useSortFlashcardsContext((s) => s.progressView);
  const stateMarkStillLearning = useSortFlashcardsContext(
    (s) => s.markStillLearning,
  );

  const stateMarkKnown = useSortFlashcardsContext((s) => s.markKnown);
  const stateNextRound = useSortFlashcardsContext((s) => s.nextRound);
  const stateGoBack = useSortFlashcardsContext((s) => s.goBack);

  const term = !progressView ? termsThisRound[index] : undefined;

  const setDirtyProps = {
    onSuccess: () => {
      setIsDirty(true);
    },
  };

  type Flashcard = StudiableTerm & { isFlipped: boolean; index: number };

  const [visibleFlashcards, setVisibleFlashcards] = useState<Flashcard[]>(
    !progressView ? [{ ...term!, isFlipped: shouldFlip, index }] : [],
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
    if (!visibleFlashcards.find((f) => f.id == id)) return;

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

  const markCard = (term: StudiableTerm, know: boolean) => {
    allowAnimation();
    setState(know ? "known" : "stillLearning");
    controls.set({ zIndex: 105 });

    if (know) stateMarkKnown(term.id);
    else stateMarkStillLearning(term.id);

    // void (async () => {
    //   await put.mutateAsync({
    //     id: term.id,
    //     containerId: container.id,
    //     mode: "Flashcards",
    //     correctness: know ? 1 : -1,
    //     appearedInRound: currentRound,
    //     incorrectCount: know
    //       ? term.incorrectCount || 0
    //       : term.incorrectCount + 1,
    //   });
    // })();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const markCardCallback = useCallback(
    throttle(markCard, 200, { trailing: false }),
    [currentRound],
  );

  const goBack = () => {
    const newIndex = index - 1;
    const studiableTerm = termsThisRound[newIndex];
    if (!studiableTerm) return;
    setState(studiableTerm.correctness == 1 ? "known" : "stillLearning");

    // void (async () => {
    //   await apiDelete.mutateAsync({
    //     id: studiableTerm.id,
    //     containerId: container.id,
    //     mode: "Flashcards",
    //   });
    // })();

    allowAnimation();
    stateGoBack();
  };

  useEffect(() => {
    if (!progressView)
      setVisibleFlashcards([{ ...term!, isFlipped: shouldFlip, index }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  useEffect(() => {
    if (progressView) {
      setHasUserEngaged(false);
      setVisibleFlashcards([]);
    }
  }, [progressView]);

  const onNextRound = () => {
    stateNextRound();

    // void (async () => {
    //   await apiCompleteCardsRound.mutateAsync({
    //     entityId: id,
    //     type: entityType == "set" ? "StudySet" : "Folder",
    //   });
    // })();
  };

  const onResetProgress = () => {
    // void (async () => {
    //   await apiResetCardsProgress.mutateAsync({
    //     entityId: id,
    //     type: entityType == "set" ? "StudySet" : "Folder",
    //   });
    // })();
  };
  return (
    <div
      style={{
        height: h,
      }}
      className="relative w-full"
    >
      {/* {progressView ? (
        <SortFlashcardProgress
          h={h}
          onNextRound={onNextRound}
          onResetProgress={onResetProgress}
        />
      ) : (
        <SortableShortcutLayer
          triggerFlip={async () => {
            if (visibleFlashcards.length)
              await flipCard(visibleFlashcards[0]!.id);
          }}
          triggerStillLearning={() => markCardCallback(term!, false)}
          triggerKnow={() => markCardCallback(term!, true)}
        />
      )} */}
      <AnimatePresence>
        {visibleFlashcards.map((t, i) => (
          <motion.div
            id="sortable-flashcard"
            key={`flashcard-${t.id}-${i}`}
            animate={controls}
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
            onClick={() => flipCard(t.id)}
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
          >
            <Flashcard
              h={h}
              term={t}
              index={t.index}
              isFlipped={t.isFlipped}
              numTerms={termsThisRound.length}
              onLeftAction={() => markCardCallback(term!, false)}
              onRightAction={() => markCardCallback(term!, true)}
              onBackAction={goBack}
              starred={starredTerms.includes(t.id)}
              onRequestEdit={() => editTerm(t, t.isFlipped)}
              onRequestStar={() => starTerm(t)}
              variant="sortable"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
