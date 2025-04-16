export interface UniversityCategory {
  id: string;
  uniCode: string;
  name: string;
  description: string;
  logoUrl: null;
  city: string;
  news_details: string;
  admission_details: string;
  program_details: string;
  field_details: string;
  created_at: Date;
  updated_at: Date;
  tags: string[];
  universityMajors: UniversityCategoryMajor[];
}

export interface UniversityCategoryMajor {
  id: string;
  uniCode: string;
  majorCode: string;
  admissionMethods: UniversityCategoryAdmissionMethod[];
  quota: number;
  degreeLevel: UniversityCategoryDegreeLevel;
  major: UniversityCategoryUniMajor;
  tuitionPerYear: number;
  yearOfReference: number;
}

export enum UniversityCategoryAdmissionMethod {
  Dgnl = "DGNL",
  HighschoolTranscript = "HighschoolTranscript",
  Thptqg = "THPTQG",
}

export enum UniversityCategoryDegreeLevel {
  Bachelor = "Bachelor",
}

export interface UniversityCategoryUniMajor {
  id: string;
  majorCode: string;
  name: string;
  description: string;
  skillYouLearn: string;
  majorCategoryCode: string;
  majorCategory: UniversityMajorCategory;
  subjects: any[];
}

export interface UniversityMajorCategory {
  id: string;
  majorCategoryCode: string;
  name: string;
  mbtiTypes: MbtiType[];
  primaryHollandTrait: AryHollandTrait;
  secondaryHollandTrait: AryHollandTrait;
}

export enum MbtiType {
  Enfp = "ENFP",
  Entj = "ENTJ",
  Entp = "ENTP",
  Estj = "ESTJ",
  Estp = "ESTP",
  Infj = "INFJ",
  Infp = "INFP",
  Intj = "INTJ",
  Intp = "INTP",
  Isfp = "ISFP",
  Istj = "ISTJ",
  Istp = "ISTP",
}

export enum AryHollandTrait {
  Artistic = "Artistic",
  Conventional = "Conventional",
  Enterprising = "Enterprising",
  Investigative = "Investigative",
  Realistic = "Realistic",
  Social = "Social",
}
