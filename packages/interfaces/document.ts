import { School } from "./information";

export interface Document {
  id: string;
  documentSlug: string;
  documentName: string;
  documentDescription: string;
  documentYear: number;
  view: number;
  download: number;
  schoolId?: string;
  schoolName: string;
  isLike: boolean;
  like: number;
  subjectCurriculum: SubjectCurriculum;
  subjectId?: string;
  curriculumId?: string;
  category: Category;
  semester: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  isDownloaded?: boolean;
}

export interface DocumentUpdate {
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
  masterSubject?: MasterSubject;
  school: School;
  category: Category;
  semester: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  isDownloaded?: boolean;
}

export interface MasterSubject {
  masterSubjectId: string;
  masterSubjectName: string;
  masterSubjectSlug: string;
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
  schoolId?: string | null;
  semester?: number | null;
  documentYear?: number | null;
  sortPopular?: boolean | null;
  provinceId?: string | null;
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

export type CreateDocument = {
  documentName: string;
  documentDescription: string;
  schoolId: string;
  curriculumId: string;
  subjectId: string;
  semester: number;
  documentYear: number;
};

export type UpdateDocument = {
  documentName?: string;
  documentDescription?: string;
  schoolId?: string;
  curriculumId?: string;
  subjectId?: string;
  semester?: number;
  documentYear?: number;
  isDownloaded?: boolean;
  documentFileName?: string;
  id?: string;
};
