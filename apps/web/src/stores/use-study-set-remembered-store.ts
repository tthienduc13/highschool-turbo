import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import React from "react";
import {
  type CortexGraderResponse,
  DueCardTest,
  TestQuestionType,
  TestRange,
} from "@highschool/interfaces";
import { MultipleAnswerMode, StudySetAnswerMode } from "@highschool/interfaces";
import { Distractor, DistractorType } from "@highschool/interfaces/distractors";
import { getRandom, shuffleArray, takeNRandom } from "@highschool/lib/array";
import {
  CORRECT,
  CORRECT_IS_SIMILAR,
  INCORRECT,
  TRUE_FALSE_INCORRECT_IS_FALSE,
  TRUE_FALSE_INCORRECT_IS_TRUE,
} from "@highschool/lib/constants";

import { EvaluationResult, evaluate } from "@/utils/evaluator";
import {
  DefaultData,
  MatchData,
  MultipleChoiceData,
  TestQuestion,
  TrueFalseData,
  WriteData,
} from "@/components/core/study-set-remembered/types";
import {
  generateMatchQuestion,
  generateMcqQuestion,
  generateTrueFalseQuestion,
  generateWriteQuestion,
} from "@/components/core/study-set-remembered/utils";

export type OutlineEntry = {
  type: TestQuestionType;
  startingIndex: number;
  count: number;
};

export interface RememberedStoreProps {
  settings: {
    questionCount: number;
    questionTypes: TestQuestionType[];
    testRange: TestRange;
    answerMode: StudySetAnswerMode;
  };
  questionCount: number;
  questionTypes: TestQuestionType[];
  answerMode: StudySetAnswerMode;
  allTerms: DueCardTest[];
  outline: OutlineEntry[];
  timeline: TestQuestion[];
  specialCharacters: string[];
  startedAt?: Date;
  endedAt?: Date;
  result?: {
    score: number;
    remarks: { id: string; remark: string }[][];
    byType: {
      type: TestQuestionType;
      score: number;
      total: number;
    }[];
    byQuestion: {
      index: number;
      correct: boolean;
    }[];
  };
}

interface RememberedState extends RememberedStoreProps {
  initialize: (
    allTerms: DueCardTest[],
    questionCount: number,
    questionTypes: TestQuestionType[],
    answerMode: StudySetAnswerMode,
    testRange: TestRange,
  ) => void;
  setSettings: (settings: Partial<RememberedStoreProps["settings"]>) => void;
  getMaxQuestions: () => number;
  answerQuestion: <D extends DefaultData>(
    index: number,
    data: D["answer"],
    completed?: boolean,
    ignoreDelegate?: boolean,
  ) => void;
  clearAnswer: (index: number) => void;
  setEndedAt: (date: Date) => void;
  submit: (
    cortexGraded: (CortexGraderResponse & { originalIndex: number })[],
  ) => void;
  reset: () => void;
  onAnswerDelegate: (index: number) => void;
}

export type RememberedStore = ReturnType<typeof createRememberedStore>;

export const DEFAULT_PROPS: RememberedStoreProps = {
  settings: {
    questionCount: 20,
    questionTypes: [
      TestQuestionType.TrueFalse,
      TestQuestionType.MultipleChoice,
      TestQuestionType.Match,
    ],
    answerMode: StudySetAnswerMode.FlashcardContentTerm,
    testRange: TestRange.Today,
  },
  questionCount: 20,
  questionTypes: [
    TestQuestionType.TrueFalse,
    TestQuestionType.MultipleChoice,
    TestQuestionType.Match,
  ],
  answerMode: StudySetAnswerMode.FlashcardContentTerm,
  allTerms: [],
  outline: [],
  timeline: [],
  specialCharacters: [],
};

