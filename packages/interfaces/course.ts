import { Grade } from "./common";

export interface Course {
  id: string;
  subjectName: string;
  image: null;
  information: string;
  subjectDescription: string;
  subjectCode: string;
  createdAt: Date;
  categoryName: Grade;
  updatedAt: Date;
  slug: string;
  like: null;
  view: number;
  numberEnrollment: null;
}
