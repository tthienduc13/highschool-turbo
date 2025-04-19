import {
  FlashcardContent,
  StudiableTerm,
  StudiableTermWithDistractors,
  StudySetAnswerMode,
} from "@highschool/interfaces";
import { shuffleArray } from "@highschool/lib/array";
import { CORRECT, INCORRECT } from "@highschool/lib/constants";
import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const LEARN_TERMS_IN_ROUND = 7;

export interface RoundSummary {
  round: number;
  termsThisRound: FlashcardContent[];
  progress: number;
  totalTerms: number;
}

export interface Question {
  answerMode: StudySetAnswerMode;
  term: StudiableTerm;
  type: "choice" | "write";
  choices: FlashcardContent[];
}

export interface CramStoreProps {
  answerMode: StudySetAnswerMode;
  studiableTerms: StudiableTermWithDistractors[];
  allTerms: FlashcardContent[];
  numTerms: number;
  termsThisRound: number;
  currentRound: number;
  roundProgress: number;
  roundCounter: number;
  roundTimeline: Question[];
  feedbackBank: { correct: string[]; incorrect: string[] };
  answered?: string;
  status?: "correct" | "incorrect" | "unknownPartial";
  roundSummary?: RoundSummary;
  completed: boolean;
  hasMissedTerms?: boolean;
  prevTermWasIncorrect?: boolean;
}

interface CramState extends CramStoreProps {
  initialize: (
    answerMode: StudySetAnswerMode,
    studiableTerms: StudiableTermWithDistractors[],
    allTerms: FlashcardContent[],
    round: number,
  ) => void;
  answerCorrectly: (termId: string) => void;
  answerIncorrectly: (termId: string) => void;
  acknowledgeIncorrect: () => void;
  answerUnknownPartial: () => void;
  overrideCorrect: () => void;
  endQuestionCallback: (correct: boolean) => void;
  correctFromUnknown: (termId: string) => void;
  incorrectFromUnknown: (termId: string) => void;
  nextRound: (start?: boolean) => void;
  setFeedbackBank: (correct: string[], incorrect: string[]) => void;
}

export type CramStore = ReturnType<typeof createCramStore>;

