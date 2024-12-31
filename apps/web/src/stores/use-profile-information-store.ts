import { create } from "zustand";
import { Grade, TypeExam } from "@highschool/interfaces";

export interface ICity {
  name: string | null;
  id: number | null;
}

interface AccountInformationState {
  open: boolean;
  currentStep: number;
  selectedCity: ICity;
  selectedSchool: string | null;
  selectedExamTypes: TypeExam[];
  selectedSubjects: string[];
  selectedClass: Grade | null;
  setOpen: (open: boolean) => void;
  setCurrentStep: (step: number) => void;
  setSelectedCity: (city: ICity) => void;
  setSelectedSchool: (school: string | null) => void;
  setSelectedExamTypes: (examTypes: TypeExam[]) => void;
  setSelectedSubjects: (subjects: string[]) => void;
  setSelectedClass: (classGrade: Grade | null) => void;
}

export const useAccountInformationStore = create<AccountInformationState>(
  (set) => ({
    open: false,
    currentStep: 0,
    selectedCity: { name: null, id: null },
    selectedSchool: null,
    selectedExamTypes: [],
    selectedSubjects: [],
    selectedClass: null,
    setOpen: (open: boolean) => set({ open }),
    setCurrentStep: (step: number) => set({ currentStep: step }),
    setSelectedCity: (city: ICity) => set({ selectedCity: city }),
    setSelectedSchool: (school: string | null) =>
      set({ selectedSchool: school }),
    setSelectedExamTypes: (examTypes: TypeExam[]) =>
      set({ selectedExamTypes: examTypes }),
    setSelectedSubjects: (subjects: string[]) =>
      set({ selectedSubjects: subjects }),
    setSelectedClass: (classGrade: Grade | null) =>
      set({ selectedClass: classGrade }),
  }),
);
