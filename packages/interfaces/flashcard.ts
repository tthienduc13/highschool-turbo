export interface Flashcard {
    id: string;
    userId: string;
    subjectId: string;
    flashcardName: string;
    slug: string;
    flashcardDescription: string;
    created: boolean;
    status: StudySetVisibility;
    isRated: boolean;
    star: number;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    updatedBy: string;
    numberOfFlashcardContent: number;
}

export enum StudySetVisibility {
    Public = "Open",
    Private = "Hidden",
    Unlisted = "Link",
    Closed = "Closed",
}
