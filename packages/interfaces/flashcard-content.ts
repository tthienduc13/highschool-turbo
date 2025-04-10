import { Distractor } from "./distractors";

export interface FlashcardContent {
  id: string;
  flashcardId: string;
  flashcardContentTerm: string;
  flashcardContentDefinition: string;
  image: string | null;
  flashcardContentTermRichText: string;
  flashcardContentDefinitionRichText: string;
  rank: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  distractors?: Distractor[];
}

export type EditTermsPayload = {
  flashcardContentTerm: string | null;
  flashcardContentDefinition: string | null;
  image: string;
  flashcardContentTermRichText: string | null;
  flashcardContentDefinitionRichText: string | null;
  rank: number;
  id: string;
};

export interface AssessAnswer {
  assessment: string;
  improvement: string;
  rating: number;
}
