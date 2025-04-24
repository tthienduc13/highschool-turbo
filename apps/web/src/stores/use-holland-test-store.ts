import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createContext, useContext } from "react";
import {
  HollandQuestion,
  HollandResult,
  HollandUserOption,
} from "@highschool/interfaces";

export interface HollandStoreProps {
  questions: HollandQuestion[];
  userTestAnswers: HollandUserOption[];
  roundTimeline: HollandQuestion[];
  result?: HollandResult[];
  questionsCount: number;
  progress: number;
  roundCounter: number;
  answered?: string;
  roundSummary?: boolean;
  completed: boolean;
  hollandType: string;
}

interface HollandStates extends HollandStoreProps {
  initialize: (questions: HollandQuestion[]) => void;
  answer: (active: HollandQuestion, choseOption: string[]) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  setRoundCounter: (roundCounter: number) => void;
  reset: () => void;
  setResult: (result: HollandResult[], hollandType: string) => void;
}

export type HollandTestStore = ReturnType<typeof createHollandTestStore>;

export const createHollandTestStore = (
  initProps?: Partial<HollandStoreProps>,
) => {
  const DEFAULT_PROPS: HollandStoreProps = {
    questions: [],
    userTestAnswers: [],
    hollandType: "",
    questionsCount: 0,
    progress: 0,
    roundCounter: 0,
    roundTimeline: [],
    completed: false,
  };

  return createStore<HollandStates>()(
    subscribeWithSelector((set) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      initialize: (questions) => {
        set({
          questions,
          roundTimeline: questions,
          questionsCount: questions.length,
        });
      },
      setRoundCounter: (roundCounter) => {
        set({ roundCounter });
      },
      answer: (active: HollandQuestion, choseOption: string[]) =>
        set((state) => {
          const updatedAnswers = [...state.userTestAnswers];
          const roundCounter = state.roundCounter;

          updatedAnswers[roundCounter] = {
            id: active.id,
            answerOption: choseOption,
          };

          return { userTestAnswers: updatedAnswers };
        }),
      goToNextQuestion: () => {
        set((state) => {
          const roundCounter = state.roundCounter + 1;
          const progress = state.progress + 1;

          return { roundCounter, progress };
        });
      },
      goToPreviousQuestion: () => {
        set((state) => {
          const roundCounter = state.roundCounter - 1;
          const progress = state.progress - 1;

          return { roundCounter, progress };
        });
      },
      setResult: (result, hollandType) => {
        set({ result, hollandType });
      },
      reset: () => {
        set(() => {
          return {
            userTestAnswers: [],
            roundCounter: 0,
            progress: 0,
          };
        });
      },
    })),
  );
};

export const HollandTestContext = createContext<HollandTestStore | null>(null);

export const useHollandTestContext = <T>(
  selector: (state: HollandStates) => T,
): T => {
  const store = useContext(HollandTestContext);

  if (!store)
    throw new Error("Missing HollandLearnContext.Provider in the tree");

  return useStore(store, selector);
};
