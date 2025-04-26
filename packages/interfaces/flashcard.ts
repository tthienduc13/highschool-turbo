import { Grade } from "./common";
import { Distractor } from "./distractors";
import { FlashcardContent } from "./flashcard-content";
import {
  LimitedStudySetAnswerMode,
  MultipleAnswerMode,
  StudySetAnswerMode,
} from "./study-mode";

export enum FlashcardDifficulty {
  Easy = "easy",
  Normal = "normal",
  Hard = "hard",
}

export type FlashcardTextLength = "short" | "medium" | "long";

export interface FlashcardGeneratePayload {
  fileRaw?: File;
  textRaw?: string;
  note?: string;
  numberFlashcardContent: number;
  levelHard: FlashcardDifficulty;
  frontTextLong: FlashcardTextLength;
  backTextLong: FlashcardTextLength;
}

export enum FlashcardAttachToType {
  Lesson = "Lesson",
  Chapter = "Chapter",
  Subject = "Subject",
  //   SubjectCurriculum = "SubjectCurriculum",
}

export interface FlashcardEntitySearch {
  name: string;
  type: FlashcardAttachToType;
  subject: {
    id: string;
    name: string;
  };
  lesson: {
    id: string;
    name: string;
  };
  subjectCurriculum: {
    id: string;
    name: string;
  };
  chapter: {
    id: string;
    name: string;
  };
}

export interface Flashcard {
  id: string;
  userId: string;
  grade: Grade;
  flashcardName: string;
  entityId: string;
  entityName: string;
  flashcardType: FlashcardAttachToType;
  slug: string;
  flashcardDescription: string;
  created: boolean;
  status: StudySetVisibility;
  isRated: boolean;
  star: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: null;
  todayView: number;
  totalView: number;
  numberOfFlashcardContent: number;
  container: FlashcardContainer;
  tags?: string[];
  objectID?: string;
}

export enum StudySetVisibility {
  Public = "Open",
  Private = "Hidden",
  Unlisted = "Link",
  Closed = "Closed",
}

export interface SetData {
  flashcard: Flashcard;
  terms: FlashcardContent[];
  injected?: InjectedData;
}

export interface InjectedData {
  studiableLearnTerms: StudiableTerm[];
  studiableFlashcardTerms: StudiableTerm[];
}

export interface StudiableTerm extends FlashcardContent {
  correctness: number;
  appearedInRound?: number | null;
  incorrectCount: number;
}

export type StudiableTermWithDistractors = StudiableTerm & {
  distractors: Distractor[];
};

export interface FlashcardTest {
  flashcardId: string;
  flashcardName: string;
  flashcardDescription: string;
  dueCardCount: number;
  totalCardCount: number;
  progressPercentage: number;
  isReview: boolean;
  dueCards: DueCardTest[];
}

export interface DueCardTest {
  contentId: string;
  term: string;
  definition: string;
  termRichText: string;
  definitionRichText: string;
  image: string;
  dueDate: Date;
  isOverdue: boolean;
  isNew: boolean;
  isReview: boolean;
  isDueToday: boolean;
  priority: number;
  distractors: Distractor[];
}

export interface DraftData {
  id: string;
  userId: string;
  flashcardType: FlashcardAttachToType;
  entityId: string;
  flashcardName: string;
  slug: string;
  flashcardDescription: string;
  status: string;
  createdBy: string;
  created: boolean;
  flashcardContents: FlashcardContent[];
  numberOfFlashcardContent: number;
}

export interface EditSetPayload {
  flashcardName: string;
  flashcardDescription: string;
  entityId: string;
  flashcardType: FlashcardAttachToType;
  status: StudySetVisibility;
  tags: string[];
}

export interface FlashcardContainer {
  id: string;
  userId: string;
  viewAt: Date;
  shuffleFlashcards: boolean;
  learnRound: number;
  learnMode: LearnMode;
  shuffleLearn: boolean;
  studyStarred: boolean;
  answerWith: StudySetAnswerMode;
  multipleAnswerMode: MultipleAnswerMode;
  extendedFeedbackBank: boolean;
  enableCardsSorting: boolean;
  cardsRound: number;
  cardsStudyStarred: boolean;
  cardsAnswerWith: LimitedStudySetAnswerMode;
  matchStudyStarred: boolean;
  cardsPerDay: number;
  starredTerms: string[];
  presetId?: string;

  studiableTerms: StudiableTerm[];
}

enum LearnMode {
  Learn = "Learn",
  Review = "Review",
}

export enum FlashcardLearnState {
  New,
  Learning,
  Review,
  Relearning,
}
export type FlashcardPreview = {
  id: string;
  userId: string;
  entityId: string;
  entityName: string;
  entitySlug: string;
  flashcardType: string;
  grade?: number | null;
  flashcardName: string;
  slug: string;
  flashcardDescription: string;
  created: boolean;
  status: string;
  star: number;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  updatedBy: string;
  numberOfFlashcardContent: number;
  tags?: string[];
};

export type TagFlashcard = {
  id: string;
  name: string;
  usageCount: number;
};

export interface FlashcardLearn {
  flashcardId: string;
  flashcardName: string;
  flashcardDescription: string;
  dueCardCount: number;
  totalCardCount: number;
  progressPercentage: number;
  isReview: boolean;
  dueCards: DueCard[];
}

export interface DueCard {
  contentId: string;
  term: string;
  definition: string;
  state: FlashcardLearnState;
  dueDate: string | null;
  difficulty: number;
  stability: number;
  retrievability: number;
  isOverdue: boolean;
  isNew: boolean;
  isReview: boolean;
  isDueToday: boolean;
  isEarlyReview: boolean;
  isLowRating: boolean;
  rating: number;
  priority: number;
  correctness: number;
  incorrectCount: number;
  appearedInRound: number;
}

export enum FlashcardRating {
  Again = "again",
  Hard = "hard",
  Good = "good",
  Easy = "easy",
}
