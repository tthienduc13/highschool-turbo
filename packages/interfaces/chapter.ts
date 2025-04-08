export interface CreateChapterPayload {
  chapterName: string;
  chapterLevel: number;
  description: string;
  semester: 1 | 2;
}

export interface EditchapterPayload extends CreateChapterPayload {
  id: string;
}

export interface Chapter {
  id: string;
  chapterName: string;
  chapterLevel: number;
  description: string;
  subjectCurriculumId: string;
  curriculumName: null;
  semester: number;
  numberLesson: number;
  createdAt: Date;
  updatedAt: Date;
  isDone: boolean;
}

export interface CourseModel {
  id: string;
  subjectName: string;
  image: null;
  imageRaw: null;
  subjectDescription: string;
  information: string;
  subjectCode: string;
  categoryName: string;
  categoryId: null;
  class: null;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  like: number;
  view: number;
  isLike: boolean;
  numberEnrollment: number;
  isEnroll: boolean;
  enrollmentProgress: EnrollmentProgress | null;
}

export interface EnrollmentProgress {
  subjectProgressPercent: number;
  lastViewedChapter: null;
  lastViewedLesson: null;
}

export interface ChapterListResponse {
  subjectModel: CourseModel;
  items: Chapter[];
}
