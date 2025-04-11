import { Grade } from "./common";

export interface MasterCourse {
  id: string;
  masterSubjectName: string;
  masterSubjectSlug: string;
}

export interface Course {
  id: string;
  subjectName: string;
  image: null;
  information: string;
  subjectDescription: string;
  subjectCode: string;
  masterSubjectName: string;
  masterSubjectSlug: string;
  masterSubjectId: string;
  createdAt: Date;
  category: Grade;
  updatedAt: Date;
  slug: string;
  like: null;
  view: number;
  numberEnrollment: null;
}

export interface CourseCategory {
  id: string;
  categoryName: string;
  categorySlug: string;
}

export interface SubjectCurriculum {
  subjectCurriculumId: string;
  subjectCurriculumName: string;
  subjectName: string;
  subjectId: string;
  curriculumName: string;
  curriculumId: string;
}
