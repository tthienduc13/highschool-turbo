import { Major } from "./career-path";

export interface University {
  id: string;
  uniCode: string;
  name: string;
  description: string;
  logoUrl: string;
  city?: string;
  cityId?: number;
  universityMajors?: UniversityMajor[];
  news_details: string;
  admission_details: string;
  program_details: string;
  field_details: string;
  tags: string[];
  contactEmail?: string;
  contactPhone?: string;
  websiteLink?: string;
}

export interface UniversityMajor {
  id?: string;
  uniCode: string;
  majorCode: string;
  admissionMethods: AdmissionMethod[] | string;
  quota: number;
  degreeLevel: DegreeLevel | string;
  major?: Major;
  tuitionPerYear?: number;
  yearOfReference?: number;
}

export enum AdmissionMethod {
  Dgnl = "DGNL",
  HighschoolTranscript = "HighschoolTranscript",
  Thptqg = "THPTQG",
}

export enum DegreeLevel {
  Bachelor = "Bachelor",
  Vocational = "Vocational",
  Associate = "Associate",
  Master = "Master",
  Doctorate = "Doctorate",
}

export enum UniversityCity {
  HaNoi = "HaNoi",
  DaNang = "DaNang",
  QuyNhon = "QuyNhon",
  TpHCM = "TpHCM",
  CanTho = "CanTho",
}

export type UniversityCreate = {
  uniCode: string;
  name: string;
  description: string;
  logoUrl: string;
  city: number;
  newsDetails: string;
  admissionDetails: string;
  programDetails: string;
  fieldDetails: string;
  tags: string[];
};

export const getAdmissionMethodLabel = (method: string) => {
  switch (method) {
    case AdmissionMethod.Dgnl:
      return "Đánh Giá Năng Lực";
    case AdmissionMethod.Thptqg:
      return "Xét điểm thi tốt nghiệp";
    case AdmissionMethod.HighschoolTranscript:
      return "Xét điểm học bạ";
    default:
      return method;
  }
};

export const degreeLevels: Record<DegreeLevel, string> = {
  [DegreeLevel.Vocational]: "Trung cấp",
  [DegreeLevel.Associate]: "Cao đẳng",
  [DegreeLevel.Bachelor]: "Đại học",
  [DegreeLevel.Master]: "Thạc sĩ",
  [DegreeLevel.Doctorate]: "Tiến sĩ",
};

interface MajorCategoryCode {
  id: string;
  majorCategoryCode: string;
  name: string;
  mbtiTypes: string[];
  primaryHollandTrait: string;
  secondaryHollandTrait: string;
}

export interface UniversityTag {
  id: string;
  name: string;
}
