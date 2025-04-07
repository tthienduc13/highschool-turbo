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
  cardStartTimes: Record<string, number>; // Track when each card was started
  allCardsRated: boolean; // Track if all cards have been rated
  allCardsKnown: boolean; // Track if all cards were rated as known (3)
  manualRevalidate: boolean; // Flag to indicate if data should be manually revalidated
}

interface SortFlashcardsState extends SortFlashcardsStoreProps {
  initialize: (dueCards: DueCard[], totalCardCount: number) => void;
  markStillLearning: (termId: string, timeSpent: number) => void;
  markKnown: (termId: string, timeSpent: number) => void;
  goBack: (fromProgress?: boolean) => void;
  endSortCallback: () => void;
  nextRound: (isReview: boolean) => void;
  evaluateTerms: (newDueCards: DueCard[]) => void;
  startCardTimer: (termId: string) => void;
  getTimeSpent: (termId: string) => number;
  checkAllCardsRated: () => boolean;
  checkAllCardsKnown: () => boolean;
  setManualRevalidate: (value: boolean) => void;
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
    cardStartTimes: {},
    allCardsRated: false,
    allCardsKnown: false,
    manualRevalidate: false,
  };

  return createStore<SortFlashcardsState>()(
    subscribeWithSelector((set, get) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      initialize: (dueCards, totalCardCount) => {
        // Initialize start times for all cards
        const cardStartTimes: Record<string, number> = {};
        dueCards.forEach(card => {
          cardStartTimes[card.contentId] = Date.now();
        });

        set({
          dueCards,
          totalCardCount,
          dueCardCount: dueCards.length,
          index: 0,
          progressView: false,
          cardStartTimes,
          allCardsRated: false,
          allCardsKnown: false,
          manualRevalidate: false,
        });
      },
      markStillLearning: (termId, timeSpent) => {
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
      markKnown: (termId, timeSpent) => {
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
      nextRound: (isReview) => {
        set((state) => {
          const stillLearningCards = state.dueCards.filter(
            (card) => !card.isReview,
          );

          // Check if all cards have been rated
          const allRated = state.index >= state.dueCards.length;
          
          // Check if all cards were rated as known (3)
          const allKnown = state.dueCards.every(card => card.isReview);

          return {
            dueCards: stillLearningCards,
            dueCardCount: stillLearningCards.length,
            index: 0,
            progressView: stillLearningCards.length === 0 || allRated,
            allCardsRated: allRated,
            allCardsKnown: allKnown,
            manualRevalidate: true, // Set to true to indicate manual revalidation is needed
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

          // Initialize start times for new cards
          const updatedCardStartTimes = { ...state.cardStartTimes };
          updatedDueCards.forEach(card => {
            if (!updatedCardStartTimes[card.contentId]) {
              updatedCardStartTimes[card.contentId] = Date.now();
            }
          });

          return {
            dueCards: updatedDueCards,
            dueCardCount: updatedDueCards.length,
            cardStartTimes: updatedCardStartTimes,
            manualRevalidate: false, // Reset to false after data is revalidated
          };
        });
      },
      startCardTimer: (termId) => {
        set((state) => ({
          cardStartTimes: {
            ...state.cardStartTimes,
            [termId]: Date.now(),
          },
        }));
      },
      getTimeSpent: (termId) => {
        const state = get();
        const startTime = state.cardStartTimes[termId] || Date.now();
        return Math.floor((Date.now() - startTime) / 1000); // Return time in seconds
      },
      checkAllCardsRated: () => {
        const state = get();
        return state.index >= state.dueCards.length;
      },
      checkAllCardsKnown: () => {
        const state = get();
        return state.dueCards.every(card => card.isReview);
      },
      setManualRevalidate: (value) => {
        set({ manualRevalidate: value });
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
