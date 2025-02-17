import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createContext, useContext } from "react";
import {
  MBTIAnswerOptions,
  MBTIResult,
  MBTITestQuestion,
  MBTIUserOption,
} from "@highschool/interfaces";

interface MBTITestStoreProps {
  testQuestions: MBTITestQuestion[];
  userTestAnswers: MBTIUserOption[];
  result?: MBTIResult;
  mbtiType: string;
  currentQuestionIndex: number;
}

interface MBTITestState extends MBTITestStoreProps {
  setCurrentQuestionIndex: (index: number) => void;
  setAnswerForQuestion: (
    questionIndex: number,
    questionId: string,
    answer: MBTIAnswerOptions,
  ) => void;
  setResult: (result: MBTIResult, mbtiType: string) => void;
  // submit: (userAnswers: MBTIUserOption[]) => void;
}

export type MBTITestStore = ReturnType<typeof createMBTITestStore>;

export const DEFAULT_PROPS: MBTITestStoreProps = {
  testQuestions: [],
  userTestAnswers: [],
  mbtiType: "",
  currentQuestionIndex: 0,
};

export const createMBTITestStore = (
  initProps?: Partial<MBTITestStoreProps>,
) => {
  return createStore<MBTITestState>()(
    subscribeWithSelector((set) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      setAnswerForQuestion: (questionIndex, questionId, answer) =>
        set((state) => {
          const updatedAnswers = [...state.userTestAnswers];

          updatedAnswers[questionIndex] = {
            id: questionId,
            option: answer.option,
          };

          return { userTestAnswers: updatedAnswers };
        }),
      setCurrentQuestionIndex: (index) => {
        set({ currentQuestionIndex: index });
      },
      setResult: (result, mbtiType) => {
        set({ result });
        set({ mbtiType });
      },
    })),
  );
};

export const MBTITestContext = createContext<MBTITestStore | null>(null);

export const useMBTITestContext = <T>(
  selector: (state: MBTITestState) => T,
): T => {
  const store = useContext(MBTITestContext);

  if (!store) throw new Error("Missing MBTITestContext.Provider in the tree");

  return useStore(store, selector);
};
