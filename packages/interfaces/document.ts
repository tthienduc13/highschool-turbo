export interface Document {
  id: string;
  documentSlug: string;
  documentName: string;
  documentDescription: string;
  documentYear: number;
  view: number;
  download: number;
  schoolName: null;
  isLike: boolean;
  like: number;
  subjectCurriculum: SubjectCurriculum;
  category: Category;
  semester: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  categoryId: string;
  categoryName: string;
  categorySlug: string;
}

export interface SubjectCurriculum {
  subjectCurriculumId: string;
  subjectId: string;
  subjectName: string;
  curriculumId: string;
  curriculumName: null;
}
