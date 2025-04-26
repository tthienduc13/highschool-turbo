import { FlashcardContent } from "./flashcard-content";
import { StudySetAnswerMode } from "./study-mode";

export interface EntailmentResult {
  label: "entailment" | "contradiction" | "neutral";
  score: number;
}

export enum TestRange {
  Today = 0,
  LastThreeDays = 1,
  LastSevenDays = 2,
  AllTime = 3,
}

export const TestRangeLabels: Record<TestRange, string> = {
  [TestRange.Today]: "Hôm nay",
  [TestRange.LastThreeDays]: "3 ngày qua",
  [TestRange.LastSevenDays]: "7 ngày qua",
  [TestRange.AllTime]: "Tất cả thời gian",
};

export interface CortexGraderResponse {
  answer: string;
  input: string;
  evaluation: boolean;
  similarity: number;
  entailment: EntailmentResult | null;
}

export enum TestQuestionType {
  TrueFalse = "TrueFalse",
  MultipleChoice = "MultipleChoice",
  Write = "Write",
  Match = "Match",
}

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
  term: FlashcardContent;
  distractor?: FlashcardContent;
  answer?: boolean;
}

export interface MultipleChoiceData {
  term: FlashcardContent;
  choices: FlashcardContent[];
  answer?: string;
}

export interface WriteData {
  term: FlashcardContent;
  evaluation?: boolean;
  cortexResponse?: CortexGraderResponse;
  answer?: string;
}

export interface MatchData {
  terms: FlashcardContent[];
  zones: FlashcardContent[];
  answer: { zone: string; term: string }[];
}
