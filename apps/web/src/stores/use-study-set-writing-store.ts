import { AssessAnswer, DueCard } from "@highschool/interfaces";
import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface WritingStoreProps {
  dueCardCount: number;
  totalCardCount: number;
  wrongCardCount: number;
  correctCardCount: number;
  dueCards: DueCard[];
  cardCounter: number;
  completed: boolean;
  status?: "known" | "unknown" | "undefined";
  cardResult: AssessAnswer;
}

interface WritingState extends WritingStoreProps {
  initialize: (dueCards: DueCard[], completed: boolean) => void;
  setCardResult: (cardResult: AssessAnswer) => void;
  onDontKnow: () => void;
  onKnow: (rating: number) => void;
  onAnswer: () => void;
  goToNextQuestion: () => void;
  endQuestionCallback: () => void;
}

export type WritingStore = ReturnType<typeof createWritingStore>;

export const DEFAULT_PROPS: WritingStoreProps = {
  dueCardCount: 0,
  totalCardCount: 0,
  wrongCardCount: 0,
  correctCardCount: 0,
  status: undefined,
  dueCards: [],
  cardCounter: 0,
  completed: false,
  cardResult: {
    assessment: "",
    improvement: "",
    rating: 0,
  },
};

export const createWritingStore = (initProps?: Partial<WritingStoreProps>) =>
  createStore<WritingState>()(
    subscribeWithSelector((set) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      initialize: (dueCards: DueCard[], completed: boolean) => {
        set({
          dueCardCount: dueCards.length,
          totalCardCount: dueCards.length,
          dueCards: dueCards,
          cardCounter: 0,
          completed: completed,
        });
      },
      setCardResult: (cardResult: AssessAnswer) => {
        set(() => ({
          cardResult: cardResult,
        }));
      },
      onDontKnow: () => {
        set((state) => ({
          status: "unknown",
          wrongCardCount: state.wrongCardCount + 1,
        }));
      },
      onKnow: (rating: number) => {
        set((state) => ({
          wrongCardCount:
            rating < 2 ? state.wrongCardCount + 1 : state.wrongCardCount,
          correctCardCount:
            rating >= 2 ? state.correctCardCount + 1 : state.correctCardCount,
        }));
      },
      onAnswer: () => {
        set(() => ({
          status: "known",
        }));
      },
      goToNextQuestion: () => {
        set((state) => {
          state.endQuestionCallback();

          return {};
        });
      },
      endQuestionCallback: () => {
        set((state) => {
          const cardCounter = state.cardCounter + 1;

          if (state.cardCounter === state.dueCards.length - 1) {
            return {
              completed: true,
              cardResult: {
                assessment: "",
                improvement: "",
                rating: 0,
              },
              status: undefined,
            };
          }

          return {
            cardCounter,
            cardResult: {
              assessment: "",
              improvement: "",
              rating: 0,
            },
            status: undefined,
          };
        });
      },
    })),
  );

export const WritingContext = createContext<WritingStore | null>(null);

export const useWritingContext = <T>(
  selector: (state: WritingState) => T,
): T => {
  const store = useContext(WritingContext);

  if (!store) throw new Error("Missing WritingContext.Provider in the tree");

  return useStore(store, selector);
};
