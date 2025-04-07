import { Grade } from "./common";
import { FlashcardContent } from "./flashcard-content";
import {
  LimitedStudySetAnswerMode,
  MultipleAnswerMode,
  StudySetAnswerMode,
} from "./study-mode";

export enum FlashcardAttachToType {
  Lesson = "Lesson",
  Chapter = "Chapter",
  Subject = "Subject",
  SubjectCurriculum = "SubjectCurriculum",
}

export interface Flashcard {
  id: string;
  userId: string;
  subjectId: string;
  subjectName: string;
  grade: Grade;
  flashcardName: string;
  entityId: string;
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
  starredTerms: string[];
  studiableTerms: StudiableTerm[];
}

enum LearnMode {
  Learn = "Learn",
  Review = "Review",
}

export type FlashcardPreview = {
  id: string;
  userId: string;
  entityId: string;
  entityName: string;
  entitySlug: string;
  flashcardType: "Lesson" | "Topic" | "Subject" | string;
  grade: number | null;
  flashcardName: string;
  slug: string;
  flashcardDescription: string;
  created: boolean;
  status: "Open" | "Closed" | string; // Add other statuses as needed
  star: number;
  createdBy: string;
  createdAt: string; // Consider converting to `Date` if you're parsing it
  updatedAt: string; // Same as above
  updatedBy: string;
  numberOfFlashcardContent: number;
  tags: string[]; // Empty array or array of strings
};