export const createRememberedStore = (
  initProps?: Partial<RememberedStoreProps>,
  behaviors?: Partial<RememberedState>,
) => {
  return createStore<RememberedState>()(
    subscribeWithSelector((set, get) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      initialize: (
        allTerms,
        questionCount,
        questionTypes,
        answerMode,
        testRange,
      ) => {
        const all = Array.from(allTerms);

        const initialTerms = all.map((term) => {
          const availableDistractors = all.filter(
            (distractorTerm) => distractorTerm.contentId !== term.contentId,
          );
          const shuffledDistractors = shuffleArray(availableDistractors).slice(
            0,
            3,
          );

          const termDistractors: Distractor[] = shuffledDistractors.map(
            (distractorTerm) => ({
              type: DistractorType.FlashcardContentTerm,
              termId: term.contentId,
              distractingId: distractorTerm.contentId,
            }),
          );

          const definitionDistractors: Distractor[] = shuffledDistractors.map(
            (distractorTerm) => ({
              type: DistractorType.FlashcardContentDefinition,
              termId: term.contentId,
              distractingId: distractorTerm.contentId,
            }),
          );

          const distractors =
            answerMode !== StudySetAnswerMode.Both
              ? [...termDistractors, ...definitionDistractors] // Add both term and definition distractors
              : termDistractors; // Only add term distractors if answerMode is 'Both'

          return {
            ...term,
            distractors,
          };
        });

        let pool = shuffleArray(initialTerms);

        const typeOrder = Object.values(TestQuestionType);
        let types = typeOrder.filter((t) => questionTypes.includes(t));

        const generateOutline = (
          questionTypes: TestQuestionType[],
        ): TestQuestionType[] => {
          let outline: TestQuestionType[] = [];

          if (questionCount % questionTypes.length == 0) {
            for (const type of questionTypes) {
              outline = outline.concat(
                Array(questionCount / questionTypes.length).fill(type),
              );
            }
          } else {
            const basePerType = Math.floor(
              questionCount / questionTypes.length,
            );
            let remainder = questionCount % questionTypes.length;

            for (const type of questionTypes) {
              outline = outline.concat(Array(basePerType).fill(type));
            }

            while (remainder > 0) {
              for (const type of questionTypes) {
                if (remainder == 0) break;
                const insertionPoint = outline.findLastIndex((t) => t == type);

                outline.splice(insertionPoint + 1, 0, type);
                remainder--;
              }
            }
          }

          return outline;
        };

        let outline = generateOutline(types);

        if (outline.filter((t) => t == TestQuestionType.Match).length < 2) {
          types = types.filter((t) => t != TestQuestionType.Match);
          outline = generateOutline(types);
        }

        const consolidated: OutlineEntry[] = [];

        for (const [i, type] of outline.entries()) {
          if (type !== TestQuestionType.Match) {
            consolidated.push({ type, startingIndex: i, count: 1 });
          } else {
            const last = consolidated[consolidated.length - 1];

            if (last?.type == TestQuestionType.Match && last?.count < 10)
              last.count++;
            else
              consolidated.push({
                type,
                startingIndex: last ? last.startingIndex + last.count : 0,
                count: 1,
              });
          }
        }

        for (let i = consolidated.length - 1; i >= 0; i--) {
          const entry = consolidated[i]!;

          if (entry.type == TestQuestionType.Match && entry.count < 2) {
            consolidated[i - 1]!.count += entry.count;
            consolidated.splice(i, 1);
          }
        }

        const timeline: TestQuestion[] = [];

        for (const { type, count } of consolidated) {
          switch (type) {
            case TestQuestionType.TrueFalse: {
              const term = pool.pop()!;

              timeline.push(
                generateTrueFalseQuestion(term, answerMode, allTerms),
              );
              break;
            }
            case TestQuestionType.MultipleChoice: {
              const term = pool.pop()!;

              timeline.push(generateMcqQuestion(term, answerMode, allTerms));
              break;
            }
            case TestQuestionType.Match: {
              const terms = takeNRandom(pool, count);

              pool = pool.filter(
                (t) => !terms.find((x) => x.contentId == t.contentId),
              );
              timeline.push(generateMatchQuestion(terms, answerMode));
              break;
            }
            case TestQuestionType.Write: {
              const term = pool.pop()!;

              timeline.push(generateWriteQuestion(term, answerMode));
              break;
            }
          }
        }

        set({
          settings: {
            questionCount,
            questionTypes,
            answerMode,
            testRange,
          },
          allTerms: all,
          questionCount,
          questionTypes,
          answerMode,
          outline: consolidated,
          timeline,
          startedAt: new Date(),
          endedAt: undefined,
        });
      },
      setSettings: (settings) => {
        set((state) => ({
          settings: { ...state.settings, ...settings },
        }));
      },
      getMaxQuestions: () => {
        const state = get();

        return state.allTerms.length;
      },
      answerQuestion: (
        index,
        data,
        completed = true,
        ignoreDelegate = false,
      ) => {
        set((state) => {
          const question = state.timeline[index]!;

          question.answered = completed;
          question.data.answer = data;

          if (completed && !ignoreDelegate)
            behaviors?.onAnswerDelegate?.(index);

          return { timeline: [...state.timeline] };
        });
      },
      clearAnswer: (index) => {
        set((state) => {
          const question = state.timeline[index]!;

          question.answered = false;
          question.data.answer = undefined;

          return { timeline: [...state.timeline] };
        });
      },
      setEndedAt: (date) => {
        set({ endedAt: date });
      },
      submit: (cortexGraded) => {
        const state = get();

        const getNumberOfQuestions = (type: TestQuestionType) => {
          switch (type) {
            case TestQuestionType.Match: {
              const data = state.timeline
                .filter((q) => q.type == type)
                .map((q) => q.data as MatchData);

              return data.reduce((acc, cur) => acc + cur.terms.length, 0);
            }
            default:
              return state.timeline.filter((q) => q.type == type).length;
          }
        };

        let score = 0;
        const byType: NonNullable<RememberedStoreProps["result"]>["byType"] =
          state.questionTypes.map((t) => ({
            type: t,
            score: 0,
            total: getNumberOfQuestions(t),
          }));
        const byQuestion: NonNullable<
          RememberedStoreProps["result"]
        >["byQuestion"] = state.timeline.map((_, i) => ({
          index: i,
          correct: false,
        }));
        const remarks: { id: string; remark: string }[][] = [];

        const increment = (type: TestQuestionType) => {
          score++;
          byType.find((t) => t.type == type)!.score++;
        };
        const answerCorrectly = (index: number) => {
          byQuestion.find((q) => q.index == index)!.correct = true;
        };

        const pushRemark = (
          id: string,
          evaluation: boolean,
          customBank?: string[],
        ) => {
          remarks.push([
            {
              id,
              remark: getRandom(
                customBank ?? (evaluation ? CORRECT : INCORRECT),
              ),
            },
          ]);
        };

        for (const [index, question] of state.timeline.entries()) {
          switch (question.type) {
            case TestQuestionType.TrueFalse: {
              const data = question.data as TrueFalseData;

              if (data.answer == !data.distractor) {
                increment(question.type);
                answerCorrectly(index);
                pushRemark(data.term.contentId, true);
              } else
                pushRemark(
                  data.term.contentId,
                  false,
                  data.distractor
                    ? TRUE_FALSE_INCORRECT_IS_FALSE
                    : TRUE_FALSE_INCORRECT_IS_TRUE,
                );

              break;
            }
            case TestQuestionType.MultipleChoice: {
              const data = question.data as MultipleChoiceData;

              if (data.answer == data.term.contentId) {
                increment(question.type);
                answerCorrectly(index);
              }
              pushRemark(
                data.term.contentId,
                data.answer == data.term.contentId,
              );

              break;
            }
            case TestQuestionType.Write: {
              const data = question.data as WriteData;

              const cortexResponse = cortexGraded.find(
                (g) => g.originalIndex == index,
              );

              const evaluation =
                cortexResponse?.evaluation ??
                evaluate(
                  MultipleAnswerMode.One,
                  data.answer || "",
                  question.answerMode ==
                    StudySetAnswerMode.FlashcardContentDefinition
                    ? data.term.definition
                    : data.term.term,
                ) == EvaluationResult.Correct;

              data.evaluation = evaluation;
              data.cortexResponse = cortexResponse;

              if (data.evaluation) {
                increment(question.type);
                answerCorrectly(index);

                if ((data.cortexResponse?.entailment?.score || 1) < 0.7) {
                  pushRemark(data.term.contentId, true, CORRECT_IS_SIMILAR);
                  break;
                }
              }

              pushRemark(data.term.contentId, data.evaluation);

              break;
            }
            case TestQuestionType.Match: {
              const data = question.data as MatchData;

              const matchRemarks = new Array<{
                id: string;
                remark: string;
              }>();
              // Start with the assumption that all answers are correct if everything is answered
              let allCorrect = data.answer.length == data.terms.length;

              for (const { term, zone } of data.answer) {
                if (term == zone) {
                  increment(question.type);
                  matchRemarks.push({
                    id: zone,
                    remark: getRandom(CORRECT),
                  });
                } else {
                  allCorrect = false;
                  matchRemarks.push({
                    id: zone,
                    remark: getRandom(INCORRECT),
                  });
                }
              }
              if (allCorrect) answerCorrectly(index);

              remarks.push(matchRemarks);

              break;
            }
          }
        }

        set({
          result: {
            score,
            byType,
            byQuestion,
            remarks,
          },
          timeline: [...state.timeline],
        });
      },
      reset: () => {
        set({
          result: undefined,
          outline: Array.from([]),
          timeline: Array.from([]),
        });

        const state = get();

        state.initialize(
          state.allTerms,
          state.settings.questionCount,
          state.settings.questionTypes,
          state.settings.answerMode,
          state.settings.testRange,
        );
      },
      onAnswerDelegate: (index) => {
        behaviors?.onAnswerDelegate?.(index);
      },
    })),
  );
};

export const RememberedContext = React.createContext<RememberedStore | null>(
  null,
);

export const useRememberedContext = <T>(
  selector: (state: RememberedState) => T,
): T => {
  const store = React.useContext(RememberedContext);

  if (!store) throw new Error("Missing RememberedContext.Provider in the tree");

  return useStore(store, selector);
};