export const createCramStore = (initProps?: Partial<CramStoreProps>) => {
  const DEFAULT_PROPS: CramStoreProps = {
    answerMode: StudySetAnswerMode.FlashcardContentDefinition,
    studiableTerms: [],
    allTerms: [],
    numTerms: 0,
    termsThisRound: 0,
    currentRound: 0,
    roundProgress: 0,
    roundCounter: 0,
    roundTimeline: [],
    feedbackBank: { correct: CORRECT, incorrect: INCORRECT },
    completed: false,
  };

  return createStore<CramState>()(
    subscribeWithSelector((set) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      initialize: (answerMode, studiableTerms, allTerms, round) => {
        set({
          answerMode,
          studiableTerms,
          allTerms,
          numTerms: studiableTerms.length,
          currentRound: round,
        });

        set((state) => {
          state.nextRound(true);

          return {};
        });
      },
      answerCorrectly: (termId) => {
        set({
          answered: termId,
          status: "correct",
          prevTermWasIncorrect: false,
        });

        setTimeout(() => {
          set((state) => {
            const active = state.roundTimeline[state.roundCounter]!;

            active.term.correctness = active.type == "choice" ? 1 : 2;

            state.endQuestionCallback(true);

            return {};
          });
        }, 1000);
      },
      answerIncorrectly: (termId) => {
        set((state) => ({
          answered: termId,
          status: "incorrect",
          roundTimeline:
            state.roundProgress != state.termsThisRound - 1
              ? [
                  ...state.roundTimeline,
                  state.roundTimeline[state.roundCounter]!,
                ]
              : state.roundTimeline,
          prevTermWasIncorrect: true,
        }));
      },
      acknowledgeIncorrect: () => {
        set((state) => {
          const active = state.roundTimeline[state.roundCounter]!;

          active.term.correctness = -1;
          active.term.incorrectCount++;

          state.endQuestionCallback(false);

          return {};
        });
      },
      answerUnknownPartial: () => {
        set({ status: "unknownPartial" });
      },
      overrideCorrect: () => {
        set((state) => {
          const active = state.roundTimeline[state.roundCounter]!;

          active.term.correctness = 2;

          const roundTimeline = state.roundTimeline;

          if (state.roundProgress != state.termsThisRound - 1) {
            // Remove the added question from the timeline
            roundTimeline.splice(-1);
          }

          state.endQuestionCallback(true);

          return {
            roundTimeline,
            prevTermWasIncorrect: false,
          };
        });
      },
      endQuestionCallback: (correct) => {
        set((state) => {
          const masteredCount = state.studiableTerms.filter(
            (x) => x.correctness == 2,
          ).length;

          if (masteredCount == state.numTerms) {
            const hasMissedTerms = !!state.studiableTerms.find(
              (x) => x.incorrectCount > 0,
            );

            return { completed: true, hasMissedTerms };
          }

          if (state.roundProgress === state.termsThisRound - 1) {
            return {
              roundSummary: {
                round: state.currentRound,
                termsThisRound: Array.from(
                  new Set(state.roundTimeline.map((q) => q.term)),
                ),
                progress: state.studiableTerms.filter((x) => x.correctness != 0)
                  .length,
                totalTerms: state.numTerms,
              },
              status: undefined,
            };
          }

          const roundCounter = state.roundCounter + 1;
          const roundProgress = state.roundProgress + (correct ? 1 : 0);

          return {
            roundCounter,
            roundProgress,
            answered: undefined,
            status: undefined,
          };
        });
      },
      correctFromUnknown: (termId) => {
        set({
          answered: termId,
          prevTermWasIncorrect: false,
        });

        set((state) => {
          const active = state.roundTimeline[state.roundCounter]!;

          active.term.correctness = active.type == "choice" ? 1 : 2;

          state.endQuestionCallback(true);

          return {};
        });
      },
      incorrectFromUnknown: (termId) => {
        set((state) => ({
          answered: termId,
          roundTimeline:
            state.roundProgress != state.termsThisRound - 1
              ? [
                  ...state.roundTimeline,
                  state.roundTimeline[state.roundCounter]!,
                ]
              : state.roundTimeline,
          prevTermWasIncorrect: true,
        }));

        set((state) => {
          const active = state.roundTimeline[state.roundCounter]!;

          active.term.correctness = -1;
          active.term.incorrectCount++;

          state.endQuestionCallback(false);

          return {};
        });
      },
      nextRound: (start = false) => {
        set((state) => {
          const currentRound = state.currentRound + (!start ? 1 : 0);

          const incorrectTerms = state.studiableTerms.filter(
            (x) => x.correctness == -1,
          );
          const unstudied = state.studiableTerms.filter(
            (x) => x.correctness == 0,
          );

          const familiarTerms = state.studiableTerms.filter(
            (x) => x.correctness == 1,
          );
          const familiarTermsWithRound = familiarTerms.map((x) => {
            if (x.appearedInRound === undefined)
              throw new Error("No round information for familiar term!");

            return x;
          });

          const termsThisRound = incorrectTerms
            .concat(
              // Add the familiar terms that haven't been seen at least 2 rounds ago
              familiarTermsWithRound.filter(
                (x) => currentRound - x.appearedInRound! >= 2,
              ),
            )
            .concat(unstudied)
            .concat(familiarTerms) // Add the rest of the familar terms if there's nothing else left
            .slice(0, LEARN_TERMS_IN_ROUND);

          // For each term that hasn't been seen (correctness == 0), set the round it appeared in as the current round
          termsThisRound.forEach((x) => {
            if (x.correctness == 0) x.appearedInRound = currentRound;
          });

          const roundTimeline: Question[] = termsThisRound.map((term) => {
            const choice = term.correctness < 1;
            const answerMode: StudySetAnswerMode =
              state.answerMode != StudySetAnswerMode.Both
                ? state.answerMode
                : Math.random() < 0.5
                  ? StudySetAnswerMode.FlashcardContentDefinition
                  : StudySetAnswerMode.FlashcardContentTerm;

            if (choice) {
              const distractorIds = term.distractors
                .filter((x) => x.type === String(answerMode))
                .map((x) => x.distractingId);

              const distractors = state.allTerms.filter((x) =>
                (distractorIds ?? []).includes(x.id),
              );

              const choices = shuffleArray(distractors.concat(term));

              return {
                answerMode,
                choices,
                term,
                type: "choice",
              };
            } else {
              return {
                answerMode,
                choices: [],
                term,
                type: "write",
              };
            }
          });

          const hasMissedTerms = !!state.studiableTerms.find(
            (x) => x.incorrectCount > 0,
          );

          return {
            roundSummary: undefined,
            termsThisRound: termsThisRound.length,
            roundTimeline,
            roundCounter: 0,
            roundProgress: 0,
            answered: undefined,
            status: undefined,
            completed: !termsThisRound.length,
            hasMissedTerms,
            currentRound,
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
