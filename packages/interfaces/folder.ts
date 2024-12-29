import { Flashcard } from "./flashcard";

export interface Folder {
  id: string;
  name: string;
  countFlashCard: number;
  countDocument: number;
  createdAt: Date;
  isFlashcardInclude: boolean;
  isDocumentInclude: boolean;
}

// TODO: Add document interface
export interface UserFolder {
  folderUser: FolderUser;
  flashcards: Flashcard[];
  documents: any[];
}

export interface FolderUser {
  id: string;
  name: string;
  countFlashCard: number;
  countDocument: number;
  createdAt: Date;
}
