import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createContext, useContext } from "react";
import {
  MBTIResult,
  MBTITestQuestion,
  MBTIUserOption,
} from "@highschool/interfaces";

export interface MBTIStoreProps {
  questions: MBTITestQuestion[];
  userTestAnswers: MBTIUserOption[];
  questionsCount: number;
  progress: number;
  roundCounter: number;
  roundTimeline: MBTITestQuestion[];
  answered?: string;
  roundSummary?: boolean;
  completed: boolean;
  result?: MBTIResult;
  mbtiType: string;
}

interface MBTIStates extends MBTIStoreProps {
  initialize: (questions: MBTITestQuestion[]) => void;
  answer: (active: MBTITestQuestion, choseOption: string) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  setRoundCounter: (roundCounter: number) => void;
  reset: () => void;
  setResult: (result: MBTIResult, mbtiType: string) => void;
}

export type MBTITestStore = ReturnType<typeof createMBTITestStore>;

export const createMBTITestStore = (initProps?: Partial<MBTIStoreProps>) => {
  const DEFAULT_PROPS: MBTIStoreProps = {
    questions: [],
    userTestAnswers: [],
    mbtiType: "",
    questionsCount: 0,
    progress: 0,
    roundCounter: 0,
    roundTimeline: [],
    completed: false,
  };

  return createStore<MBTIStates>()(
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
      answer: (active: MBTITestQuestion, choseOption: string) =>
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
      setRoundCounter: (roundCounter) => {
        set(() => {
          return { roundCounter };
        });
      },
      setResult: (result, mbtiType) => {
        set({ result });
        set({ mbtiType });
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

export const MBTITestContext = createContext<MBTITestStore | null>(null);

export const useMBTITestContext = <T>(
  selector: (state: MBTIStates) => T,
): T => {
  const store = useContext(MBTITestContext);

  if (!store) throw new Error("Missing LearnContext.Provider in the tree");

  return useStore(store, selector);
};
