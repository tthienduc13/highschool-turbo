export interface CareerPath {
  majors: Major[];
  name: string;
  description: string;
  detail: string;
  chanceToFindJob: number;
  minSalary: number;
  averageSalary: number;
  maxSalary: number;
  knowledge: Ability[];
  skills: Ability[];
  abilities: Ability[];
  personality: Ability[];
  technology: Ability[];
}

export interface Ability {
  title: string;
  bulletPoints: string[];
}

export interface Major {
  id?: string;
  majorCode: string;
  name: string;
  description: string;
  skillYouLearn: string;
  majorCategory?: MajorCategory;
  majorCategoryCode?: string;
  subjects?:
    | {
        id: string;
        name: string;
      }[]
    | string[];
}

export interface MajorCategory {
  id?: string;
  majorCategoryCode: string;
  name: string;
  mbtiTypes: string[];
  primaryHollandTrait: PrimaryHollandTrait | string;
  secondaryHollandTrait: string;
}
export enum PrimaryHollandTrait {
  Enterprising = "Enterprising",
  Investigative = "Investigative",
  Realistic = "Realistic",
}
