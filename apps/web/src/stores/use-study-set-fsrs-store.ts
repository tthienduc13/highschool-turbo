import { DueCard } from "@highschool/interfaces";
import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface StudySetFSRSProps {
  title: string;
  isReviewToday: boolean;
  dueCardCount: number;
  totalCardCount: number;
  dueCards: DueCard[];
  cardCounter: number;
  cardStartTimes: Record<string, number>;
  completed: boolean;
  stillLearning: boolean;
  unknownCount: number;
  knownCount: number;
}

interface StudySetFSRSState extends StudySetFSRSProps {
  initialize: (
    dueCards: DueCard[],
    title: string,
    completed: boolean,
    isReviewToday: boolean,
  ) => void;
  setTitle: (title: string) => void;
  markStillLearning: (termId: string, timeSpent: number) => void;
  markKnown: (termId: string, timeSpent: number) => void;
  endSortCallback: () => void;
  startCardTimer: (termId: string) => void;
  getTimeSpent: (termId: string) => number;
}

export type StudySetFSRSStore = ReturnType<typeof createStudySetFSRSStore>;

export const DEFAULT_PROPS: StudySetFSRSProps = {
  title: "",
  isReviewToday: false,
  dueCardCount: 0,
  cardStartTimes: {},
  cardCounter: 0,
  totalCardCount: 0,
  unknownCount: 0,
  knownCount: 0,
  dueCards: [],
  completed: false,
  stillLearning: false,
};

export const createStudySetFSRSStore = (
  initProps?: Partial<StudySetFSRSProps>,
) =>
  createStore<StudySetFSRSState>()(
    subscribeWithSelector((set, get) => {
      return {
        ...DEFAULT_PROPS,
        ...initProps,
        initialize: (
          dueCards: DueCard[],
          title,
          completed: boolean,
          isReviewToday: boolean,
        ) => {
          const cardStartTimes: Record<string, number> = {};

          dueCards.forEach((card) => {
            cardStartTimes[card.contentId] = Date.now();
          });
          set({
            title: title,
            dueCardCount: dueCards.length,
            totalCardCount: dueCards.length,
            dueCards: dueCards,
            cardStartTimes,
            completed,
            isReviewToday,
          });
        },
        setTitle: (title) => {
          set(() => ({
            title: title,
          }));
        },
        getTimeSpent: (termId) => {
          const state = get();
          const startTime = state.cardStartTimes[termId] || Date.now();

          return Math.floor((Date.now() - startTime) / 1000);
        },
        startCardTimer: (termId) => {
          set((state) => ({
            cardStartTimes: {
              ...state.cardStartTimes,
              [termId]: Date.now(),
            },
          }));
        },
        markKnown: (termId) => {
          set((state) => {
            const updatedDueCards = state.dueCards.map((card) =>
              card.contentId === termId ? { ...card, isReview: true } : card,
            );

            state.endSortCallback();

            return {
              dueCards: updatedDueCards,
              knownCount: state.knownCount + 1,
            };
          });
        },
        markStillLearning: (termId, timeSpent) => {
          set((state) => {
            const updatedDueCards = state.dueCards.map((card) =>
              card.contentId === termId ? { ...card, isReview: false } : card,
            );

            state.endSortCallback();

            return {
              dueCards: updatedDueCards,
              unknownCount: state.unknownCount + 1,
            };
          });
        },
        endSortCallback: () => {
          set((state) => {
            if (state.cardCounter === state.dueCards.length - 1) {
              return {
                completed: true,
              };
            }

            return {
              cardCounter: state.cardCounter + 1,
            };
          });
        },
      };
    }),
  );

export const StudySetFSRSContext = createContext<StudySetFSRSStore | null>(
  null,
);

export const useStudySetFSRSContext = <T>(
  selector: (state: StudySetFSRSState) => T,
): T => {
  const store = useContext(StudySetFSRSContext);

  if (!store) throw new Error("Missing WritingContext.Provider in the tree");

  return useStore(store, selector);
};
