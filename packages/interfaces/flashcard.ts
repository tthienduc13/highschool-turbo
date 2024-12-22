export interface Flashcard {
    id: string;
    userId: string;
    subjectId: string;
    subjectName: string;
    grade: string;
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
}

export enum StudySetVisibility {
    Public = "Open",
    Private = "Hidden",
    Unlisted = "Link",
    Closed = "Closed",
}
