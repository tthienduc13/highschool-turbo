import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { createContext, useContext } from "react";

import {
  HollandAnswerOptions,
  HollandQuestion,
  HollandResult,
  HollandUserOption,
} from "@highschool/interfaces";

interface HollandTestStoreProps {
  testQuestions: HollandQuestion[];
  userTestAnswers: HollandUserOption[];
  result?: HollandResult[];
  hollandType: string;
  currentQuestionIndex: number;
}

interface HollandTestState extends HollandTestStoreProps {
  setCurrentQuestionIndex: (index: number) => void;
  setAnswerForQuestion: (
    questionIndex: number,
    questionId: string,
    answers: HollandAnswerOptions[],
  ) => void;
  setResult: (result: HollandResult[], hollandType: string) => void;
  clearAnswersForQuestion: (questionIndex: number) => void;
}

export type HollandTestStore = ReturnType<typeof createHollandTestStore>;

export const DEFAULT_PROPS: HollandTestStoreProps = {
  testQuestions: [],
  userTestAnswers: [],
  hollandType: "",
  currentQuestionIndex: 0,
};

export const createHollandTestStore = (
  initProps?: Partial<HollandTestStoreProps>,
  behaviors?: Partial<HollandTestState>,
) => {
  return createStore<HollandTestState>()(
    subscribeWithSelector((set, get) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      setAnswerForQuestion: (questionIndex, questionId, answers) =>
        set((state) => {
          const updatedAnswers = [...state.userTestAnswers];
          updatedAnswers[questionIndex] = {
            id: questionId,
            answerOption: answers.map((answer) => answer.option),
          };
          return { userTestAnswers: updatedAnswers };
        }),
      clearAnswersForQuestion: (questionIndex) =>
        set((state) => {
          const updatedAnswers = [...state.userTestAnswers];
          updatedAnswers[questionIndex] = {
            id: updatedAnswers[questionIndex]?.id || "",
            answerOption: [],
          };
          return { userTestAnswers: updatedAnswers };
        }),
      setCurrentQuestionIndex: (index) => {
        set({ currentQuestionIndex: index });
      },
      setResult: (result, hollandType) => {
        set({ result });
        set({ hollandType });
      },
    })),
  );
};

export const HollandTestContext = createContext<HollandTestStore | null>(null);

export const useHollandTestContext = <T>(
  selector: (state: HollandTestState) => T,
): T => {
  const store = useContext(HollandTestContext);
  if (!store)
    throw new Error("Missing HollandTestContext.Provider in the tree");

  return useStore(store, selector);
};
