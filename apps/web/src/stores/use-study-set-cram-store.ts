import {
  FlashcardContent,
  StudySetAnswerMode,
  TestQuestion,
} from "@highschool/interfaces";
import { Distractor, DistractorType } from "@highschool/interfaces/distractors";
import { shuffleArray } from "@highschool/lib/array";
import { CORRECT, INCORRECT } from "@highschool/lib/constants";
import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { generateMcqQuestion } from "@/utils/generator";

export interface CramStoreProps {
  questionCount: number;
  allTerms: FlashcardContent[];
  timeline: TestQuestion[];
  numTerms: number;
  answered?: string;
  progress: number;
  status?: "correct" | "incorrect" | "unknownPartial";
  feedbackBank: { correct: string[]; incorrect: string[] };
  completed: boolean;
  roundCounter: number;
  summary?: boolean;
  answerMode?: StudySetAnswerMode;
}

interface CramState extends CramStoreProps {
  initialize: (
    allTerms: FlashcardContent[],
    completed: boolean,
    answerMode?: StudySetAnswerMode,
  ) => void;
  answerCorrectly: (termId: string) => void;
  answerIncorrectly: (termId: string) => void;
  goToNextQuestion: () => void;
  endQuestionCallback: (correct: boolean) => void;
  //   nextRound: (start?: boolean) => void;
  setFeedbackBank: (correct: string[], incorrect: string[]) => void;
}

export type CramStore = ReturnType<typeof createCramStore>;

export const DEFAULT_PROPS: CramStoreProps = {
  questionCount: 10,
  allTerms: [],
  timeline: [],
  numTerms: 0,
  roundCounter: 0,
  progress: 0,
  feedbackBank: {
    correct: CORRECT,
    incorrect: INCORRECT,
  },
  completed: false,
  answerMode: StudySetAnswerMode.FlashcardContentTerm,
};

export const createCramStore = (initProps?: Partial<CramStoreProps>) => {
  return createStore<CramState>()(
    subscribeWithSelector((set) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      initialize: (
        allTerms,
        completed,
        answerMode = StudySetAnswerMode.FlashcardContentDefinition,
      ) => {
        const all = Array.from(allTerms);

        const initialTerms = all.map((term) => {
          const availableDistractors = all.filter(
            (distractorTerm) => distractorTerm.id !== term.id,
          );
          const shuffledDistractors = shuffleArray(availableDistractors).slice(
            0,
            3,
          );
          const definitionDistractors: Distractor[] = shuffledDistractors.map(
            (distractorTerm) => ({
              type: DistractorType.FlashcardContentDefinition,
              termId: term.id,
              distractingId: distractorTerm.id,
            }),
          );

          const distractors = [...definitionDistractors];

          return {
            ...term,
            distractors,
          };
        });

        let pool = shuffleArray(initialTerms);
        const timeline: TestQuestion[] = [];

        for (const term of pool) {
          const question = generateMcqQuestion(term, answerMode, allTerms);

          timeline.push(question);
        }

        set({
          allTerms,
          numTerms: allTerms.length,
          timeline,
          progress: 0,
          completed,
          answerMode,
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
          roundTimeline: state.timeline,
        }));
      },
      goToNextQuestion: () => {
        set((state) => {
          state.endQuestionCallback(true);

          return {};
        });
      },
      endQuestionCallback: () => {
        set((state) => {
          const roundCounter = state.roundCounter + 1;
          const roundProgress = state.progress + 1;

          if (state.roundCounter === state.allTerms.length - 1) {
            return {
              completed: true,
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

export const CramContext = createContext<CramStore | null>(null);

export const useCramContext = <T>(selector: (state: CramState) => T): T => {
  const store = useContext(CramContext);

  if (!store) throw new Error("Missing CramContext.Provider in the tree");

  return useStore(store, selector);
};
