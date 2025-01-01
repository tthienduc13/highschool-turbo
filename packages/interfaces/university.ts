import { Major } from "./career-path";

export interface University {
  id: string;
  uniCode: string;
  name: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  websiteLink: string;
  city: string;
  universityMajors: UniversityMajor[];
}

export interface UniversityMajor {
  id: string;
  uniCode: string;
  majorCode: string;
  admissionMethods: AdmissionMethod[];
  quota: number;
  degreeLevel: DegreeLevel;
  major: Major;
  tuitionPerYear: number;
  yearOfReference: number;
}

export enum AdmissionMethod {
  Dgnl = "DGNL",
  HighschoolTranscript = "HighschoolTranscript",
  Thptqg = "THPTQG",
}

export enum DegreeLevel {
  Bachelor = "Bachelor",
}

export enum UniversityCity {
  HaNoi = "HaNoi",
  DaNang = "DaNang",
  QuyNhon = "QuyNhon",
  TpHCM = "TpHCM",
  CanTho = "CanTho",
}
