import { FlashcardContent } from "./flashcard-content";

export enum DistractorType {
    FlashcardContentTerm = "FlashcardContentTerm",
    FlashcardContentDefinition = "FlashcardContentDefinition",
}
export type Distractor = {
    type: DistractorType;
    termId: string;
    distractingId: string;
};

export type TermWithDistractors = FlashcardContent & {
    distractors: Distractor[];
};
