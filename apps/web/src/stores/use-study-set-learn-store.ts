import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createContext, useContext } from "react";
import { Question } from "@highschool/interfaces";
import { CORRECT, INCORRECT } from "@highschool/lib/constants";

export interface LearnStoreProps {
  studiableTerms: Question[];
  numTerms: number;
  termsThisRound: number;
  currentRound: number;
  roundProgress: number;
  roundCounter: number;
  roundTimeline: Question[];
  feedbackBank: { correct: string[]; incorrect: string[] };
  answered?: string;
  status?: "correct" | "incorrect" | "unknownPartial";
  roundSummary?: boolean;
  completed: boolean;
}

interface LearnState extends LearnStoreProps {
  initialize: (studiableTerms: Question[], completed: boolean) => void;
  answerCorrectly: (termId: string) => void;
  answerIncorrectly: (termId: string) => void;
  acknowledgeIncorrect: () => void;
  goToNextQuestion: () => void;
  endQuestionCallback: (correct: boolean) => void;
  nextRound: (start?: boolean) => void;
  setFeedbackBank: (correct: string[], incorrect: string[]) => void;
}

export type LearnStore = ReturnType<typeof createLearnStore>;

export const createLearnStore = (initProps?: Partial<LearnStoreProps>) => {
  const DEFAULT_PROPS: LearnStoreProps = {
    studiableTerms: [],
    numTerms: 0,
    termsThisRound: 0,
    currentRound: 0,
    roundProgress: 0,
    roundCounter: 0,
    roundTimeline: [],
    feedbackBank: {
      correct: CORRECT,
      incorrect: INCORRECT,
    },
    completed: false,
  };

  return createStore<LearnState>()(
    subscribeWithSelector((set) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      initialize: (studiableTerms, completed) => {
        set({
          studiableTerms,
          roundTimeline: studiableTerms,
          numTerms: studiableTerms.length,
          termsThisRound: studiableTerms.length,
          completed: completed,
        });

        set((state) => {
          state.nextRound(true);

          return {};
        });
      },
      answerCorrectly: (termId) => {
        set(() => ({
          answered: termId,
          status: "correct",
        }));

        setTimeout(() => {
          set((state) => {
            state.endQuestionCallback(true);

            return {};
          });
        }, 1000);
      },
      answerIncorrectly: (termId) => {
        set((state) => ({
          answered: termId,
          status: "incorrect",
          roundTimeline: state.roundTimeline,
          prevTermWasIncorrect: false,
        }));
      },
      acknowledgeIncorrect: () => {
        set((state) => {
          state.endQuestionCallback(false);

          return {};
        });
      },
      goToNextQuestion: () => {
        set((state) => {
          state.endQuestionCallback(true);

          return {};
        });
      },
      nextRound: (start = false) => {
        set((state) => {
          const currentRound = state.currentRound + (!start ? 1 : 0);

          return {
            roundSummary: false,
            roundCounter: 0,
            roundProgress: 0,
            answered: undefined,
            status: undefined,
            completed: !state.studiableTerms.length,
            currentRound,
          };
        });
      },

      endQuestionCallback: (correct) => {
        set((state) => {
          const roundCounter = state.roundCounter + 1;
          const roundProgress = state.roundProgress + (correct ? 1 : 0);

          if (state.roundProgress === state.termsThisRound - 1) {
            return {
              roundSummary: true,
              status: undefined,
            };
          }

          return {
            roundCounter,
            roundProgress,
            answered: undefined,
            status: undefined,
          };
        });
      },

      setFeedbackBank: (correct, incorrect) => {
        set({
          feedbackBank: { correct, incorrect },
        });
      },
    })),
  );
};

export const LearnContext = createContext<LearnStore | null>(null);

export const useLearnContext = <T>(selector: (state: LearnState) => T): T => {
  const store = useContext(LearnContext);

  if (!store) throw new Error("Missing LearnContext.Provider in the tree");

  return useStore(store, selector);
};
