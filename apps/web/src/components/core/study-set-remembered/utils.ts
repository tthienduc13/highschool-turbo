import {
  DueCardTest,
  StudySetAnswerMode,
  TestQuestionType,
} from "@highschool/interfaces";
import { DistractorType } from "@highschool/interfaces/distractors";
import { getRandom, shuffleArray } from "@highschool/lib/array";

import {
  MatchData,
  MultipleChoiceData,
  TestQuestion,
  TrueFalseData,
} from "./types";

export const getAnswerMode = (
  answerMode: StudySetAnswerMode,
): StudySetAnswerMode => {
  if (answerMode === "Both")
    return Math.random() > 0.5
      ? StudySetAnswerMode.FlashcardContentTerm
      : StudySetAnswerMode.FlashcardContentDefinition;

  return answerMode;
};

const mapStudySetAnswerModeToDistractorType = (
  mode: StudySetAnswerMode,
): DistractorType | null => {
  switch (mode) {
    case StudySetAnswerMode.FlashcardContentTerm:
      return DistractorType.FlashcardContentTerm;
    case StudySetAnswerMode.FlashcardContentDefinition:
      return DistractorType.FlashcardContentDefinition;
    default:
      return null; // Or handle 'Both' if applicable
  }
};

export const generateTrueFalseQuestion = (
  term: DueCardTest,
  answerMode: StudySetAnswerMode,
  allTerms: DueCardTest[],
): TestQuestion<TrueFalseData> => {
  const evaluation = Math.random() > 0.5;
  const mappedType = mapStudySetAnswerModeToDistractorType(answerMode);

  const distractor = !evaluation
    ? getRandom(
        term.distractors?.filter((d) => mappedType && d.type === mappedType) ||
          [],
      )
    : undefined;

  return {
    type: TestQuestionType.TrueFalse,
    answerMode: getAnswerMode(answerMode),
    data: {
      term,
      distractor: distractor
        ? allTerms.find((t) => t.contentId == distractor.distractingId)!
        : undefined,
    },
    answered: false,
  };
};

export const generateMcqQuestion = (
  term: DueCardTest,
  answerMode: StudySetAnswerMode,
  allTerms: DueCardTest[],
): TestQuestion<MultipleChoiceData> => {
  const mode = getAnswerMode(answerMode);

  const mappedType = mapStudySetAnswerModeToDistractorType(mode);

  const distractors = shuffleArray(
    term.distractors?.filter((d) => mappedType && d.type === mappedType) || [],
  );

  const distractorTerms = distractors.map(
    (d) => allTerms.find((t) => t.contentId == d.distractingId)!,
  );

  const choices = shuffleArray([term, ...distractorTerms]);

  return {
    type: TestQuestionType.MultipleChoice,
    answerMode: mode,
    data: {
      term,
      choices,
    },
    answered: false,
  };
};

export const generateMatchQuestion = (
  terms: DueCardTest[],
  answerMode: StudySetAnswerMode,
): TestQuestion<MatchData> => {
  return {
    type: TestQuestionType.Match,
    answerMode: getAnswerMode(answerMode),
    data: {
      terms: shuffleArray(Array.from(terms)),
      zones: terms,
      answer: [],
    },
    answered: false,
  };
};

export const generateWriteQuestion = (
  term: DueCardTest,
  answerMode: StudySetAnswerMode,
): TestQuestion => {
  return {
    type: TestQuestionType.Write,
    answerMode: getAnswerMode(answerMode),
    data: { term, answer: "" },
    answered: false,
  };
};
