import { TypeExam } from "./common";

export interface RoadmapType {
  id: string;
  userId: string;
  name: string;
  description: string;
  contentJson: string;
  subjectIds: string[];
  documentIds: string[];
  typeExam: TypeExam[];
  createdAt: string;
  updatedAt: string;
}

export interface NodeResource {
  id: string;
  title: string;
  description: string;
  slug: string;
  typeDocument: "flashcard" | "document" | "subject";
  relationDocument: {
    id: string;
    name: string;
    slug: string;
  }[];
}
