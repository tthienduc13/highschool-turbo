import { Grade } from "./common";
import { FlashcardContent } from "./flashcard-content";
import {
  LimitedStudySetAnswerMode,
  MultipleAnswerMode,
  StudySetAnswerMode,
} from "./study-mode";

export interface Flashcard {
  id: string;
  userId: string;
  subjectId: string;
  subjectName: string;
  grade: Grade;
  flashcardName: string;
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

export interface DraftData {
  id: string;
  userId: string;
  subjectId: string;
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
  subjectId: string;
  status: StudySetVisibility;
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
}

enum LearnMode {
  Learn = "Learn",
  Review = "Review",
}
