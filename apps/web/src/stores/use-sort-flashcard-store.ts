import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import React from "react";
import { DueCard } from "@highschool/interfaces";

export interface SortFlashcardsStoreProps {
  dueCards: DueCard[];
  index: number;
  progressView: boolean;
  dueCardCount: number;
  totalCardCount: number;
}

interface SortFlashcardsState extends SortFlashcardsStoreProps {
  initialize: (dueCards: DueCard[], totalCardCount: number) => void;
  markStillLearning: (termId: string) => void;
  markKnown: (termId: string) => void;
  goBack: (fromProgress?: boolean) => void;
  endSortCallback: () => void;
  nextRound: () => void;
  evaluateTerms: (newDueCards: DueCard[]) => void;
}

export type SortFlashcardsStore = ReturnType<typeof createSortFlashcardsStore>;

export const createSortFlashcardsStore = (
  initProps?: Partial<SortFlashcardsStoreProps>,
) => {
  const DEFAULT_PROPS: SortFlashcardsStoreProps = {
    dueCards: [],
    index: 0,
    progressView: false,
    dueCardCount: 0,
    totalCardCount: 0,
  };

  return createStore<SortFlashcardsState>()(
    subscribeWithSelector((set) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      initialize: (dueCards, totalCardCount) => {
        set({
          dueCards,
          totalCardCount,
          dueCardCount: dueCards.length,
          index: 0,
          progressView: false,
        });
      },
      markStillLearning: (termId) => {
        set((state) => {
          const updatedDueCards = state.dueCards.map((card) =>
            card.contentId === termId ? { ...card, isReview: false } : card,
          );

          return {
            dueCards: updatedDueCards,
            index: state.index + 1,
          };
        });
      },
      markKnown: (termId) => {
        set((state) => {
          const updatedDueCards = state.dueCards.map((card) =>
            card.contentId === termId ? { ...card, isReview: true } : card,
          );

          return {
            dueCards: updatedDueCards,
            index: state.index + 1,
          };
        });
      },
      goBack: (fromProgress = false) => {
        set((state) => ({
          index: Math.max(0, state.index - 1),
          progressView: fromProgress ? false : state.progressView,
        }));
      },
      endSortCallback: () => {
        set({ progressView: true });
      },
      nextRound: () => {
        set((state) => {
          const stillLearningCards = state.dueCards.filter(
            (card) => !card.isReview,
          );

          return {
            dueCards: stillLearningCards,
            dueCardCount: stillLearningCards.length,
            index: 0,
            progressView: stillLearningCards.length === 0,
          };
        });
      },
      evaluateTerms: (newDueCards) => {
        set((state) => {
          const updatedDueCards = newDueCards.map((newCard) => {
            const existingCard = state.dueCards.find(
              (card) => card.contentId === newCard.contentId,
            );

            return existingCard
              ? { ...newCard, isReview: existingCard.isReview }
              : newCard;
          });

          return {
            dueCards: updatedDueCards,
            dueCardCount: updatedDueCards.length,
          };
        });
      },
    })),
  );
};

export const SortFlashcardsContext =
  React.createContext<SortFlashcardsStore | null>(null);

export const useSortFlashcardsContext = <T>(
  selector: (state: SortFlashcardsState) => T,
): T => {
  const store = React.useContext(SortFlashcardsContext);

  if (!store) {
    throw new Error(
      "useSortFlashcardsContext must be used within a SortFlashcardsProvider",
    );
  }

  return useStore(store, selector);
};
