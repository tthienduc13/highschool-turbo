export interface Document {
  id: string;
  documentSlug: string;
  documentName: string;
  documentDescription: string;
  documentYear: number;
  view: number;
  download: number;
  schoolName: string;
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

export interface FilterPayload {
  search?: string;
  pageNumber: number;
  pageSize: number;
  schoolId?: string;
  semester?: number | null;
  documentYear?: number;
  sortPopular?: boolean | null;
  provinceId?: string;
  categoryIds?: string;
  curriculumIds?: string;
  subjectId?: string;
}

export interface DocumentMedia {
  documentId: string;
  documentFileUrl: string;
  documentFileType: string;
  documentFileExtension: string;
}

export enum Semester {
  ALL = "Tất cả",
  HK1 = "Học kì 1",
  HK2 = "Học kì 2",
}

export enum Sort {
  NEWEST = "Mới nhất",
  OLDEST = "Cũ nhất",
}
