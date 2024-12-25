export interface RecentView {
    items: Item[];
}

export interface Item {
    idDocument: string;
    documentName: string;
    slugDocument: string;
    typeDocument: DocumentType;
    time: Date;
}

export enum DocumentType {
    Flashcard = "flashcard",
    Subject = "subject",
    Document = "document",
}
