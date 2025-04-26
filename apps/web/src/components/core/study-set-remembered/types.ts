import {
  CortexGraderResponse,
  DueCardTest,
  StudySetAnswerMode,
  TestQuestionType,
} from "@highschool/interfaces";

export type DefaultData =
  | TrueFalseData
  | MultipleChoiceData
  | WriteData
  | MatchData;

export interface TestQuestion<D = DefaultData> {
  type: TestQuestionType;
  answerMode: StudySetAnswerMode;
  data: D;
  answered: boolean;
}

export interface TrueFalseData {
  term: DueCardTest;
  distractor?: DueCardTest;
  answer?: boolean;
}

export interface MultipleChoiceData {
  term: DueCardTest;
  choices: DueCardTest[];
  answer?: string;
}

export interface WriteData {
  term: DueCardTest;
  evaluation?: boolean;
  cortexResponse?: CortexGraderResponse;
  answer?: string;
}

export interface MatchData {
  terms: DueCardTest[];
  zones: DueCardTest[];
  answer: { zone: string; term: string }[];
}
