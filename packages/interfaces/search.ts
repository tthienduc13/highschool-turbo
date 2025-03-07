import { Course } from "./course";
import { Document } from "./document";
import { Flashcard } from "./flashcard";
import { Folder } from "./folder";
import { StudyGuide } from "./news";

export enum SearchType {
  All = "All",
  Flashcard = "Flashcard",
  Subject = "Subject",
  Document = "Document",
  Name = "Name",
  Folder = "Folder",
  News = "News",
}

export type SearchAll = {
  flashcards: Flashcard[];
  subjects: Course[];
  documents: Document[];
  folders: Folder[];
  tips: StudyGuide[];
};

export type SearchParams = {
  type: SearchType;
  value: string;
  pageSize: number;
  pageNumber: number;
};

export type SearchResult<T> = T extends SearchType.All
  ? SearchAll
  : T extends SearchType.Flashcard
    ? Flashcard[]
    : T extends SearchType.Subject
      ? Course[]
      : T extends SearchType.Document
        ? Document[]
        : T extends SearchType.Folder
          ? Folder[]
          : T extends SearchType.News
            ? StudyGuide[]
            : string[];
