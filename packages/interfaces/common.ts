export interface ResponseModel<T> {
  status: number;
  message: string;
  data?: T;
}

export interface Pagination<T> {
  data: T;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface Metadata {
  TotalCount: number;
  PageSize: number;
  TotalPages: number;
  CurrentPage: number;
}

export enum TypeExam {
  T1H = "T1H",
  FIE = "FIE",
  NHE = "NHE",
  CAP = "CAP",
  // OTHER = 'OTHER'
}

export enum Grade {
  Grade10 = "Grade 10",
  Grade11 = "Grade 11",
  Grade12 = "Grade 12",
}

export const examDescriptions: { [key in TypeExam]: string } = {
  [TypeExam.T1H]: "Kiểm tra 1 tiết",
  [TypeExam.FIE]: "Kiểm tra cuối kỳ",
  [TypeExam.NHE]: "THPT Quốc Gia ",
  [TypeExam.CAP]: "Đánh giá năng lực",
  // [TypeExam.OTHER]: 'Other'
};

export const classDescriptions: { [key in Grade]: string } = {
  [Grade.Grade10]: "Lớp 10",
  [Grade.Grade11]: "Lớp 11",
  [Grade.Grade12]: "Lớp 12",
};

export const classNumberMap: Record<Grade, number> = {
  [Grade.Grade10]: 10,
  [Grade.Grade11]: 11,
  [Grade.Grade12]: 12,
};

export enum StudentProgressState {
  NewUser = "NewUser",
  SubjectInformation = "SubjectInformation",
  PersonalityAssessment = "PersonalityAssessment",
  Completion = "Completion",
}

export enum TeacherProgressState {
  NewUser = "NewUser",
  SubjectInformation = "SubjectInformation",
  VerifyTeacher = "VerifyTeacher",
  Completion = "Completion",
}
